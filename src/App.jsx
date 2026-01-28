import React from 'react';
import { useYouTubeData } from './hooks/useYouTubeData';
import CategoryFilter from './components/CategoryFilter';
import Youtube from 'lucide-react/dist/esm/icons/youtube';
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import { cn } from './lib/utils';

export default function App() {
  const { 
    videos, 
    categories, 
    selectedCategory, 
    isLoading, 
    handleCategoryChange, 
    refreshData 
  } = useYouTubeData();

  return (
    <div className="min-h-screen bg-[#F1F1F1] text-[#0F0F0F] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#FF0000] p-1.5 rounded-lg">
            <Youtube className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">트렌드 튜브</h1>
        </div>
        
        <button 
          onClick={refreshData}
          disabled={isLoading}
          className="p-2 hover:bg-zinc-100 rounded-full transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn("text-zinc-600", isLoading && "animate-spin")} size={20} />
        </button>
      </header>

      <main className="max-w-7xl mx-auto py-6">
        {/* Hero Section */}
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2 mb-2 text-red-600">
            <TrendingUp size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">실시간 인기</span>
          </div>
          <h2 className="text-3xl font-black">지금 뜨는 트렌드</h2>
          <p className="text-zinc-500 mt-1">대한민국에서 가장 많이 시청 중인 동영상을 확인하세요.</p>
        </div>

        {/* Categories */}
        <CategoryFilter 
          categories={categories} 
          selectedId={selectedCategory} 
          onSelect={handleCategoryChange} 
        />

        {/* Video Grid */}
        <div className="px-4 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-zinc-200 aspect-video rounded-xl mb-3" />
                <div className="h-4 bg-zinc-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-zinc-200 rounded w-1/2" />
              </div>
            ))
          ) : (
            videos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-video mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                  <img 
                    src={video.snippet.thumbnails.medium.url} 
                    alt={video.snippet.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                    {video.snippet.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-zinc-500">
                    <span className="font-medium">{video.snippet.channelTitle}</span>
                    <span>•</span>
                    <span>조회수 {(Number(video.statistics.viewCount) / 10000).toFixed(1)}만회</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}