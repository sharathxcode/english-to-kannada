import React, { useState } from 'react';
import './App.css';
import TextTranslator from './components/TextTranslator';
import FileTranslator from './components/FileTranslator';

function App() {
  const [activeTab, setActiveTab] = useState('text');

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🌍 English to Kannada Translator</h1>
          <p>Translate your text and documents instantly</p>
        </header>

        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            📝 Text Translation
          </button>
          <button 
            className={`tab-button ${activeTab === 'file' ? 'active' : ''}`}
            onClick={() => setActiveTab('file')}
          >
            📄 File Translation
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'text' && <TextTranslator />}
          {activeTab === 'file' && <FileTranslator />}
        </div>
      </div>
    </div>
  );
}

export default App;
