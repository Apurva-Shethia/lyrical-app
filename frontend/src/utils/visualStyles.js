export const getSentimentStyles = (sentiment) => {
  const baseStyles = {
    background: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800',
    textColor: 'text-white',
    textShadow: '0 0 20px rgba(255,255,255,0.3)',
    fontFamily: "'Inter', sans-serif",
    particleColor: 'bg-white',
    sentimentBadge: 'bg-white/20',
    progressColor: 'bg-white',
    dynamicBackground: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
  };

  switch (sentiment) {
    case 'happy':
      return {
        ...baseStyles,
        background: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500',
        dynamicBackground: 'linear-gradient(135deg, #fbbf24 0%, #f97316 30%, #ec4899 70%, #8b5cf6 100%)',
        textColor: 'text-white drop-shadow-2xl',
        textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,193,7,0.6)',
        fontFamily: "'Poppins', sans-serif",
        particleColor: 'bg-yellow-300',
        sentimentBadge: 'bg-yellow-400/30 border border-yellow-300/50',
        progressColor: 'bg-gradient-to-r from-yellow-400 to-orange-500'
      };

    case 'sad':
      return {
        ...baseStyles,
        background: 'bg-gradient-to-br from-slate-700 via-blue-900 to-indigo-900',
        dynamicBackground: 'linear-gradient(135deg, #334155 0%, #1e3a8a 50%, #312e81 100%)',
        textColor: 'text-blue-100',
        textShadow: '0 0 20px rgba(147,197,253,0.5), 0 0 40px rgba(59,130,246,0.3)',
        fontFamily: "'Crimson Text', serif",
        particleColor: 'bg-blue-400',
        sentimentBadge: 'bg-blue-500/20 border border-blue-400/30',
        progressColor: 'bg-gradient-to-r from-blue-400 to-indigo-500'
      };

    case 'angry':
      return {
        ...baseStyles,
        background: 'bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500',
        dynamicBackground: 'linear-gradient(135deg, #dc2626 0%, #ea580c 30%, #d97706 70%, #ca8a04 100%)',
        textColor: 'text-white',
        textShadow: '0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(239,68,68,0.8), 0 0 90px rgba(220,38,38,0.6)',
        fontFamily: "'Oswald', sans-serif",
        particleColor: 'bg-red-400',
        sentimentBadge: 'bg-red-500/30 border border-red-400/50',
        progressColor: 'bg-gradient-to-r from-red-500 to-orange-500'
      };

    case 'calm':
      return {
        ...baseStyles,
        background: 'bg-gradient-to-br from-emerald-800 via-teal-700 to-cyan-800',
        dynamicBackground: 'linear-gradient(135deg, #065f46 0%, #0f766e 50%, #155e63 100%)',
        textColor: 'text-emerald-50',
        textShadow: '0 0 25px rgba(167,243,208,0.4), 0 0 50px rgba(52,211,153,0.3)',
        fontFamily: "'Nunito Sans', sans-serif",
        particleColor: 'bg-emerald-300',
        sentimentBadge: 'bg-emerald-500/20 border border-emerald-400/30',
        progressColor: 'bg-gradient-to-r from-emerald-400 to-teal-400'
      };

    case 'energetic':
      return {
        ...baseStyles,
        background: 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-500',
        dynamicBackground: 'linear-gradient(135deg, #7c3aed 0%, #db2777 30%, #dc2626 70%, #ea580c 100%)',
        textColor: 'text-white',
        textShadow: '0 0 40px rgba(255,255,255,1), 0 0 80px rgba(168,85,247,0.8), 0 0 120px rgba(219,39,119,0.6)',
        fontFamily: "'Montserrat', sans-serif",
        particleColor: 'bg-purple-400',
        sentimentBadge: 'bg-purple-500/30 border border-purple-400/50',
        progressColor: 'bg-gradient-to-r from-purple-500 to-pink-500'
      };

    default:
      return baseStyles;
  }
};

// Animation keyframes for different sentiments
export const getAnimationKeyframes = (sentiment) => {
  const baseKeyframes = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes wordReveal {
      from {
        opacity: 0;
        transform: scale(0.8) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    
    @keyframes dramaticEntry {
      0% {
        opacity: 0;
        transform: scale(0.5) rotate(-5deg);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.1) rotate(2deg);
      }
      100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
    }
  `;

  const sentimentKeyframes = {
    happy: `
      @keyframes happyBounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0) scale(1);
        }
        40% {
          transform: translateY(-10px) scale(1.05);
        }
        60% {
          transform: translateY(-5px) scale(1.02);
        }
      }
    `,
    
    sad: `
      @keyframes sadFloat {
        0%, 100% {
          transform: translateY(0px) scale(1);
          opacity: 0.9;
        }
        50% {
          transform: translateY(-8px) scale(0.98);
          opacity: 0.7;
        }
      }
    `,
    
    angry: `
      @keyframes angryShake {
        0%, 100% {
          transform: translateX(0) scale(1);
        }
        10%, 30%, 50%, 70%, 90% {
          transform: translateX(-2px) scale(1.02);
        }
        20%, 40%, 60%, 80% {
          transform: translateX(2px) scale(1.02);
        }
      }
    `,
    
    calm: `
      @keyframes calmFlow {
        0%, 100% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        50% {
          transform: translateY(-5px) scale(1.01);
          opacity: 0.95;
        }
      }
    `,
    
    energetic: `
      @keyframes energeticPulse {
        0%, 100% {
          transform: scale(1);
          filter: brightness(1);
        }
        25% {
          transform: scale(1.05);
          filter: brightness(1.2);
        }
        50% {
          transform: scale(1.1);
          filter: brightness(1.4);
        }
        75% {
          transform: scale(1.05);
          filter: brightness(1.2);
        }
      }
    `
  };

  return baseKeyframes + (sentimentKeyframes[sentiment] || '');
};

// Dynamic CSS injection for sentiment-specific animations
export const injectSentimentStyles = (sentiment) => {
  const styleId = 'sentiment-animations';
  let existingStyle = document.getElementById(styleId);
  
  if (existingStyle) {
    existingStyle.remove();
  }
  
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = getAnimationKeyframes(sentiment);
  document.head.appendChild(style);
};