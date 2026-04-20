"use client";

import { LunarDate } from "@/lib/lunar-calendar";

interface TodayHeroProps {
  date: Date;
  lunarDate: LunarDate;
}

export function TodayHero({ date, lunarDate }: TodayHeroProps) {
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekDay = weekDays[date.getDay()];
  
  return (
    <div className="relative overflow-hidden bg-card rounded-2xl border border-border shadow-sm">
      {/* 装飾的な背景パターン */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 text-[200px] font-serif text-primary leading-none select-none">
          福
        </div>
      </div>
      
      <div className="relative z-10 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* 新暦日付 */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">新暦</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl md:text-7xl font-bold text-primary font-serif">
                {date.getDate()}
              </span>
              <div className="flex flex-col">
                <span className="text-xl text-foreground font-medium">
                  {date.getFullYear()}年{date.getMonth() + 1}月
                </span>
                <span className="text-lg text-muted-foreground">
                  ({weekDay}曜日)
                </span>
              </div>
            </div>
          </div>
          
          {/* 旧暦日付 */}
          <div className="md:text-right">
            <p className="text-sm text-muted-foreground mb-1">旧暦（農暦）</p>
            <div className="flex items-baseline gap-2 md:justify-end">
              <div className="flex flex-col md:items-end">
                <span className="text-2xl md:text-3xl font-semibold text-secondary-foreground font-serif">
                  {lunarDate.monthName}{lunarDate.dayName}
                </span>
                <span className="text-lg text-muted-foreground font-serif">
                  {lunarDate.stem}{lunarDate.branch}年（{lunarDate.zodiac}年）
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 装飾ライン */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
          <span className="text-primary text-xl">☯</span>
          <div className="h-px flex-1 bg-gradient-to-l from-primary/50 to-transparent" />
        </div>
      </div>
    </div>
  );
}
