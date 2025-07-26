import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { analyzeSentiment } from '../utils/sentimentAnalysis';
import { getSentimentStyles } from '../utils/visualStyles';

const LyricsPlayer = ({ lyricsData, onStop }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [currentSentiment, setCurrentSentiment] = useState('neutral');
  const [previousSentiment, setPreviousSentiment] = useState('neutral');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  const { lyrics } = lyricsData;

  useEffect(() => {
    if (isPlaying && currentIndex < lyrics.length) {
      const currentLyric = lyrics[currentIndex];
      const duration = calculateDisplayDuration(currentLyric.text);
      const sentiment = analyzeSentiment(currentLyric.text);
      
      // Handle sentiment transitions smoothly
      if (sentiment !== currentSentiment) {
        setIsTransitioning(true);
        setPreviousSentiment(currentSentiment);
        setTimeout(() => {
          setCurrentSentiment(sentiment);
          setTimeout(() => setIsTransitioning(false), 800);
        }, 200);
      }

      intervalRef.current = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, duration / playbackSpeed);
    } else if (currentIndex >= lyrics.length) {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, currentIndex, lyrics, playbackSpeed, currentSentiment]);

  const calculateDisplayDuration = (text) => {
    const words = text.split(' ').length;
    const characters = text.length;
    const isShortPhrase = words <= 3;
    const isLongPhrase = words > 8;
    
    // More realistic timing based on reading speed and dramatic effect
    if (isShortPhrase) return Math.max(3500, characters * 200); // Single words get longer, more dramatic display
    if (isLongPhrase) return Math.max(5000, characters * 80); // Rapid sections need more time
    return Math.max(4000, characters * 100); // Normal pace with character-based timing
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const currentLyric = lyrics[currentIndex] || { text: '', timestamp: 0 };
  const styles = getSentimentStyles(isTransitioning ? previousSentiment : currentSentiment);
  const words = currentLyric.text.split(' ');
  
  // Determine animation type based on word count
  const getAnimationType = () => {
    if (words.length <= 3) return 'dramatic';
    if (words.length > 8) return 'rapid';
    return 'normal';
  };

  const animationType = getAnimationType();

  // Enhanced particle system for single words
  const renderDramaticWord = () => {
    const word = currentLyric.text;
    const wordLength = word.length;
    
    return (
      <div 
        key={`dramatic-${currentIndex}`}
        className="relative flex items-center justify-center"
        style={{
          animation: 'dramaticWordEntry 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {/* Multiple background effects */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Expanding ring effect */}
          <div 
            className={`absolute rounded-full border-4 ${styles.particleColor.replace('bg-', 'border-')} opacity-30`}
            style={{
              animation: 'expandingRing 3.5s ease-out forwards',
              width: `${Math.min(wordLength * 40, 400)}px`,
              height: `${Math.min(wordLength * 40, 400)}px`
            }}
          />
          
          {/* Pulsing glow */}
          <div 
            className={`absolute rounded-full ${styles.particleColor} opacity-20 blur-xl`}
            style={{
              animation: 'pulsingGlow 3.5s ease-in-out infinite',
              width: `${Math.min(wordLength * 60, 600)}px`,
              height: `${Math.min(wordLength * 60, 600)}px`
            }}
          />
          
          {/* Rotating particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-4 h-4 ${styles.particleColor} rounded-full opacity-60`}
              style={{
                animation: `rotatingParticle 4s linear infinite`,
                animationDelay: `${i * 0.5}s`,
                transformOrigin: `${150 + wordLength * 5}px center`
              }}
            />
          ))}
        </div>

        {/* Main word with layered effects */}
        <div className="relative z-10">
          {/* Shadow layer */}
          <h1 
            className="absolute text-8xl md:text-9xl font-black opacity-30 blur-sm"
            style={{
              fontFamily: styles.fontFamily,
              transform: 'translate(8px, 8px) scale(1.05)',
              color: 'rgba(0,0,0,0.5)'
            }}
          >
            {word}
          </h1>
          
          {/* Main text */}
          <h1 
            className={`relative text-8xl md:text-9xl font-black leading-tight ${styles.textColor}`}
            style={{
              fontFamily: styles.fontFamily,
              textShadow: `${styles.textShadow}, 0 0 80px currentColor`,
              animation: 'wordPulse 3.5s ease-in-out forwards'
            }}
          >
            {word.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  animation: `letterDance 3.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              >
                {char}
              </span>
            ))}
          </h1>
          
          {/* Sparkle overlay */}
          <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-80"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `sparkle 2s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${styles.background}`}
      style={{
        background: styles.dynamicBackground
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full blur-xl animate-pulse ${styles.particleColor}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Controls Header */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <Button
          onClick={onStop}
          variant="ghost"
          size="lg"
          className="text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        
        <Card className="bg-black/40 backdrop-blur-md border-white/20">
          <CardContent className="p-4 flex items-center space-x-4">
            <Button
              onClick={handleRestart}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={handlePlayPause}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <div className="text-white text-right">
          <p className="text-sm opacity-80">{lyricsData.title}</p>
          <p className="text-xs opacity-60">
            {currentIndex + 1} / {lyrics.length}
          </p>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <Card className="absolute top-20 right-6 bg-black/60 backdrop-blur-md border-white/20 z-10">
          <CardContent className="p-4 space-y-3">
            <div>
              <label className="text-white text-sm block mb-2">Speed: {playbackSpeed}x</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="w-full accent-purple-400"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Lyrics Display */}
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          {animationType === 'dramatic' && (
            <div 
              key={currentIndex}
              className="animate-pulse"
              style={{
                animation: 'dramaticEntry 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              <h1 
                className={`text-8xl md:text-9xl font-black leading-tight ${styles.textColor} ${styles.textShadow}`}
                style={{
                  fontFamily: styles.fontFamily,
                  textShadow: styles.textShadow,
                  transform: 'scale(1.1)',
                }}
              >
                {currentLyric.text}
              </h1>
            </div>
          )}

          {animationType === 'normal' && (
            <div 
              key={currentIndex}
              className="space-y-4"
            >
              {words.map((word, wordIndex) => (
                <span
                  key={`${currentIndex}-${wordIndex}`}
                  className={`inline-block text-6xl md:text-7xl font-bold mr-4 ${styles.textColor}`}
                  style={{
                    fontFamily: styles.fontFamily,
                    textShadow: styles.textShadow,
                    animation: `wordReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${wordIndex * 0.2}s both`
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          )}

          {animationType === 'rapid' && (
            <div 
              key={currentIndex}
              className="animate-fadeInUp"
            >
              <p 
                className={`text-4xl md:text-5xl font-semibold leading-relaxed ${styles.textColor}`}
                style={{
                  fontFamily: styles.fontFamily,
                  textShadow: styles.textShadow,
                }}
              >
                {currentLyric.text}
              </p>
            </div>
          )}

          {/* Sentiment Indicator */}
          <div className="mt-8">
            <div className={`inline-block px-4 py-2 rounded-full ${styles.sentimentBadge} backdrop-blur-sm`}>
              <span className="text-sm font-medium text-white/80 capitalize">
                {currentSentiment}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-8 right-8">
        <div className="bg-white/20 rounded-full h-2 backdrop-blur-sm">
          <div 
            className={`h-full rounded-full transition-all duration-300 ${styles.progressColor}`}
            style={{ width: `${((currentIndex + 1) / lyrics.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LyricsPlayer;