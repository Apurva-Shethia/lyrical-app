import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload, Youtube, Sparkles, Music } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { mockData } from '../utils/mockData';
import { parseSubtitleFile } from '../utils/subtitleParser';

const LyricsUploader = ({ onLyricsLoad }) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileUpload = async (file) => {
    if (!file) return;

    setIsProcessing(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const text = await file.text();
      const parsedLyrics = parseSubtitleFile(text, file.name);
      
      if (parsedLyrics.length === 0) {
        toast({
          title: "Invalid file format",
          description: "Please upload a valid subtitle file (SRT, LRC, VTT)",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "File processed successfully!",
        description: `Loaded ${parsedLyrics.length} lyric entries`,
      });

      onLyricsLoad({
        title: file.name.replace(/\.[^/.]+$/, ""),
        lyrics: parsedLyrics,
        source: 'file'
      });
    } catch (error) {
      toast({
        title: "Error processing file",
        description: "Please check your file format and try again",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleYoutubeSubmit = async () => {
    if (!youtubeUrl.trim()) return;

    setIsProcessing(true);
    
    try {
      // For now, we'll use demo data due to CORS limitations
      // In a real implementation, you'd need a serverless function proxy
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockLyrics = mockData.sampleLyrics;
      
      toast({
        title: "Demo Mode: Subtitles Loaded!",
        description: `This is a demo with sample lyrics. Upload an SRT/LRC file for real subtitles.`,
      });

      onLyricsLoad({
        title: `Demo: ${extractVideoTitle(youtubeUrl)}`,
        lyrics: mockLyrics,
        source: 'youtube-demo',
        url: youtubeUrl
      });
    } catch (error) {
      toast({
        title: "Demo Mode Active",
        description: "YouTube extraction requires a backend proxy. Try uploading subtitle files instead!",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const extractVideoTitle = (url) => {
    try {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      return videoId ? `Video ${videoId[1].substring(0, 6)}...` : "YouTube Video";
    } catch {
      return "YouTube Video";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const subtitleFile = files.find(file => 
      /\.(srt|lrc|vtt|ass|ssa)$/i.test(file.name)
    );
    
    if (subtitleFile) {
      handleFileUpload(subtitleFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a subtitle file (.srt, .lrc, .vtt, .ass, .ssa)",
        variant: "destructive"
      });
    }
  };

  const handleTryDemo = () => {
    onLyricsLoad({
      title: "Demo Song - Imagine Dragons",
      lyrics: mockData.sampleLyrics,
      source: 'demo'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-12 w-12 text-purple-400 mr-3" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Lyrical UI
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your lyrics into a beautiful, dynamic visual experience. 
            Upload subtitle files or paste YouTube links to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* File Upload Card */}
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Upload className="mr-2 h-5 w-5" />
                Upload Subtitle File
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                  isDragging 
                    ? 'border-purple-400 bg-purple-400/10' 
                    : 'border-gray-600 hover:border-purple-500 hover:bg-purple-500/5'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-300 mb-2">
                  Drag & drop your subtitle file here
                </p>
                <p className="text-sm text-gray-500">
                  Supports: SRT, LRC, VTT, ASS, SSA
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".srt,.lrc,.vtt,.ass,.ssa"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  className="hidden"
                />
              </div>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={isProcessing}
              >
                Choose File
              </Button>
            </CardContent>
          </Card>

          {/* YouTube Card */}
          <Card className="bg-black/40 border-red-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Youtube className="mr-2 h-5 w-5" />
                YouTube Link (Demo Mode)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="youtube-url" className="text-gray-300">
                  Paste YouTube URL (Demo with sample lyrics)
                </Label>
                <Input
                  id="youtube-url"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="bg-black/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <Button 
                onClick={handleYoutubeSubmit}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                disabled={!youtubeUrl.trim() || isProcessing}
              >
                Try Demo Mode
              </Button>
              <p className="text-xs text-gray-400 mt-2">
                💡 For real YouTube subtitles, you'd need to upload the subtitle file directly
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Button */}
        <div className="text-center mt-8">
          <Button 
            onClick={handleTryDemo}
            variant="outline"
            size="lg"
            className="bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition-all duration-300"
          >
            <Music className="mr-2 h-5 w-5" />
            Try Demo
          </Button>
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="bg-black/80 border-purple-500/50">
              <CardContent className="p-8 text-center">
                <div className="animate-spin h-12 w-12 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-white text-lg">Processing your lyrics...</p>
                <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default LyricsUploader;