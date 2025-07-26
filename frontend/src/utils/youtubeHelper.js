// YouTube utility functions for frontend-only implementation

export const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const validateYouTubeUrl = (url) => {
  const videoId = extractVideoId(url);
  return videoId !== null;
};

export const getVideoTitle = (url) => {
  const videoId = extractVideoId(url);
  return videoId ? `Video ${videoId.substring(0, 8)}...` : "YouTube Video";
};

// Note: For real YouTube subtitle extraction, you would need:
// 1. A serverless function/proxy to bypass CORS
// 2. Use libraries like youtube-transcript-api on the backend
// 3. YouTube Data API v3 for official access

export const YOUTUBE_LIMITATIONS = {
  CORS_ISSUE: "Direct YouTube API calls are blocked by browser CORS policy",
  SOLUTION: "Upload subtitle files directly (.srt, .lrc, .vtt) for best experience",
  ALTERNATIVE: "Use a serverless function proxy for real YouTube integration"
};

// Demo function - in real implementation this would call a proxy endpoint
export const fetchYouTubeSubtitles = async (videoId) => {
  // This is a placeholder for the actual implementation
  // In reality, you'd need a serverless function to handle this
  throw new Error("YouTube subtitle extraction requires a backend proxy due to CORS restrictions");
};

export const getYouTubeEmbedUrl = (videoId) => {
  return `https://www.youtube.com/embed/${videoId}`;
};

export const getYouTubeThumbnail = (videoId, quality = 'hqdefault') => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};