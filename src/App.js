import React, { useState, useEffect } from 'react';
import './style.css';
import { createWorker } from 'tesseract.js';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setSelectedImage(URL.createObjectURL(image));
  };

  const recognizeText = async () => {
    if (selectedImage) {
      const worker = await createWorker('eng');
      const ret = await worker.recognize(selectedImage);
      setRecognizedText(ret.data.text);
      await worker.terminate();
    }
  };

  useEffect(() => {
    recognizeText();
  }, [selectedImage]);

  return (
    <div className="app">
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {selectedImage && <img src={selectedImage} alt="Selected" />}
      </div>
      <div>
        {recognizedText && (
          <>
            <h2>Recognized Text:</h2>
            <p>{recognizedText}</p>
          </>
        )}
      </div>
    </div>
  );
}
