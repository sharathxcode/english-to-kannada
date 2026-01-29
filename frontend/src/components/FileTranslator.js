import React, { useState } from 'react';
import axios from 'axios';
import './FileTranslator.css';

function FileTranslator() {
  const [file, setFile] = useState(null);
  const [translatedContent, setTranslatedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ['.txt', '.pdf', '.docx', '.doc'];
      const fileExt = '.' + selectedFile.name.split('.').pop().toLowerCase();

      if (!allowedTypes.includes(fileExt)) {
        setError('Invalid file type. Please upload .txt, .pdf, or .docx files.');
        setFile(null);
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit.');
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setError('');
    }
  };

  const handleUploadTranslate = async () => {
    if (!file) {
      setError('Please select a file to translate');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload-translate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setTranslatedContent(response.data.translatedContent);
        setFileName(response.data.originalFileName);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response.data.error || 'Translation failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to translate file. Please try again.');
      console.error('File translation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([translatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `translated_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedContent);
    alert('Translation copied to clipboard!');
  };

  const handleClear = () => {
    setFile(null);
    setTranslatedContent('');
    setError('');
    setFileName('');
    document.getElementById('file-input').value = '';
  };

  return (
    <div className="file-translator">
      <div className="file-upload-section">
        <div className="upload-area">
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            accept=".txt,.pdf,.doc,.docx"
            className="file-input"
          />
          <label htmlFor="file-input" className="file-label">
            <span className="upload-icon">📤</span>
            <span className="upload-text">
              {file ? file.name : 'Click to upload or drag and drop'}
            </span>
            <span className="upload-hint">Supported: .txt, .pdf, .docx (Max 10MB)</span>
          </label>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">✓ File translated successfully!</div>}

      {translatedContent && (
        <div className="output-section">
          <div className="output-header">
            <h3>📄 Translated Content from {fileName}</h3>
            <p className="char-count">{translatedContent.length} characters</p>
          </div>
          <textarea
            value={translatedContent}
            readOnly
            rows="12"
            className="output-textarea"
          />
          <div className="output-actions">
            <button onClick={handleCopy} className="action-btn copy-btn">
              📋 Copy
            </button>
            <button onClick={handleDownload} className="action-btn download-btn">
              💾 Download as TXT
            </button>
          </div>
        </div>
      )}

      <div className="button-group">
        <button
          onClick={handleUploadTranslate}
          disabled={loading || !file}
          className="translate-btn"
        >
          {loading ? 'Translating...' : '🚀 Translate File'}
        </button>
        <button
          onClick={handleClear}
          className="clear-btn"
        >
          🔄 Clear
        </button>
      </div>
    </div>
  );
}

export default FileTranslator;
