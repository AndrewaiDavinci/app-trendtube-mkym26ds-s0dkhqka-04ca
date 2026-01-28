import React from 'react';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import { cn } from '../lib/utils';

export default function VideoCard({ video }) {
  return (
    <div className="group flex flex-col gap-3 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-800">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
      </div>

      {/* Info Container */}
      <div className="flex gap-3 px-1">
        <img 
          src={video.channelAvatar} 
          alt={video.channelName}
          className="h-9 w-9 rounded-full bg-zinc-700 mt-0.5"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-zinc-100 font-semibold line-clamp-2 leading-tight group-hover:text-red-500 transition-colors">
            {video.title}
          </h3>
          <div className="flex flex-col text-sm text-zinc-400">
            <div className="flex items-center gap-1">
              <span>{video.channelName}</span>
              <CheckCircle className="w-3 h-3 fill-zinc-400 text-zinc-900" />
            </div>
            <div className="flex items-center gap-1">
              <span>조회수 {video.views}</span>
              <span className="text-[10px]">•</span>
              <span>{video.postedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}