# Lyrical UI - Frontend-Only Implementation

🎵 **Transform your lyrics into beautiful, dynamic visual experiences!**

## ✨ Features

- **100% Frontend-Only** - No backend or database required
- **Multiple Subtitle Formats** - SRT, LRC, VTT, ASS, SSA support
- **Local Sentiment Analysis** - AI-powered emotion detection without external APIs
- **Dynamic Visual Effects** - Sentiment-based styling and animations
- **Adaptive Timing** - Smart display logic for different lyric pacing
- **Drag & Drop Upload** - Easy file handling
- **Real-time Processing** - Instant lyric visualization

## 🚀 How to Use

### 1. Upload Subtitle Files
- Drag and drop or click to upload
- Supported formats: `.srt`, `.lrc`, `.vtt`, `.ass`, `.ssa`
- Files are processed entirely in your browser

### 2. YouTube Integration (Demo Mode)
- Currently shows demo lyrics due to CORS limitations
- For real YouTube subtitles:
  - Download subtitle files from YouTube manually
  - Upload them using the file upload feature

### 3. Visual Experience
- **Happy/Upbeat**: Bright colors, bouncy animations
- **Sad/Melancholy**: Cool tones, gentle fades
- **Angry/Intense**: Bold fonts, sharp movements
- **Calm/Peaceful**: Soft gradients, smooth flows
- **Energetic**: Quick transitions, vibrant colors

## 🔧 Technical Implementation

### Frontend Stack
- **React** - UI framework
- **Tailwind CSS** - Styling and animations
- **Local NLP** - Sentiment analysis without external APIs
- **File API** - Subtitle file processing

### Sentiment Analysis
- Custom lexicon-based approach
- No external API calls required
- Real-time emotion detection
- Supports intensity modifiers

### Subtitle Parsing
- **SRT**: Standard subtitle format
- **LRC**: Lyric format with precise timing
- **VTT**: WebVTT format
- **ASS/SSA**: Advanced subtitle formats

## 🎨 Animation System

### Timing Logic
- **Single Words (2-3s)**: Dramatic individual display
- **Normal Pace**: Word-by-word reveal
- **Rapid Delivery**: Chunked display for readability

### Visual Effects
- Sentiment-based color schemes
- Dynamic font changes
- Particle effects and backgrounds
- Smooth transitions and animations

## 🔒 Privacy & Security

- **No Data Storage** - Everything processed locally
- **No Server Calls** - Pure client-side application
- **No Tracking** - Your files never leave your browser
- **Offline Capable** - Works without internet after initial load

## 💡 Future Enhancements

### For Full YouTube Integration:
1. **Serverless Function Proxy** - Bypass CORS restrictions
2. **YouTube Data API v3** - Official subtitle access
3. **Browser Extension** - Direct YouTube integration

### Advanced Features:
- Custom font loading
- Audio synchronization
- Export visual recordings
- Custom color themes
- Multi-language support

## 📝 Usage Examples

### SRT File Format
```
1
00:00:00,000 --> 00:00:03,000
First things first

2
00:00:03,000 --> 00:00:06,000
I'ma say all the words inside my head
```

### LRC File Format
```
[00:00.00]First things first
[00:03.00]I'ma say all the words inside my head
[00:06.00]I'm fired up
```

## 🎯 Perfect For

- **Music Visualizations** - Create stunning lyric displays
- **Karaoke Applications** - Professional-quality text display
- **Educational Content** - Language learning with visual cues
- **Creative Projects** - Artistic lyric presentations
- **Live Performances** - Dynamic background displays

---

**Made with ❤️ for music lovers and creative minds!**
