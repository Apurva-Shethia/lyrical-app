// Local sentiment analysis without external APIs
const sentimentLexicon = {
  // Positive words
  happy: ['love', 'joy', 'amazing', 'wonderful', 'fantastic', 'great', 'awesome', 'beautiful', 'perfect', 'excellent', 'brilliant', 'incredible', 'superb', 'outstanding', 'marvelous', 'delightful', 'pleasant', 'cheerful', 'glad', 'thrilled', 'excited', 'ecstatic', 'elated', 'jubilant', 'blissful', 'euphoric', 'overjoyed', 'radiant', 'bright', 'sunny', 'uplifting', 'inspiring', 'motivating', 'encouraging', 'positive', 'optimistic', 'hopeful', 'confident', 'proud', 'satisfied', 'content', 'peaceful', 'calm', 'serene', 'believer', 'believe', 'dream', 'hope', 'fly', 'soar', 'rise', 'shine', 'glow', 'sparkle', 'dance', 'sing', 'laugh', 'smile'],
  
  // Negative/Sad words  
  sad: ['sad', 'cry', 'tears', 'sorrow', 'grief', 'pain', 'hurt', 'broken', 'heartache', 'lonely', 'empty', 'lost', 'hopeless', 'despair', 'misery', 'anguish', 'agony', 'suffering', 'torment', 'distress', 'troubled', 'worried', 'anxious', 'fearful', 'scared', 'afraid', 'terrified', 'nightmare', 'dark', 'shadow', 'cold', 'numb', 'weak', 'fragile', 'vulnerable', 'helpless', 'powerless', 'defeated', 'crushed', 'shattered', 'destroyed', 'ruined', 'gone', 'goodbye', 'farewell', 'end', 'over', 'never', 'nothing', 'nobody', 'alone', 'isolated', 'abandoned', 'rejected', 'unwanted', 'unloved', 'worthless', 'useless', 'failure', 'mistake', 'regret', 'sorry', 'forgive', 'miss', 'yearn', 'long', 'wish', 'sulking', 'heartache'],
  
  // Angry words
  angry: ['angry', 'mad', 'rage', 'fury', 'hate', 'hatred', 'disgusted', 'annoyed', 'irritated', 'frustrated', 'furious', 'livid', 'enraged', 'infuriated', 'outraged', 'incensed', 'irate', 'wrathful', 'hostile', 'aggressive', 'violent', 'brutal', 'cruel', 'harsh', 'severe', 'fierce', 'intense', 'wild', 'savage', 'vicious', 'nasty', 'mean', 'evil', 'wicked', 'terrible', 'horrible', 'awful', 'disgusting', 'revolting', 'repulsive', 'sickening', 'appalling', 'shocking', 'outrageous', 'unacceptable', 'intolerable', 'unbearable', 'fight', 'battle', 'war', 'attack', 'strike', 'hit', 'punch', 'kick', 'smash', 'break', 'destroy', 'kill', 'murder', 'blood', 'fire', 'burn', 'explode', 'bullets', 'pain'],
  
  // Calm words
  calm: ['calm', 'peace', 'peaceful', 'quiet', 'still', 'serene', 'tranquil', 'relaxed', 'gentle', 'soft', 'smooth', 'easy', 'comfortable', 'cozy', 'warm', 'tender', 'kind', 'sweet', 'mild', 'light', 'floating', 'drifting', 'flowing', 'gliding', 'sailing', 'walking', 'resting', 'sleeping', 'dreaming', 'meditation', 'breathing', 'whisper', 'murmur', 'sigh', 'breeze', 'wind', 'water', 'ocean', 'sea', 'lake', 'river', 'stream', 'garden', 'nature', 'trees', 'flowers', 'birds', 'silence', 'harmony', 'balance', 'center', 'focus', 'mindful', 'aware', 'present', 'now', 'here', 'home', 'safe', 'secure', 'protected', 'shelter', 'comfort', 'embrace', 'hug', 'prayer', 'spirit', 'dove', 'heaven', 'angel'],
  
  // Energetic words
  energetic: ['energy', 'power', 'strong', 'fierce', 'intense', 'wild', 'crazy', 'insane', 'mad', 'rush', 'fast', 'quick', 'speed', 'run', 'jump', 'leap', 'bounce', 'pump', 'rock', 'roll', 'party', 'celebrate', 'festival', 'concert', 'music', 'beat', 'rhythm', 'bass', 'loud', 'boom', 'bang', 'crash', 'thunder', 'lightning', 'electric', 'shock', 'spark', 'fire', 'flame', 'burn', 'hot', 'heat', 'sweat', 'work', 'effort', 'drive', 'push', 'pull', 'lift', 'carry', 'move', 'action', 'go', 'start', 'begin', 'launch', 'blast', 'rocket', 'fly', 'soar', 'high', 'up', 'top', 'peak', 'max', 'ultimate', 'extreme', 'radical', 'awesome', 'incredible', 'amazing', 'wow', 'yeah', 'yes', 'fired', 'master', 'rain', 'bullets']
};

const intensityWords = {
  high: ['very', 'extremely', 'incredibly', 'absolutely', 'completely', 'totally', 'utterly', 'entirely', 'fully', 'really', 'truly', 'deeply', 'strongly', 'highly', 'super', 'ultra', 'mega', 'so', 'too', 'quite', 'rather', 'pretty', 'all', 'every', 'everything', 'nothing', 'never', 'always', 'forever'],
  medium: ['somewhat', 'fairly', 'relatively', 'moderately', 'slightly', 'a bit', 'a little', 'kind of', 'sort of', 'rather'],
  low: ['barely', 'hardly', 'scarcely', 'almost', 'nearly', 'just', 'only', 'merely']
};

export const analyzeSentiment = (text) => {
  if (!text || typeof text !== 'string') return 'neutral';
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  if (words.length === 0) return 'neutral';
  
  const scores = {
    happy: 0,
    sad: 0,
    angry: 0,
    calm: 0,
    energetic: 0
  };
  
  let intensityMultiplier = 1;
  
  words.forEach((word, index) => {
    // Check for intensity modifiers
    if (intensityWords.high.includes(word)) {
      intensityMultiplier = 2;
    } else if (intensityWords.medium.includes(word)) {
      intensityMultiplier = 1.5;
    } else if (intensityWords.low.includes(word)) {
      intensityMultiplier = 0.5;
    }
    
    // Score each sentiment category
    Object.keys(sentimentLexicon).forEach(sentiment => {
      if (sentimentLexicon[sentiment].includes(word)) {
        scores[sentiment] += intensityMultiplier;
      }
    });
    
    // Reset intensity multiplier after each word
    if (index < words.length - 1) {
      intensityMultiplier = 1;
    }
  });
  
  // Find the dominant sentiment
  const maxScore = Math.max(...Object.values(scores));
  
  if (maxScore === 0) return 'neutral';
  
  const dominantSentiment = Object.keys(scores).find(key => scores[key] === maxScore);
  
  // Special cases for mixed emotions or context
  const hasMultipleSentiments = Object.values(scores).filter(score => score > 0).length > 1;
  
  if (hasMultipleSentiments) {
    // If both sad and angry are high, prefer angry
    if (scores.sad > 0 && scores.angry > 0 && scores.angry >= scores.sad) {
      return 'angry';
    }
    
    // If both happy and energetic are high, prefer energetic
    if (scores.happy > 0 && scores.energetic > 0 && scores.energetic >= scores.happy) {
      return 'energetic';
    }
  }
  
  return dominantSentiment || 'neutral';
};

// Additional analysis for word-level sentiment
export const analyzeWordSentiment = (word) => {
  const lowerWord = word.toLowerCase().replace(/[^\w]/g, '');
  
  for (const [sentiment, words] of Object.entries(sentimentLexicon)) {
    if (words.includes(lowerWord)) {
      return sentiment;
    }
  }
  
  return 'neutral';
};

// Batch analysis for multiple texts
export const analyzeBatchSentiment = (texts) => {
  return texts.map(text => ({
    text,
    sentiment: analyzeSentiment(text)
  }));
};