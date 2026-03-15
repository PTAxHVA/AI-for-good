/**
 * Render bản đồ và các marker văn hoá.
 * Luồng dữ liệu: `cultureMarkers` (đã adapter từ test.json) -> render marker -> click marker gọi `onEventSelect`.
 */
import { useState } from 'react';
import { motion } from 'motion/react';
import type { HistoricalEvent } from '../types/history.types';
import { Badge } from '@/shared/ui/badge';
import { cultureMarkers } from '../data/cultureMarkers';
import { ImageWithFallback } from '@/shared/figma/ImageWithFallback';

interface HistoryMapProps {
  selectedYear: number;
  onEventSelect: (event: HistoricalEvent) => void;
  unlockedEvents: string[];
}

function LegacyMarkerIcon() {
  return (
    <svg className="w-7 h-7 text-[#C8A452]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      <path d="M12 3.5l6 2.7v4.8c0 4-2.58 7.74-6 8.5-3.42-.76-6-4.5-6-8.5V6.2l6-2.7z" fill="#1A1A1A" />
      <circle cx="12" cy="11" r="2.5" fill="currentColor" />
    </svg>
  );
}

function MarkerCoreIcon({ iconUrl, alt }: { iconUrl?: string; alt: string }) {
  const [iconError, setIconError] = useState(false);

  // Ưu tiên icon từ dữ liệu; nếu thiếu hoặc load lỗi thì fallback về SVG mặc định.
  if (!iconUrl || iconError) {
    return <LegacyMarkerIcon />;
  }

  return (
    <ImageWithFallback
      src={iconUrl}
      alt={alt}
      className="w-7 h-7 object-contain"
      onErrorCapture={() => setIconError(true)}
    />
  );
}

export function HistoryMap({
  selectedYear: _selectedYear,
  onEventSelect,
  unlockedEvents: _unlockedEvents,
}: HistoryMapProps) {
  // Dùng hover state để đồng bộ hiệu ứng marker + tooltip.
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a] p-6">
      <div
        className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl"
        style={{
          border: '8px solid #2D2D2D',
          boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.8), 0 20px 60px rgba(0, 0, 0, 0.9)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            border: '2px solid #4A7C8C',
            margin: '6px',
            borderRadius: '2px',
          }}
        />

        <div className="absolute inset-0 bg-[#F5ECD7]">
          <img
            src="/maps/van-lang-map.png"
            alt="Vietnam historical map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Marker được dựng trực tiếp theo vị trí (%) đã map sẵn trong adapter dữ liệu. */}
        {cultureMarkers.map((event) => {
          const isHovered = hoveredEvent === event.id;

          return (
            <motion.div
              key={event.id}
              className="absolute cursor-pointer z-10"
              style={{
                left: `${event.position.x}%`,
                top: `${event.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isHovered ? 1.15 : 1,
                opacity: 1,
              }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
              // Điểm nối chính sang panel/chat: click marker sẽ đẩy event lên App.
              onClick={() => onEventSelect(event)}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 -m-4"
                  animate={{
                    boxShadow: [
                      '0 0 20px 5px rgba(139, 21, 56, 0.6)',
                      '0 0 30px 8px rgba(139, 21, 56, 0.4)',
                      '0 0 20px 5px rgba(139, 21, 56, 0.6)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ borderRadius: '50%' }}
                />

                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                  style={{ border: '2px solid #8B1538' }}
                />

                <div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#A01A4A] to-[#6B0F2E] shadow-lg"
                  style={{
                    border: '2.5px solid #D4AF7A',
                    boxShadow: '0 6px 20px rgba(139, 21, 56, 0.6), inset 0 1px 4px rgba(255,255,255,0.15)',
                  }}
                >
                  <MarkerCoreIcon
                    iconUrl={event.cultureIcons?.[0]?.url}
                    alt={event.cultureIcons?.[0]?.name || event.name}
                  />
                </div>

                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: '#C8A452' }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>

              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-56 bg-[#2D2D2D] border-2 border-[#C8A452] rounded-lg p-3 shadow-2xl z-20"
                  style={{
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#C8A452] to-transparent" />
                  <p className="text-[#F5ECD7] mb-1" style={{ fontFamily: 'serif' }}>
                    {event.name}
                  </p>
                  <p className="text-[#C8A452] text-sm">{event.locationLabel || event.location || event.basicInfo.location}</p>
                  <Badge
                    variant="secondary"
                    className="mt-2 text-xs bg-[#8B1538]/20 text-[#C8A452] border border-[#C8A452]/30"
                  >
                    {event.period}
                  </Badge>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
