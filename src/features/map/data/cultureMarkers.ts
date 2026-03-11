import { vietnamCultureData } from './cultureLocations';
import type { CultureData, HistoricalEvent } from '../types/history.types';

type CultureFieldKey = keyof Pick<
  CultureData,
  | 'area'
  | 'weather'
  | 'economyAndTrade'
  | 'culture'
  | 'artAndWriting'
  | 'lifestyleAndEatingHabits'
  | 'house'
  | 'culturalSymbol'
  | 'clothing'
>;

interface CultureMarkerDefinition {
  id: string;
  name: string;
  fieldKey: CultureFieldKey;
  position: { x: number; y: number };
  locationLabel: string;
}

const markerDefinitions: CultureMarkerDefinition[] = [
  {
    id: 'marker1',
    name: 'Phạm vi phân bố',
    fieldKey: 'area',
    position: { x: 28, y: 22 },
    locationLabel: 'Trung tâm lưu vực sông Hồng',
  },
  {
    id: 'marker2',
    name: 'Tự nhiên / Khí hậu',
    fieldKey: 'weather',
    position: { x: 43, y: 27 },
    locationLabel: 'Vùng đồng bằng và trung du',
  },
  {
    id: 'marker3',
    name: 'Kinh tế và giao thương',
    fieldKey: 'economyAndTrade',
    position: { x: 58, y: 33 },
    locationLabel: 'Hành lang giao thương Việt cổ',
  },
  {
    id: 'marker4',
    name: 'Đời sống văn hoá / Tín ngưỡng',
    fieldKey: 'culture',
    position: { x: 34, y: 42 },
    locationLabel: 'Không gian nghi lễ cộng đồng',
  },
  {
    id: 'marker5',
    name: 'Nghệ thuật và truyền thuyết',
    fieldKey: 'artAndWriting',
    position: { x: 49, y: 47 },
    locationLabel: 'Vùng truyền thuyết dân gian',
  },
  {
    id: 'marker6',
    name: 'Lối sống / Ăn uống',
    fieldKey: 'lifestyleAndEatingHabits',
    position: { x: 38, y: 58 },
    locationLabel: 'Đời sống sinh hoạt cư dân',
  },
  {
    id: 'marker7',
    name: 'Nhà ở',
    fieldKey: 'house',
    position: { x: 53, y: 63 },
    locationLabel: 'Không gian làng xóm định cư',
  },
  {
    id: 'marker8',
    name: 'Biểu tượng văn hoá',
    fieldKey: 'culturalSymbol',
    position: { x: 43, y: 75 },
    locationLabel: 'Trung tâm biểu tượng Việt cổ',
  },
  {
    id: 'marker9',
    name: 'Trang phục',
    fieldKey: 'clothing',
    position: { x: 49, y: 86 },
    locationLabel: 'Phong tục trang phục bản địa',
  },
];

export const cultureMarkers: HistoricalEvent[] = markerDefinitions.map((marker) => ({
  id: marker.id,
  name: marker.name,
  year: 1945,
  position: marker.position,
  period: 'Văn Lang - Âu Lạc',
  unlocked: true,
  level: 1,
  location: marker.locationLabel,
  locationLabel: marker.locationLabel,
  cultureFieldKey: marker.fieldKey,
  cultureContent: vietnamCultureData[marker.fieldKey],
  basicInfo: {
    location: marker.locationLabel,
    time: 'Thời kỳ Văn Lang - Âu Lạc',
    mainEvent: marker.name,
  },
  detailedInfo: {
    cause: marker.name,
    development: marker.name,
    result: marker.name,
    characters: [],
  },
  advancedInfo: {
    territoryChanges: marker.name,
    campaignMap: marker.name,
    marchRoutes: [],
  },
  cultureData: vietnamCultureData,
}));
