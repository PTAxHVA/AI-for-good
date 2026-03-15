/**
 * Điểm vào dữ liệu marker cho feature map.
 * File này giữ tên export ổn định (`cultureMarkers`) để các component map không cần biết dữ liệu đến từ adapter nào.
 */
import type { HistoricalEvent } from '../types/history.types';
import { cultureMarkersFromTestJson } from './testJsonAdapter';

export const cultureMarkers: HistoricalEvent[] = cultureMarkersFromTestJson;
