import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Slider } from '@/shared/ui/slider';

interface TimelineProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  minYear: number;
  maxYear: number;
}

const historicalPeriods = [
  { name: 'Thời Bắc thuộc', start: 0, end: 938, color: 'bg-red-500' },
  { name: 'Tự chủ', start: 939, end: 1009, color: 'bg-orange-500' },
  { name: 'Nhà Lý-Trần', start: 1010, end: 1400, color: 'bg-yellow-500' },
  { name: 'Nhà Lê', start: 1418, end: 1788, color: 'bg-green-500' },
  { name: 'Nhà Nguyễn', start: 1802, end: 1945, color: 'bg-blue-500' },
  { name: 'Cận đại', start: 1945, end: 2000, color: 'bg-purple-500' }
];

export function Timeline({ selectedYear, onYearChange, minYear, maxYear }: TimelineProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const intervalRef = useRef<number | null>(null);
  const yearRef = useRef(selectedYear);

  const clearPlaybackInterval = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    yearRef.current = selectedYear;
  }, [selectedYear]);

  useEffect(() => {
    if (!isPlaying) {
      clearPlaybackInterval();
      return;
    }

    clearPlaybackInterval();
    intervalRef.current = window.setInterval(() => {
      const nextYear = Math.min(maxYear, yearRef.current + (10 * playbackSpeed));
      yearRef.current = nextYear;
      onYearChange(nextYear);

      if (nextYear >= maxYear) {
        setIsPlaying(false);
        clearPlaybackInterval();
      }
    }, 100);

    return () => {
      clearPlaybackInterval();
    };
  }, [isPlaying, playbackSpeed, maxYear, onYearChange]);

  const handleSliderChange = (value: number[]) => {
    clearPlaybackInterval();
    setIsPlaying(false);
    yearRef.current = value[0];
    onYearChange(value[0]);
  };

  const handlePlay = () => {
    if (isPlaying) {
      clearPlaybackInterval();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
  };

  const skipBackward = () => {
    onYearChange(Math.max(minYear, selectedYear - 50));
  };

  const skipForward = () => {
    onYearChange(Math.min(maxYear, selectedYear + 50));
  };

  const getCurrentPeriod = () => {
    return historicalPeriods.find(
      period => selectedYear >= period.start && selectedYear <= period.end
    );
  };

  const currentPeriod = getCurrentPeriod();

  return (
    <div className="bg-[#2D2D2D] border-t-2 border-[#C8A452] p-4 shadow-2xl">
      {/* Period indicator */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-3 bg-[#1A1A1A] rounded-full relative overflow-hidden shadow-inner border border-[#4A4A4A]">
          {historicalPeriods.map((period) => {
            const startPercent = ((period.start - minYear) / (maxYear - minYear)) * 100;
            const width = ((period.end - period.start) / (maxYear - minYear)) * 100;
            
            return (
              <div
                key={period.name}
                className={`absolute h-full ${period.color} opacity-70`}
                style={{
                  left: `${startPercent}%`,
                  width: `${width}%`,
                  background: period.name.includes('Cận đại') ? 'linear-gradient(90deg, #8B1538, #A41E3F)' :
                             period.name.includes('Bắc thuộc') ? 'linear-gradient(90deg, #8B1538, #5C0F26)' :
                             'linear-gradient(90deg, #C8A452, #9C7E3D)'
                }}
              />
            );
          })}
          
          {/* Current position marker - Metallic slider */}
          <motion.div
            className="absolute h-full w-1 shadow-lg"
            style={{
              left: `${((selectedYear - minYear) / (maxYear - minYear)) * 100}%`,
              background: 'linear-gradient(90deg, #E0C075, #C8A452, #9C7E3D)',
              boxShadow: '0 0 10px rgba(200, 164, 82, 0.8), 0 0 20px rgba(200, 164, 82, 0.4)'
            }}
            layoutId="timeline-marker"
          >
            {/* Ornate marker head */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-[#E0C075] to-[#9C7E3D] border-2 border-[#C8A452] rounded-sm rotate-45 shadow-lg"></div>
          </motion.div>
        </div>
        
        {currentPeriod && (
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full">
            <div className={`w-2 h-2 rounded-full ${currentPeriod.color}`} />
            <span className="text-slate-300 text-sm whitespace-nowrap">
              {currentPeriod.name}
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={skipBackward}
            disabled={selectedYear <= minYear}
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="default"
            onClick={handlePlay}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={skipForward}
            disabled={selectedYear >= maxYear}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Year slider */}
        <div className="flex-1 flex items-center gap-3">
          <span className="text-slate-400 text-sm min-w-[60px]">
            {minYear}
          </span>
          
          <Slider
            value={[selectedYear]}
            onValueChange={handleSliderChange}
            min={minYear}
            max={maxYear}
            step={1}
            className="flex-1"
          />
          
          <span className="text-slate-400 text-sm min-w-[60px] text-right">
            {maxYear}
          </span>
        </div>

        {/* Speed control */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Tốc độ:</span>
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="bg-slate-800 text-slate-300 border border-slate-700 rounded px-2 py-1 text-sm"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={5}>5x</option>
          </select>
        </div>
      </div>

      {/* Year markers */}
      <div className="mt-2 relative h-4">
        {[minYear, 1200, 1400, 1600, 1800, maxYear].filter((year, index, arr) => arr.indexOf(year) === index).map((year) => {
          const position = ((year - minYear) / (maxYear - minYear)) * 100;
          return (
            <div
              key={year}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${position}%` }}
            >
              <div className="w-px h-2 bg-slate-600" />
              <span className="text-slate-500 text-xs absolute top-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                {year}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
