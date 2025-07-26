export const parseSubtitleFile = (content, filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  
  switch (extension) {
    case 'srt':
      return parseSRT(content);
    case 'lrc':
      return parseLRC(content);
    case 'vtt':
      return parseVTT(content);
    case 'ass':
    case 'ssa':
      return parseASS(content);
    default:
      return [];
  }
};

const parseSRT = (content) => {
  const blocks = content.trim().split(/\n\s*\n/);
  const lyrics = [];
  
  blocks.forEach(block => {
    const lines = block.trim().split('\n');
    if (lines.length >= 3) {
      const timeMatch = lines[1].match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
      if (timeMatch) {
        const startTime = parseInt(timeMatch[1]) * 3600000 + 
                         parseInt(timeMatch[2]) * 60000 + 
                         parseInt(timeMatch[3]) * 1000 + 
                         parseInt(timeMatch[4]);
        
        const text = lines.slice(2).join(' ').replace(/<[^>]*>/g, '').trim();
        if (text) {
          lyrics.push({
            text,
            timestamp: startTime
          });
        }
      }
    }
  });
  
  return lyrics;
};

const parseLRC = (content) => {
  const lines = content.split('\n');
  const lyrics = [];
  
  lines.forEach(line => {
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const centiseconds = parseInt(match[3]);
      const timestamp = (minutes * 60 + seconds) * 1000 + centiseconds * 10;
      const text = match[4].trim();
      
      if (text) {
        lyrics.push({
          text,
          timestamp
        });
      }
    }
  });
  
  return lyrics.sort((a, b) => a.timestamp - b.timestamp);
};

const parseVTT = (content) => {
  const blocks = content.split(/\n\s*\n/);
  const lyrics = [];
  
  blocks.forEach(block => {
    const lines = block.trim().split('\n');
    const timeMatch = lines.find(line => line.includes('-->'));
    
    if (timeMatch) {
      const match = timeMatch.match(/(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})\.(\d{3})/);
      if (match) {
        const startTime = parseInt(match[1]) * 3600000 + 
                         parseInt(match[2]) * 60000 + 
                         parseInt(match[3]) * 1000 + 
                         parseInt(match[4]);
        
        const textLines = lines.filter(line => !line.includes('-->') && !line.match(/^\d+$/));
        const text = textLines.join(' ').replace(/<[^>]*>/g, '').trim();
        
        if (text) {
          lyrics.push({
            text,
            timestamp: startTime
          });
        }
      }
    }
  });
  
  return lyrics;
};

const parseASS = (content) => {
  const lines = content.split('\n');
  const lyrics = [];
  let inEvents = false;
  
  lines.forEach(line => {
    if (line.trim() === '[Events]') {
      inEvents = true;
      return;
    }
    
    if (line.startsWith('[') && line !== '[Events]') {
      inEvents = false;
      return;
    }
    
    if (inEvents && line.startsWith('Dialogue:')) {
      const parts = line.split(',');
      if (parts.length >= 10) {
        const startTime = parseASSTime(parts[1]);
        const text = parts.slice(9).join(',').replace(/\{[^}]*\}/g, '').trim();
        
        if (text && startTime !== null) {
          lyrics.push({
            text,
            timestamp: startTime
          });
        }
      }
    }
  });
  
  return lyrics.sort((a, b) => a.timestamp - b.timestamp);
};

const parseASSTime = (timeStr) => {
  const match = timeStr.match(/(\d+):(\d{2}):(\d{2})\.(\d{2})/);
  if (match) {
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const seconds = parseInt(match[3]);
    const centiseconds = parseInt(match[4]);
    return (hours * 3600 + minutes * 60 + seconds) * 1000 + centiseconds * 10;
  }
  return null;
};