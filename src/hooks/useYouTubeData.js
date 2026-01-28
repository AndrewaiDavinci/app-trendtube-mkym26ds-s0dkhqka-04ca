import { useState, useEffect, useCallback } from 'react';
import { youtubeApi } from '../services/youtubeApi';

/**
 * 실시간 인기 데이터 및 카테고리를 관리하는 커스텀 훅
 */
export function useYouTubeData() {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 초기 데이터 로드 (카테고리 + 초기 동영상)
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      try {
        const [categoryList, videoList] = await Promise.all([
          youtubeApi.getCategories(),
          youtubeApi.getPopularVideos('0')
        ]);
        setCategories(categoryList);
        setVideos(videoList);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, []);

  // 카테고리 변경 시 데이터 리로드
  const handleCategoryChange = useCallback(async (categoryId) => {
    setSelectedCategory(categoryId);
    setIsLoading(true);
    try {
      const filteredVideos = await youtubeApi.getPopularVideos(categoryId);
      setVideos(filteredVideos);
    } catch (err) {
      setError('카테고리 데이터를 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 데이터 수동 갱신
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const refreshedVideos = await youtubeApi.getPopularVideos(selectedCategory);
      setVideos(refreshedVideos);
    } catch (err) {
      setError('데이터 갱신에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  return {
    videos,
    categories,
    selectedCategory,
    isLoading,
    error,
    handleCategoryChange,
    refreshData
  };
}