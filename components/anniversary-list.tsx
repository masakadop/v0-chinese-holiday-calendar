"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnniversaryCard } from "@/components/anniversary-card";
import {
  Anniversary,
  traditionalHolidays,
  religiousHolidays,
  folkHolidays,
  categoryNames,
  categoryDescriptions,
} from "@/lib/chinese-anniversaries";
import { LunarDate, matchesLunarDate, matchesSolarDate, isNearLunarDate, isNearSolarDate } from "@/lib/lunar-calendar";

interface AnniversaryListProps {
  date: Date;
  lunarDate: LunarDate;
  todayAnniversaries: Anniversary[];
  upcomingAnniversaries: Anniversary[];
}

function CategorySection({
  category,
  anniversaries,
  date,
  lunarDate,
  todayAnniversaries,
  upcomingAnniversaries,
}: {
  category: Anniversary["category"];
  anniversaries: Anniversary[];
  date: Date;
  lunarDate: LunarDate;
  todayAnniversaries: Anniversary[];
  upcomingAnniversaries: Anniversary[];
}) {
  const todayIds = new Set(todayAnniversaries.map(a => a.id));
  const upcomingIds = new Set(upcomingAnniversaries.map(a => a.id));
  
  // 今日の記念日を先頭に、近い記念日を次に並べる
  const sortedAnniversaries = [...anniversaries].sort((a, b) => {
    const aIsToday = todayIds.has(a.id);
    const bIsToday = todayIds.has(b.id);
    const aIsUpcoming = upcomingIds.has(a.id);
    const bIsUpcoming = upcomingIds.has(b.id);
    
    if (aIsToday && !bIsToday) return -1;
    if (!aIsToday && bIsToday) return 1;
    if (aIsUpcoming && !bIsUpcoming) return -1;
    if (!aIsUpcoming && bIsUpcoming) return 1;
    return 0;
  });

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-foreground font-serif">
          {categoryNames[category]}
        </h2>
        <p className="text-sm text-muted-foreground">
          {categoryDescriptions[category]}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedAnniversaries.map((anniversary) => (
          <AnniversaryCard
            key={anniversary.id}
            anniversary={anniversary}
            isToday={todayIds.has(anniversary.id)}
            isUpcoming={upcomingIds.has(anniversary.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function AnniversaryList({
  date,
  lunarDate,
  todayAnniversaries,
  upcomingAnniversaries,
}: AnniversaryListProps) {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="all" className="text-xs md:text-sm">
          すべて
        </TabsTrigger>
        <TabsTrigger value="traditional" className="text-xs md:text-sm">
          伝統
        </TabsTrigger>
        <TabsTrigger value="religious" className="text-xs md:text-sm">
          宗教
        </TabsTrigger>
        <TabsTrigger value="folk" className="text-xs md:text-sm">
          民間
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-8">
        <CategorySection
          category="traditional"
          anniversaries={traditionalHolidays}
          date={date}
          lunarDate={lunarDate}
          todayAnniversaries={todayAnniversaries}
          upcomingAnniversaries={upcomingAnniversaries}
        />
        <CategorySection
          category="religious"
          anniversaries={religiousHolidays}
          date={date}
          lunarDate={lunarDate}
          todayAnniversaries={todayAnniversaries}
          upcomingAnniversaries={upcomingAnniversaries}
        />
        <CategorySection
          category="folk"
          anniversaries={folkHolidays}
          date={date}
          lunarDate={lunarDate}
          todayAnniversaries={todayAnniversaries}
          upcomingAnniversaries={upcomingAnniversaries}
        />
      </TabsContent>

      <TabsContent value="traditional">
        <CategorySection
          category="traditional"
          anniversaries={traditionalHolidays}
          date={date}
          lunarDate={lunarDate}
          todayAnniversaries={todayAnniversaries}
          upcomingAnniversaries={upcomingAnniversaries}
        />
      </TabsContent>

      <TabsContent value="religious">
        <CategorySection
          category="religious"
          anniversaries={religiousHolidays}
          date={date}
          lunarDate={lunarDate}
          todayAnniversaries={todayAnniversaries}
          upcomingAnniversaries={upcomingAnniversaries}
        />
      </TabsContent>

      <TabsContent value="folk">
        <CategorySection
          category="folk"
          anniversaries={folkHolidays}
          date={date}
          lunarDate={lunarDate}
          todayAnniversaries={todayAnniversaries}
          upcomingAnniversaries={upcomingAnniversaries}
        />
      </TabsContent>
    </Tabs>
  );
}
