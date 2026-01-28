import React, { useState, useMemo, useCallback } from 'react';
import Home from 'lucide-react/dist/esm/icons/home';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import PlaySquare from 'lucide-react/dist/esm/icons/play-square';
import History from 'lucide-react/dist/esm/icons/history';
import Menu from 'lucide-react/dist/esm/icons/menu';
import Search from 'lucide-react/dist/esm/icons/search';
import { MOCK_VIDEOS, CATEGORIES } from './data/mockData';
import VideoCard from './components/VideoCard';
import { cn } from './lib/utils';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    let result = MOCK_VIDEOS;
    if (selectedCategory !== "전체") {
      result = result.filter(v => v.category === selectedCategory);
    }
    if (searchQuery.trim() !== "") {
      result = result.filter(v => 
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.channelName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0F0F0F]/95 backdrop-blur-sm flex items-center justify-between px-4 h-14 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-1 cursor-pointer">
            <TrendingUp className="w-7 h-7 text-[#FF0000]" />
            <span className="text-xl font-bold tracking-tighter">트렌드 튜브</span>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-2xl mx-10">
          <div className="flex w-full items-center">
            <div className="relative flex-1">
              <input 
                type="text"
                placeholder="검색"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-l-full px-5 py-2 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <button className="bg-zinc-800 border border-l-0 border-zinc-700 px-5 py-2 rounded-r-full hover:bg-zinc-700 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden cursor-pointer">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=user" alt="User" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-60 p-3 gap-1 border-r border-zinc-800">
          {[
            { icon: Home, label: "홈", active: true },
            { icon: TrendingUp, label: "인기 트렌드" },
            { icon: PlaySquare, label: "구독" },
            { icon: History, label: "시청 기록" }
          ].map((item) => (
            <button 
              key={item.label}
              className={cn(
                "flex items-center gap-5 px-3 py-2.5 rounded-xl transition-colors text-sm font-medium",
                item.active ? "bg-zinc-800" : "hover:bg-zinc-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", item.active && "text-[#FF0000]")} />
              {item.label}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#0F0F0F]">
          <div className="sticky top-0 z-40 bg-[#0F0F0F] bg-opacity-95 py-3 px-4 flex gap-3 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  selectedCategory === cat 
                    ? "bg-white text-black" 
                    : "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
            
            {filteredVideos.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                <Search className="w-12 h-12 mb-4 opacity-20" />
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}