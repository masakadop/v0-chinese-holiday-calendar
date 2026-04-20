"use client";

import { useMemo } from "react";
import { TodayHero } from "@/components/today-hero";
import { TodaySection } from "@/components/today-section";
import { AnniversaryList } from "@/components/anniversary-list";
import {
  getAllAnniversaries,
  Anniversary,
} from "@/lib/chinese-anniversaries";
import {
  solarToLunar,
  matchesLunarDate,
  matchesSolarDate,
  isNearLunarDate,
  isNearSolarDate,
} from "@/lib/lunar-calendar";

export default function ChineseAnniversaryPage() {
  const { date, lunarDate, todayAnniversaries, upcomingAnniversaries } = useMemo(() => {
    const now = new Date();
    const lunar = solarToLunar(now);
    const allAnniversaries = getAllAnniversaries();

    // 今日の記念日を検索
    const today: Anniversary[] = allAnniversaries.filter((anniversary) => {
      if (anniversary.lunarDate) {
        return matchesLunarDate(lunar, anniversary.lunarDate.month, anniversary.lunarDate.day);
      }
      if (anniversary.solarDate) {
        return matchesSolarDate(now, anniversary.solarDate.month, anniversary.solarDate.day);
      }
      return false;
    });

    // 近日中の記念日を検索（前後3日以内、今日は除く）
    const upcoming: Anniversary[] = allAnniversaries.filter((anniversary) => {
      // 今日の記念日は除外
      if (today.some((t) => t.id === anniversary.id)) {
        return false;
      }

      if (anniversary.lunarDate) {
        return isNearLunarDate(lunar, anniversary.lunarDate.month, anniversary.lunarDate.day, 3);
      }
      if (anniversary.solarDate) {
        return isNearSolarDate(now, anniversary.solarDate.month, anniversary.solarDate.day, 3);
      }
      return false;
    });

    return {
      date: now,
      lunarDate: lunar,
      todayAnniversaries: today,
      upcomingAnniversaries: upcoming,
    };
  }, []);

  return (
    <main className="min-h-screen">
      {/* ヘッダー */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏮</span>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-foreground font-serif">
                  本日の記念日
                </h1>
                <p className="text-xs text-muted-foreground">
                  中国伝統暦カレンダー
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground font-serif">
                {lunarDate.stem}{lunarDate.branch}年
              </p>
              <p className="text-xs text-muted-foreground">
                {lunarDate.zodiac}年
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* 今日の日付表示 */}
        <TodayHero date={date} lunarDate={lunarDate} />

        {/* 今日と近日中の記念日 */}
        <section>
          <TodaySection
            todayAnniversaries={todayAnniversaries}
            upcomingAnniversaries={upcomingAnniversaries}
          />
        </section>

        {/* 区切り線 */}
        <div className="flex items-center gap-4 py-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-muted-foreground font-serif text-sm">
            すべての記念日一覧
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* すべての記念日リスト */}
        <section>
          <AnniversaryList
            date={date}
            lunarDate={lunarDate}
            todayAnniversaries={todayAnniversaries}
            upcomingAnniversaries={upcomingAnniversaries}
          />
        </section>
      </div>

      {/* フッター */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p className="font-serif">
              中国の伝統的な記念日、宗教行事、民間伝承に基づく記念日をご紹介しています
            </p>
            <p className="text-xs">
              ※旧暦の日付は概算です。正確な日付は天文暦をご確認ください。
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <span>🧧</span>
              <span>🏮</span>
              <span>🐉</span>
              <span>☯️</span>
              <span>🥮</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
