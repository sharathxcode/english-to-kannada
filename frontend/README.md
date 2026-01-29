# English to Kannada Translator - Frontend

This is the React frontend for the English to Kannada translator application.

## Features

- Real-time text translation
- File upload and translation
- Copy to clipboard functionality
- Download translated files
- Responsive design
- Beautiful UI with animations

## Installation

```bash
npm install
```

## Running

Development:
```bash
npm start
```

The application will open at `http://localhost:3000`

Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── TextTranslator.js      # Text translation component
│   ├── TextTranslator.css     # Text translator styles
│   ├── FileTranslator.js      # File upload/translation component
│   └── FileTranslator.css     # File translator styles
├── App.js                     # Main app component
├── App.css                    # App styles
├── index.js                   # React entry point
└── index.css                  # Global styles
```

## Features

### Text Translation
- Enter English text
- Get Kannada translation in real-time
- Copy translation to clipboard
- Character count display

### File Translation
- Upload .txt, .pdf, or .docx files
- Automatic translation of file content
- Download translated content as .txt
- File size limit: 10MB

## Dependencies

- react: UI library
- react-dom: DOM rendering
- axios: HTTP client for API calls

## Environment

Make sure the backend server is running on `http://localhost:5000`
