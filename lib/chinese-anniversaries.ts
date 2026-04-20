import anniversariesData from "@/data/chinese-anniversaries.json";

// 中国の伝統的な記念日データ
export interface Anniversary {
  id: string;
  name: string;
  nameJa: string;
  category: "traditional" | "religious" | "folk";
  description: string;
  descriptionJa: string;
  lunarDate?: { month: number; day: number };
  solarDate?: { month: number; day: number };
  icon: string;
}

type AnniversariesData = Record<Anniversary["category"], Anniversary[]>;

const typedAnniversariesData = anniversariesData as AnniversariesData;

// 伝統的な祝日（旧暦）
export const traditionalHolidays: Anniversary[] = typedAnniversariesData.traditional;

// 宗教的な記念日
export const religiousHolidays: Anniversary[] = typedAnniversariesData.religious;

// 民間伝承・民間団体が提唱する記念日
export const folkHolidays: Anniversary[] = typedAnniversariesData.folk;

// すべての記念日を取得
export function getAllAnniversaries(): Anniversary[] {
  return [...traditionalHolidays, ...religiousHolidays, ...folkHolidays];
}

// カテゴリーの日本語名
export const categoryNames: Record<Anniversary["category"], string> = {
  traditional: "伝統的祝日",
  religious: "宗教行事",
  folk: "民間伝承・記念日"
};

// カテゴリーの説明
export const categoryDescriptions: Record<Anniversary["category"], string> = {
  traditional: "中国の伝統的な祝日・節句",
  religious: "仏教・道教・儒教などの宗教的な記念日",
  folk: "民間伝承や民間団体が提唱する記念日"
};

// カテゴリーのカラー
export const categoryColors: Record<Anniversary["category"], { bg: string; text: string; border: string }> = {
  traditional: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
  religious: { bg: "bg-secondary/20", text: "text-secondary-foreground", border: "border-secondary/30" },
  folk: { bg: "bg-muted", text: "text-muted-foreground", border: "border-muted-foreground/20" }
};
