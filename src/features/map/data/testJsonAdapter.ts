/**
 * Adapter chuyển dữ liệu thô từ test.json sang shape HistoricalEvent mà UI map/panel đang dùng.
 * Mục tiêu là giữ backward compatibility, tránh phải rewrite các component hiện có.
 */
import rawTestData from './test.json';
import type { CultureSectionKey, HistoricalEvent, MediaAsset } from '../types/history.types';

interface CultureSectionData {
  info: string;
  images: MediaAsset[];
  icons: MediaAsset[];
}

interface CultureSectionMeta {
  id: string;
  label: string;
  position: { x: number; y: number };
  locationLabel: string;
}

type TestJsonShape = {
  'Van Lang - Au Lac': Partial<Record<CultureSectionKey, Partial<CultureSectionData>>>;
};

const SECTION_ORDER: CultureSectionKey[] = [
  'area',
  'weather',
  'economy_and_trade',
  'culture',
  'art_and_writing',
  'lifestyle_and_eating_habits',
  'house',
  'cultural_symbol',
  'clothing',
];

// Mapping metadata cố định cho từng section: id marker, label hiển thị và vị trí trên bản đồ.
const SECTION_META: Record<CultureSectionKey, CultureSectionMeta> = {
  area: {
    id: 'marker1',
    label: 'Phạm vi phân bố',
    position: { x: 34, y: 30 },
    locationLabel: 'Trung tâm lưu vực sông Hồng',
  },
  weather: {
    id: 'marker2',
    label: 'Tự nhiên / Khí hậu',
    position: { x: 47, y: 26 },
    locationLabel: 'Vùng đồng bằng và trung du',
  },
  economy_and_trade: {
    id: 'marker3',
    label: 'Kinh tế và giao thương',
    position: { x: 61, y: 31 },
    locationLabel: 'Hành lang giao thương Việt cổ',
  },
  culture: {
    id: 'marker4',
    label: 'Đời sống văn hoá / Tín ngưỡng',
    position: { x: 32, y: 43 },
    locationLabel: 'Không gian nghi lễ cộng đồng',
  },
  art_and_writing: {
    id: 'marker5',
    label: 'Nghệ thuật và chữ viết',
    position: { x: 50, y: 46 },
    locationLabel: 'Vùng truyền thuyết dân gian',
  },
  lifestyle_and_eating_habits: {
    id: 'marker6',
    label: 'Lối sống / Ăn uống',
    position: { x: 39, y: 57 },
    locationLabel: 'Đời sống sinh hoạt cư dân',
  },
  house: {
    id: 'marker7',
    label: 'Nhà ở',
    position: { x: 47, y: 61 },
    locationLabel: 'Không gian làng xóm định cư',
  },
  cultural_symbol: {
    id: 'marker8',
    label: 'Biểu tượng văn hoá',
    position: { x: 41, y: 72 },
    locationLabel: 'Trung tâm biểu tượng Việt cổ',
  },
  clothing: {
    id: 'marker9',
    label: 'Trang phục',
    position: { x: 46, y: 81 },
    locationLabel: 'Phong tục trang phục bản địa',
  },
};

const testJson = rawTestData as TestJsonShape;
const vanLangData = testJson['Van Lang - Au Lac'] ?? {};

const toMediaAssets = (value: unknown): MediaAsset[] => {
  // Chuẩn hóa mảng media từ JSON và loại bỏ item thiếu name/url để UI render an toàn.
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is { name?: unknown; url?: unknown } => typeof item === 'object' && item !== null)
    .map((item) => ({
      name: typeof item.name === 'string' ? item.name : '',
      url: typeof item.url === 'string' ? item.url : '',
    }))
    .filter((item) => item.name && item.url);
};

const toSectionData = (key: CultureSectionKey): CultureSectionData => {
  // Mỗi section có thể thiếu field; adapter luôn trả về object đầy đủ để tránh null-check rải rác ở UI.
  const section = vanLangData[key] ?? {};

  return {
    info: typeof section.info === 'string' ? section.info : '',
    images: toMediaAssets(section.images),
    icons: toMediaAssets(section.icons),
  };
};

export const cultureMarkersFromTestJson: HistoricalEvent[] = SECTION_ORDER.map((sectionKey) => {
  const meta = SECTION_META[sectionKey];
  const sectionData = toSectionData(sectionKey);

  // Dựng event theo shape cũ để HistoryMap/LocationInfoPanel/Chat có thể dùng ngay.
  return {
    id: meta.id,
    name: meta.label,
    year: 1945,
    position: meta.position,
    period: 'Văn Lang - Âu Lạc',
    unlocked: true,
    level: 1,
    location: meta.locationLabel,
    locationLabel: meta.locationLabel,
    cultureSectionKey: sectionKey,
    cultureContent: sectionData.info,
    cultureImages: sectionData.images,
    cultureIcons: sectionData.icons,
    basicInfo: {
      location: meta.locationLabel,
      time: 'Thời kỳ Văn Lang - Âu Lạc',
      mainEvent: meta.label,
    },
    detailedInfo: {
      cause: meta.label,
      development: meta.label,
      result: meta.label,
      characters: [],
    },
    advancedInfo: {
      territoryChanges: meta.label,
      campaignMap: meta.label,
      marchRoutes: [],
    },
  };
});
