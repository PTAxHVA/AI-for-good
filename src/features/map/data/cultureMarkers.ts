import type { HistoricalEvent } from '../types/history.types';
import { cultureMarkersFromTestJson } from './testJsonAdapter';

export const cultureMarkers: HistoricalEvent[] = cultureMarkersFromTestJson;
