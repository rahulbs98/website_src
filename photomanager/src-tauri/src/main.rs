#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use serde::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};
use walkdir::WalkDir;
use std::io::BufReader;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct PhotoMetadata {
  filename: String,
  path: String,
  title: String,
  tags: Vec<String>,
  location: String,
  date: String,
  album: String,
}

#[derive(Debug, Serialize, Deserialize, Clone, Default)]
struct ExifData {
  date: String,
  location: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct PhotoInfo {
  filename: String,
  path: String,
  exif: ExifData,
}

// Extract EXIF data from image
fn extract_exif_data(file_path: &str) -> ExifData {
  let mut exif_data = ExifData::default();
  
  if let Ok(file) = fs::File::open(file_path) {
    let mut bufreader = BufReader::new(&file);
    if let Ok(exifreader) = exif::Reader::new().read_from_container(&mut bufreader) {
      // Extract date - try DateTimeOriginal first (when photo was taken), then DateTime
      let date_field = exifreader.get_field(exif::Tag::DateTimeOriginal, exif::In::PRIMARY)
        .or_else(|| exifreader.get_field(exif::Tag::DateTime, exif::In::PRIMARY));
      
      if let Some(field) = date_field {
        let datetime_str = field.display_value().to_string();
        println!("Found EXIF DateTime: {}", datetime_str);
        
        // DateTime format is typically "YYYY:MM:DD HH:MM:SS"
        if let Some(date_part) = datetime_str.split(' ').next() {
          let parts: Vec<&str> = date_part.split(':').collect();
          if parts.len() == 3 {
            // Convert YYYY:MM:DD to YYYY-MM-DD
            exif_data.date = format!("{}-{}-{}", parts[0], parts[1], parts[2]);
            println!("Converted date: {}", exif_data.date);
          }
        }
      }
      
      // Extract GPS location if available
      if let Some(lat_field) = exifreader.get_field(exif::Tag::GPSLatitude, exif::In::PRIMARY) {
        if let Some(lon_field) = exifreader.get_field(exif::Tag::GPSLongitude, exif::In::PRIMARY) {
          let lat = lat_field.display_value().to_string();
          let lon = lon_field.display_value().to_string();
          exif_data.location = format!("{}, {}", lat, lon);
          println!("Found GPS location: {}", exif_data.location);
        }
      }
    } else {
      println!("No EXIF data found in: {}", file_path);
    }
  } else {
    println!("Failed to open file: {}", file_path);
  }
  
  exif_data
}

// Scan folder for images
#[tauri::command]
fn scan_photos(folder_path: String) -> Result<Vec<PhotoInfo>, String> {
  let mut photos = Vec::new();
  let path = PathBuf::from(&folder_path);

  if !path.is_dir() {
    return Err("Path is not a directory".to_string());
  }

  let valid_extensions = ["jpg", "jpeg", "png", "webp", "gif"];

  for entry in WalkDir::new(&path)
    .into_iter()
    .filter_map(|e| e.ok())
    .filter(|e| e.file_type().is_file())
  {
    let file_path = entry.path();
    let ext = file_path
      .extension()
      .and_then(|e| e.to_str())
      .unwrap_or("")
      .to_lowercase();

    if valid_extensions.contains(&ext.as_str()) {
      let filename = file_path
        .file_name()
        .and_then(|n| n.to_str())
        .unwrap_or("unknown")
        .to_string();
      
      let path_str = file_path.to_string_lossy().to_string();
      let exif = extract_exif_data(&path_str);

      photos.push(PhotoInfo {
        filename: filename.clone(),
        path: path_str,
        exif,
      });
    }
  }

  Ok(photos)
}

// Create album folder structure and save JSON
#[tauri::command]
fn create_album(
  photos: Vec<PhotoMetadata>,
  album_name: String,
  output_base: String,
) -> Result<String, String> {
  let output_path = Path::new(&output_base);

  // Create album folder
  let album_folder = output_path.join(&album_name);
  fs::create_dir_all(&album_folder).map_err(|e| e.to_string())?;

  // Copy photos to album folder
  for photo in &photos {
    let source = Path::new(&photo.path);
    let dest = album_folder.join(&photo.filename);

    if source.exists() {
      fs::copy(source, &dest).map_err(|e| e.to_string())?;
    }
  }

  // Generate metadata JSON
  let mut metadata = serde_json::json!({});

  for photo in &photos {
    let key = format!("{}/{}", album_name, photo.filename);
    metadata[key] = serde_json::json!({
      "title": photo.title,
      "tags": photo.tags,
      "location": photo.location,
      "date": photo.date,
      "album": album_name
    });
  }

  // Save JSON to albums.meta.json
  let meta_file = output_path.parent().unwrap_or(output_path).join("albums.meta.json");
  let json_string = serde_json::to_string_pretty(&metadata).map_err(|e| e.to_string())?;
  fs::write(&meta_file, json_string).map_err(|e| e.to_string())?;

  Ok(format!(
    "Album created successfully!\nPhotos: {}\nMetadata saved to: {}",
    photos.len(),
    meta_file.display()
  ))
}

// Get filename without extension
#[tauri::command]
fn sanitize_filename(filename: String) -> String {
  filename
    .split('.')
    .next()
    .unwrap_or(&filename)
    .replace(|c: char| !c.is_alphanumeric() && c != '-' && c != '_', "-")
    .to_lowercase()
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      scan_photos,
      create_album,
      sanitize_filename
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
