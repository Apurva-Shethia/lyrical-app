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
  const [backgroundTransition, setBackgroundTransition] = useState(false);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const sentimentTransitionRef = useRef(null);

  const { lyrics } = lyricsData;

  useEffect(() => {
    if (isPlaying && currentIndex < lyrics.length) {
      const currentLyric = lyrics[currentIndex];
      const duration = calculateDisplayDuration(currentLyric.text) / playbackSpeed;
      const sentiment = analyzeSentiment(currentLyric.text);
      
      // Handle sentiment transitions with smooth background changes
      if (sentiment !== currentSentiment) {
        // Clear any existing transition timeout
        if (sentimentTransitionRef.current) {
          clearTimeout(sentimentTransitionRef.current);
        }
        
        setBackgroundTransition(true);
        setIsTransitioning(true);
        setPreviousSentiment(currentSentiment);
        
        // Smooth transition with proper timing
        sentimentTransitionRef.current = setTimeout(() => {
          setCurrentSentiment(sentiment);
          setTimeout(() => {
            setIsTransitioning(false);
            setBackgroundTransition(false);
          }, 1200);
        }, 300);
      }

      intervalRef.current = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, duration);
    } else if (currentIndex >= lyrics.length) {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      if (sentimentTransitionRef.current) {
        clearTimeout(sentimentTransitionRef.current);
      }
    };
  }, [isPlaying, currentIndex, lyrics, playbackSpeed, currentSentiment]);

  const calculateDisplayDuration = (text) => {
    const words = text.split(' ').length;
    const characters = text.length;
    const isShortPhrase = words <= 3;
    const isLongPhrase = words > 8;
    
    // Adjusted timing for more realistic playback (reduced from previous values)
    if (isShortPhrase) return Math.max(2500, characters * 140); // Single words - reduced timing
    if (isLongPhrase) return Math.max(3500, characters * 60); // Rapid sections - reduced timing
    return Math.max(2800, characters * 70); // Normal pace - reduced timing
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
    const animationDuration = Math.min(2500 + wordLength * 100, 4000);
    
    return (
      <div 
        key={`dramatic-${currentIndex}`}
        className="relative flex items-center justify-center min-h-[400px]"
        style={{
          animation: `dramaticWordEntry ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
        }}
      >
        {/* Enhanced multiple background effects */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Multiple expanding rings */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={`ring-${i}`}
              className={`absolute rounded-full border-2 ${styles.particleColor.replace('bg-', 'border-')} opacity-20`}
              style={{
                animation: `expandingRing ${animationDuration + i * 500}ms ease-out ${i * 200}ms forwards`,
                width: `${Math.min(wordLength * 30 + i * 50, 500)}px`,
                height: `${Math.min(wordLength * 30 + i * 50, 500)}px`
              }}
            />
          ))}
          
          {/* Pulsing energy waves */}
          <div 
            className={`absolute rounded-full ${styles.particleColor} opacity-10 blur-2xl`}
            style={{
              animation: `energyWave ${animationDuration}ms ease-in-out infinite`,
              width: `${Math.min(wordLength * 80, 800)}px`,
              height: `${Math.min(wordLength * 80, 800)}px`
            }}
          />
          
          {/* Spiral particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`spiral-${i}`}
              className={`absolute w-3 h-3 ${styles.particleColor} rounded-full opacity-70`}
              style={{
                animation: `spiralParticle ${animationDuration}ms linear infinite`,
                animationDelay: `${i * 100}ms`,
                transformOrigin: `${120 + wordLength * 8}px center`
              }}
            />
          ))}
          
          {/* Floating orbs */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`orb-${i}`}
              className={`absolute w-6 h-6 ${styles.particleColor} rounded-full opacity-40 blur-sm`}
              style={{
                animation: `floatingOrb ${animationDuration + 1000}ms ease-in-out infinite`,
                animationDelay: `${i * 300}ms`,
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i % 3) * 20}%`
              }}
            />
          ))}
          
          {/* Central glow effect */}
          <div 
            className={`absolute rounded-full ${styles.particleColor} opacity-15 blur-3xl`}
            style={{
              animation: `centralGlow ${animationDuration}ms ease-in-out infinite`,
              width: `${Math.min(wordLength * 100, 1000)}px`,
              height: `${Math.min(wordLength * 100, 1000)}px`
            }}
          />
        </div>

        {/* Main word with layered effects */}
        <div className="relative z-10">
          {/* Multiple shadow layers for depth */}
          <h1 
            className="absolute text-8xl md:text-9xl font-black opacity-20 blur-lg"
            style={{
              fontFamily: styles.fontFamily,
              transform: 'translate(12px, 12px) scale(1.08)',
              color: 'rgba(0,0,0,0.8)'
            }}
          >
            {word}
          </h1>
          <h1 
            className="absolute text-8xl md:text-9xl font-black opacity-25 blur-md"
            style={{
              fontFamily: styles.fontFamily,
              transform: 'translate(6px, 6px) scale(1.04)',
              color: 'rgba(0,0,0,0.6)'
            }}
          >
            {word}
          </h1>
          
          {/* Main text with enhanced effects */}
          <h1 
            className={`relative text-8xl md:text-9xl font-black leading-tight ${styles.textColor}`}
            style={{
              fontFamily: styles.fontFamily,
              textShadow: `${styles.textShadow}, 0 0 100px currentColor, 0 0 200px currentColor`,
              animation: `wordPulse ${animationDuration}ms ease-in-out forwards, textGlow ${animationDuration}ms ease-in-out infinite`
            }}
          >
            {word.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  animation: `letterDance ${animationDuration}ms ease-in-out infinite, letterFloat ${animationDuration + 1000}ms ease-in-out infinite`,
                  animationDelay: `${i * 80}ms, ${i * 120}ms`
                }}
              >
                {char}
              </span>
            ))}
          </h1>
          
          {/* Enhanced sparkle overlay */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 ${styles.particleColor} rounded-full opacity-90`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `sparkle ${1000 + Math.random() * 2000}ms ease-in-out infinite, twinkle ${2000 + Math.random() * 1000}ms ease-in-out infinite`,
                  animationDelay: `${Math.random() * animationDuration}ms`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Enhanced normal word animation
  const renderNormalWords = () => {
    return (
      <div 
        key={currentIndex}
        className="space-y-6 relative"
      >
        {/* Background glow for normal words */}
        <div 
          className={`absolute inset-0 ${styles.particleColor} opacity-5 blur-3xl rounded-full`}
          style={{
            animation: 'normalGlow 2s ease-in-out infinite'
          }}
        />
        
        {words.map((word, wordIndex) => (
          <span
            key={`${currentIndex}-${wordIndex}`}
            className={`inline-block text-6xl md:text-7xl font-bold mr-6 ${styles.textColor} relative z-10`}
            style={{
              fontFamily: styles.fontFamily,
              textShadow: `${styles.textShadow}, 0 0 40px currentColor`,
              animation: `wordRevealEnhanced 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${wordIndex * 0.2}s both, wordFloat 3s ease-in-out infinite ${wordIndex * 0.3}s`
            }}
          >
            {word}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen relative overflow-hidden ${styles.background}`}
      style={{
        background: styles.dynamicBackground,
        transition: backgroundTransition ? 'background 1.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
      }}
    >
      {/* Enhanced smooth background transition overlay */}
      {isTransitioning && (
        <div 
          className="absolute inset-0 z-0 opacity-80"
          style={{
            background: getSentimentStyles(previousSentiment).dynamicBackground,
            animation: 'smoothFadeOut 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards'
          }}
        />
      )}

      {/* Enhanced background effects */}
      <div className="absolute inset-0 opacity-15">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full blur-2xl ${styles.particleColor}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 150 + 80}px`,
              height: `${Math.random() * 150 + 80}px`,
              animation: `floatingParticle ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Controls Header */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
        <Button
          onClick={onStop}
          variant="ghost"
          size="lg"
          className="text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        
        <Card className="bg-black/40 backdrop-blur-md border-white/20 transition-all duration-300">
          <CardContent className="p-4 flex items-center space-x-4">
            <Button
              onClick={handleRestart}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 transition-colors duration-200"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={handlePlayPause}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white transition-all duration-200"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 transition-colors duration-200"
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
        <Card className="absolute top-20 right-6 bg-black/60 backdrop-blur-md border-white/20 z-20 transition-all duration-300">
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
      <div className="absolute inset-0 flex items-center justify-center px-8 z-10">
        <div className="text-center max-w-5xl">
          {animationType === 'dramatic' && renderDramaticWord()}

          {animationType === 'normal' && renderNormalWords()}

          {animationType === 'rapid' && (
            <div 
              key={currentIndex}
              className="animate-fadeInUp"
            >
              <p 
                className={`text-4xl md:text-5xl font-semibold leading-relaxed ${styles.textColor}`}
                style={{
                  fontFamily: styles.fontFamily,
                  textShadow: `${styles.textShadow}, 0 0 30px currentColor`,
                  animation: 'rapidTextEntry 1s ease-out forwards'
                }}
              >
                {currentLyric.text}
              </p>
            </div>
          )}

          {/* Enhanced Sentiment Indicator */}
          <div className="mt-12">
            <div 
              className={`inline-block px-6 py-3 rounded-full ${styles.sentimentBadge} backdrop-blur-sm border border-white/20 transition-all duration-500`}
              style={{
                animation: 'sentimentBadgePulse 3s ease-in-out infinite'
              }}
            >
              <span className="text-sm font-medium text-white/90 capitalize">
                {currentSentiment}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-8 left-8 right-8 z-10">
        <div className="bg-white/20 rounded-full h-3 backdrop-blur-sm border border-white/10">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${styles.progressColor}`}
            style={{ 
              width: `${((currentIndex + 1) / lyrics.length) * 100}%`,
              boxShadow: '0 0 30px currentColor, 0 0 60px currentColor'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LyricsPlayer;