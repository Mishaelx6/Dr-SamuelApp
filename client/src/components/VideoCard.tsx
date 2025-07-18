import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play } from "lucide-react";
import type { Video } from "@shared/schema";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const handleWatchVideo = () => {
    window.open(video.videoUrl, '_blank');
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return 'bg-red-500';
      case 'vimeo':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={video.thumbnail || "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"} 
          alt={`${video.title} thumbnail`} 
          className="w-full h-48 object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-full p-4">
            <Play className="text-primary text-2xl" />
          </div>
        </div>
        <Badge className={`absolute top-4 right-4 text-white px-2 py-1 rounded text-sm font-medium ${getPlatformColor(video.platform)}`}>
          {video.platform}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
        <p className="text-gray-700 mb-4 line-clamp-3">{video.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Duration: <span className="font-medium">{video.duration}</span>
          </span>
          <Button 
            onClick={handleWatchVideo}
            className="flex items-center space-x-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Watch Now</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
