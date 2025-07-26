import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LyricsUploader from "./components/LyricsUploader";
import LyricsPlayer from "./components/LyricsPlayer";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [currentLyrics, setCurrentLyrics] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLyricsLoad = (lyricsData) => {
    setCurrentLyrics(lyricsData);
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentLyrics(null);
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="relative min-h-screen">
                {!isPlaying ? (
                  <LyricsUploader onLyricsLoad={handleLyricsLoad} />
                ) : (
                  <LyricsPlayer 
                    lyricsData={currentLyrics} 
                    onStop={handleStop}
                  />
                )}
              </div>
            } 
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;