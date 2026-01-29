import React, { useState } from 'react';
import axios from 'axios';
import './TextTranslator.css';

function TextTranslator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to translate');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('/api/translate', {
        text: inputText
      });

      if (response.data.success) {
        setTranslatedText(response.data.translatedText);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response.data.error || 'Translation failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to translate. Please try again.');
      console.error('Translation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    alert('Translated text copied to clipboard!');
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleTranslate();
    }
  };

  return (
    <div className="text-translator">
      <div className="translator-grid">
        <div className="input-section">
          <label>English Text</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter English text here..."
            rows="10"
          />
          <p className="char-count">{inputText.length} characters</p>
        </div>

        <div className="output-section">
          <label>Kannada Translation</label>
          <textarea
            value={translatedText}
            readOnly
            placeholder="Translation will appear here..."
            rows="10"
          />
          {translatedText && (
            <button className="copy-btn" onClick={handleCopy}>
              📋 Copy Translation
            </button>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">✓ Translation successful!</div>}

      <div className="button-group">
        <button
          onClick={handleTranslate}
          disabled={loading}
          className="translate-btn"
        >
          {loading ? 'Translating...' : '🚀 Translate'}
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

export default TextTranslator;
