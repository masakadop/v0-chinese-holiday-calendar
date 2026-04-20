"use client";

import { AnniversaryCard } from "@/components/anniversary-card";
import { Anniversary } from "@/lib/chinese-anniversaries";

interface TodaySectionProps {
  todayAnniversaries: Anniversary[];
  upcomingAnniversaries: Anniversary[];
}

export function TodaySection({ todayAnniversaries, upcomingAnniversaries }: TodaySectionProps) {
  const hasTodayAnniversaries = todayAnniversaries.length > 0;
  const hasUpcomingAnniversaries = upcomingAnniversaries.length > 0;

  if (!hasTodayAnniversaries && !hasUpcomingAnniversaries) {
    return (
      <div className="text-center py-8 px-4 bg-muted/30 rounded-xl">
        <p className="text-lg text-muted-foreground font-serif">
          本日は特別な記念日はありませんが、
        </p>
        <p className="text-lg text-muted-foreground font-serif">
          毎日が感謝の日です 🙏
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hasTodayAnniversaries && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4 font-serif flex items-center gap-2">
            <span className="text-primary">🎊</span>
            本日の記念日
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {todayAnniversaries.map((anniversary) => (
              <AnniversaryCard
                key={anniversary.id}
                anniversary={anniversary}
                isToday
              />
            ))}
          </div>
        </div>
      )}

      {hasUpcomingAnniversaries && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4 font-serif flex items-center gap-2">
            <span className="text-secondary-foreground">📅</span>
            間近の記念日
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingAnniversaries.map((anniversary) => (
              <AnniversaryCard
                key={anniversary.id}
                anniversary={anniversary}
                isUpcoming
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
