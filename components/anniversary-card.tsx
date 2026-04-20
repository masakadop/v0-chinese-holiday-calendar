"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Anniversary, categoryNames, categoryColors } from "@/lib/chinese-anniversaries";
import { cn } from "@/lib/utils";

interface AnniversaryCardProps {
  anniversary: Anniversary;
  isToday?: boolean;
  isUpcoming?: boolean;
}

export function AnniversaryCard({ anniversary, isToday, isUpcoming }: AnniversaryCardProps) {
  const colors = categoryColors[anniversary.category];
  
  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-lg border-l-4",
        colors.border,
        isToday && "ring-2 ring-primary ring-offset-2 shadow-lg"
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label={anniversary.nameJa}>
              {anniversary.icon}
            </span>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {anniversary.nameJa}
              </h3>
              <p className="text-sm text-muted-foreground font-serif">
                {anniversary.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge 
              variant="outline" 
              className={cn(colors.bg, colors.text, "text-xs")}
            >
              {categoryNames[anniversary.category]}
            </Badge>
            {isToday && (
              <Badge className="bg-primary text-primary-foreground text-xs animate-pulse">
                本日
              </Badge>
            )}
            {isUpcoming && !isToday && (
              <Badge variant="secondary" className="text-xs">
                間近
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground leading-relaxed">
          {anniversary.descriptionJa}
        </p>
        <div className="mt-3 text-xs text-muted-foreground">
          {anniversary.lunarDate ? (
            <span>
              旧暦 {anniversary.lunarDate.month}月{anniversary.lunarDate.day}日
            </span>
          ) : anniversary.solarDate ? (
            <span>
              新暦 {anniversary.solarDate.month}月{anniversary.solarDate.day}日
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
