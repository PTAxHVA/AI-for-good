export interface CultureData {
  area: string;
  weather: string;
  economyAndTrade: string;
  culture: string;
  artAndWriting: string;
  lifestyleAndEatingHabits: string;
  house: string;
  culturalSymbol: string;
  clothing: string;
}

export interface MediaAsset {
  name: string;
  url: string;
}

export type CultureSectionKey =
  | 'area'
  | 'weather'
  | 'economy_and_trade'
  | 'culture'
  | 'art_and_writing'
  | 'lifestyle_and_eating_habits'
  | 'house'
  | 'cultural_symbol'
  | 'clothing';

export interface HistoricalEvent {
  id: string;
  name: string;
  year: number;
  position: { x: number; y: number };
  period: string;
  unlocked: boolean;
  level: number;
  location?: string;
  basicInfo: {
    location: string;
    time: string;
    mainEvent: string;
  };
  detailedInfo: {
    cause: string;
    development: string;
    result: string;
    characters: string[];
  };
  advancedInfo: {
    territoryChanges: string;
    campaignMap: string;
    marchRoutes: string[];
  };
  cultureData?: CultureData;
  cultureFieldKey?: keyof CultureData;
  cultureSectionKey?: CultureSectionKey;
  cultureContent?: string;
  cultureImages?: MediaAsset[];
  cultureIcons?: MediaAsset[];
  locationLabel?: string;
}
