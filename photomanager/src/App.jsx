import { useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { open } from '@tauri-apps/api/dialog'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import './App.css'

function App() {
  const [step, setStep] = useState('select-folder') // select-folder, scan, edit, create
  const [albumName, setAlbumName] = useState('')
  const [selectedFolder, setSelectedFolder] = useState('')
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [outputPath, setOutputPath] = useState('')

  const selectFolder = async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      })
      if (selected) {
        setSelectedFolder(selected)
        setStep('scan')
      }
    } catch (err) {
      setMessage('Error selecting folder: ' + err)
    }
  }

  const selectOutputPath = async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      })
      if (selected) {
        setOutputPath(selected)
      }
    } catch (err) {
      setMessage('Error selecting output path: ' + err)
    }
  }

  const scanPhotos = async () => {
    if (!selectedFolder) {
      setMessage('Please select a folder')
      return
    }

    setLoading(true)
    setMessage('Scanning photos...')

    try {
      const scannedPhotos = await invoke('scan_photos', { folderPath: selectedFolder })
      
      console.log('Scanned photos with EXIF:', scannedPhotos)
      
      // Prepare metadata with EXIF data
      const photoData = scannedPhotos.map((photo) => {
        const sanitized = photo.filename.split('.')[0]
          .replace(/[^a-z0-9-_]/gi, '-')
          .toLowerCase()
        
        console.log(`Photo: ${photo.filename}, EXIF:`, photo.exif)
        
        return {
          filename: photo.filename,
          path: photo.path,
          title: sanitized.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          tags: '',
          location: photo.exif?.location || '',
          date: photo.exif?.date || '',
          album: '',
        }
      })

      setPhotos(photoData)
      setMessage(`Found ${photoData.length} photos`)
      setStep('edit')
    } catch (err) {
      setMessage('Error scanning photos: ' + err)
    } finally {
      setLoading(false)
    }
  }

  const updatePhoto = (index, field, value) => {
    const updated = [...photos]
    updated[index][field] = value
    setPhotos(updated)
  }

  const createAlbum = async () => {
    if (!albumName.trim()) {
      setMessage('Please enter an album name')
      return
    }

    if (!outputPath) {
      setMessage('Please select output path')
      return
    }

    if (photos.length === 0) {
      setMessage('No photos to process')
      return
    }

    setLoading(true)
    setMessage('Creating album...')

    try {
      // Convert tags string to array for each photo
      const photosWithArrayTags = photos.map(photo => ({
        ...photo,
        tags: photo.tags.split(',').map(t => t.trim()).filter(t => t)
      }))
      
      const result = await invoke('create_album', {
        photos: photosWithArrayTags,
        albumName: albumName.trim(),
        outputBase: outputPath,
      })

      setMessage('✅ ' + result)
      setStep('complete')
    } catch (err) {
      setMessage('Error creating album: ' + err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📸 Photo Album Manager</h1>
        <p>Organize photos, extract metadata, generate albums.meta.json</p>
      </header>

      <main className="app-content">
        {step === 'select-folder' && (
          <div className="step-container">
            <h2>Step 1: Select Photo Folder</h2>
            <p>Choose the folder containing your photos</p>
            <button className="btn btn-primary" onClick={selectFolder}>
              📁 Browse Folder
            </button>
            {selectedFolder && <p className="selected-path">Selected: {selectedFolder}</p>}
          </div>
        )}

        {step === 'scan' && (
          <div className="step-container">
            <h2>Step 2: Scan Photos</h2>
            {selectedFolder && <p className="selected-path">Folder: {selectedFolder}</p>}
            <button 
              className="btn btn-primary" 
              onClick={scanPhotos}
              disabled={loading}
            >
              {loading ? '⏳ Scanning...' : '🔍 Scan Photos'}
            </button>
            {message && <p className="message">{message}</p>}
          </div>
        )}

        {step === 'edit' && (
          <div className="step-container">
            <h2>Step 3: Edit Metadata</h2>
            <p>Update titles, tags, location, and dates for each photo</p>

            <div className="photos-grid">
              {photos.map((photo, idx) => {
                const imageSrc = convertFileSrc(photo.path);
                return (
                  <div key={idx} className="photo-card">
                    <div className="photo-preview">
                      <img 
                        src={imageSrc} 
                        alt={photo.filename}
                        onError={(e) => {
                          console.error('Failed to load image:', photo.path, imageSrc);
                          e.target.style.display = 'none';
                        }}
                        onLoad={() => console.log('Image loaded:', photo.filename)}
                      />
                      <div className="photo-filename">{photo.filename}</div>
                    </div>
                    <div className="photo-form">
                    <input
                      type="text"
                      placeholder="Title"
                      value={photo.title}
                      onChange={(e) => updatePhoto(idx, 'title', e.target.value)}
                      className="input"
                    />
                    <input
                      type="text"
                      placeholder="Tags (comma-separated)"
                      value={photo.tags}
                      onChange={(e) => updatePhoto(idx, 'tags', e.target.value)}
                      className="input"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={photo.location}
                      onChange={(e) => updatePhoto(idx, 'location', e.target.value)}
                      className="input"
                    />
                    <input
                      type="text"
                      placeholder="Date"
                      value={photo.date}
                      onChange={(e) => updatePhoto(idx, 'date', e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
                );
              })}
            </div>

            <div className="step-footer">
              <button className="btn btn-secondary" onClick={() => setStep('scan')}>
                ← Back
              </button>
              <button className="btn btn-primary" onClick={() => setStep('create')}>
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 'create' && (
          <div className="step-container">
            <h2>Step 4: Create Album</h2>
            
            <div className="form-group">
              <label>Album Name</label>
              <input
                type="text"
                placeholder="e.g., Tokyo 2024"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                className="input"
              />
            </div>

            <div className="form-group">
              <label>Output Path</label>
              <div className="path-selector">
                <input
                  type="text"
                  placeholder="Select output folder"
                  value={outputPath}
                  readOnly
                  className="input"
                />
                <button className="btn btn-secondary" onClick={selectOutputPath}>
                  Browse
                </button>
              </div>
              <small>This should be: <code>website_src/assets/images/albums</code></small>
            </div>

            {message && <p className="message">{message}</p>}

            <div className="step-footer">
              <button className="btn btn-secondary" onClick={() => setStep('edit')}>
                ← Back
              </button>
              <button 
                className="btn btn-primary" 
                onClick={createAlbum}
                disabled={loading}
              >
                {loading ? '⏳ Creating...' : '✨ Create Album'}
              </button>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="step-container success">
            <h2>✅ Complete!</h2>
            {message && <p className="message success-message">{message}</p>}
            
            <div className="next-steps">
              <h3>Next Steps:</h3>
              <ol>
                <li>Run <code>npm run albums</code> in website_src/</li>
                <li>Your photos are now organized with metadata!</li>
              </ol>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={() => {
                setStep('select-folder')
                setPhotos([])
                setAlbumName('')
                setSelectedFolder('')
                setOutputPath('')
                setMessage('')
              }}
            >
              Create Another Album
            </button>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>💡 Tauri-based photo manager - Efficient local file processing with Rust backend</p>
      </footer>
    </div>
  )
}

export default App
