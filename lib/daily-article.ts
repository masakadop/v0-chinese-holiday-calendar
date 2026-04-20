import { Anniversary } from "@/lib/chinese-anniversaries";
import { LunarDate } from "@/lib/lunar-calendar";

interface GenerateDailyArticleInput {
  date: Date;
  lunarDate: LunarDate;
  todayAnniversaries: Anniversary[];
  upcomingAnniversaries: Anniversary[];
}

const categoryLabel: Record<Anniversary["category"], string> = {
  traditional: "伝統行事",
  religious: "宗教行事",
  folk: "民間行事",
};

function formatDate(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function summarizeCategories(anniversaries: Anniversary[]) {
  const unique = Array.from(new Set(anniversaries.map((item) => categoryLabel[item.category])));
  return unique.join("・");
}

export function generateDailyArticle({
  date,
  lunarDate,
  todayAnniversaries,
  upcomingAnniversaries,
}: GenerateDailyArticleInput) {
  const dateLine = `${formatDate(date)}（${lunarDate.stem}${lunarDate.branch}年・${lunarDate.zodiac}）`;

  if (todayAnniversaries.length === 0 && upcomingAnniversaries.length === 0) {
    return {
      title: "本日の歳時ミニコラム",
      body: [
        `${dateLine}の暦では、目立った記念日はありません。`,
        "記念日がない日は、季節の変化や日常の習慣に目を向ける良い機会です。",
        "中国文化では日々の積み重ねを大切にし、家族や周囲への感謝を表すことが吉とされています。",
      ],
    };
  }

  const todayNames = todayAnniversaries.map((item) => `${item.icon}${item.nameJa}`).join("、");
  const upcomingNames = upcomingAnniversaries
    .slice(0, 3)
    .map((item) => `${item.icon}${item.nameJa}`)
    .join("、");

  const todayCategories = summarizeCategories(todayAnniversaries);
  const upcomingCategories = summarizeCategories(upcomingAnniversaries);

  const body = [
    `${dateLine}は、${todayNames || "注目日"}に関連する一日です。`,
    todayAnniversaries.length > 0
      ? `本日のテーマは主に${todayCategories}で、由来や風習には先祖供養・家族団らん・自然への祈りといった価値観が見られます。`
      : "本日は大きな記念日がないため、近づく行事に向けた準備を進めるのに適した日です。",
    upcomingAnniversaries.length > 0
      ? `今後数日では${upcomingNames}などの${upcomingCategories}が控えています。関連する食文化や参拝習慣を事前に確認すると、より深く楽しめます。`
      : "近日中の該当行事は少ないため、年間行事の背景を学ぶ期間として活用できます。",
  ];

  return {
    title: "データから生成した本日の文化記事",
    body,
  };
}
