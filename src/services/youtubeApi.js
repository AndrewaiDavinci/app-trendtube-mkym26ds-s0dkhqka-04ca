/**
 * YouTube Data API V3 서비스 레이어
 * 실제 API 키가 없을 경우를 대비하여 목업 데이터(Mock Data)를 포함한 
 * 하이브리드 로직을 구현합니다.
 */

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// 목업 데이터: API 키가 없거나 호출 제한 시 사용
const MOCK_VIDEOS = [
  {
    id: '1',
    snippet: {
      title: '[TrendTube] 2024년 가장 핫한 개발 트렌드 TOP 10',
      thumbnails: { medium: { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80' } },
      channelTitle: '코딩마스터',
      publishedAt: new Date().toISOString(),
    },
    statistics: { viewCount: '1250000' }
  },
  {
    id: '2',
    snippet: {
      title: '미니멀한 인테리어로 삶의 질 높이는 법',
      thumbnails: { medium: { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80' } },
      channelTitle: '라이프스타일 TV',
      publishedAt: new Date().toISOString(),
    },
    statistics: { viewCount: '854000' }
  },
  {
    id: '3',
    snippet: {
      title: '서울 최고의 맛집 탐방 - 숨겨진 보석 같은 곳',
      thumbnails: { medium: { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80' } },
      channelTitle: '미식가 가이드',
      publishedAt: new Date().toISOString(),
    },
    statistics: { viewCount: '420000' }
  }
];

export const youtubeApi = {
  /**
   * 실시간 인기 동영상 가져오기
   */
  async getPopularVideos(categoryId = '0') {
    if (!API_KEY) {
      console.warn('YouTube API 키가 없습니다. 목업 데이터를 반환합니다.');
      return MOCK_VIDEOS;
    }

    try {
      const url = new URL(`${BASE_URL}/videos`);
      url.searchParams.append('part', 'snippet,statistics');
      url.searchParams.append('chart', 'mostPopular');
      url.searchParams.append('regionCode', 'KR');
      url.searchParams.append('maxResults', '20');
      url.searchParams.append('key', API_KEY);
      
      if (categoryId !== '0') {
        url.searchParams.append('videoCategoryId', categoryId);
      }

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error('API 호출 실패');
      
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('YouTube API Error:', error);
      return MOCK_VIDEOS;
    }
  },

  /**
   * 카테고리 목록 가져오기
   */
  async getCategories() {
    if (!API_KEY) {
      return [
        { id: '0', snippet: { title: '전체' } },
        { id: '1', snippet: { title: '영화/애니메이션' } },
        { id: '10', snippet: { title: '음악' } },
        { id: '17', snippet: { title: '스포츠' } },
        { id: '20', snippet: { title: '게임' } },
        { id: '25', snippet: { title: '뉴스' } },
      ];
    }

    try {
      const url = new URL(`${BASE_URL}/videoCategories`);
      url.searchParams.append('part', 'snippet');
      url.searchParams.append('regionCode', 'KR');
      url.searchParams.append('key', API_KEY);

      const response = await fetch(url.toString());
      const data = await response.json();
      return [{ id: '0', snippet: { title: '전체' } }, ...data.items];
    } catch (error) {
      return [{ id: '0', snippet: { title: '전체' } }];
    }
  }
};