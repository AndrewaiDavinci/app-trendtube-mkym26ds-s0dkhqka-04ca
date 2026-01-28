import React from 'react';
import { cn } from '../lib/utils';
import Play from 'lucide-react/dist/esm/icons/play';
import Music from 'lucide-react/dist/esm/icons/music';
import Gamepad2 from 'lucide-react/dist/esm/icons/gamepad-2';
import Trophy from 'lucide-react/dist/esm/icons/trophy';
import Newspaper from 'lucide-react/dist/esm/icons/newspaper';

const ICON_MAP = {
  '0': <Play size={16} />,
  '10': <Music size={16} />,
  '17': <Trophy size={16} />,
  '20': <Gamepad2 size={16} />,
  '25': <Newspaper size={16} />,
};

/**
 * 유튜브 카테고리 필터링 탭 컴포넌트
 */
const CategoryFilter = ({ categories, selectedId, onSelect }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex gap-2 min-w-max px-4">
        {categories.map((category) => {
          const isActive = selectedId === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                "border border-zinc-200 hover:border-red-500 hover:bg-zinc-50",
                isActive 
                  ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-200" 
                  : "bg-white text-zinc-600"
              )}
            >
              {ICON_MAP[category.id] && (
                <span className={cn(isActive ? "text-white" : "text-red-500")}>
                  {ICON_MAP[category.id]}
                </span>
              )}
              {category.snippet.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(CategoryFilter);