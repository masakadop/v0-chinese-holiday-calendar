// 簡易的な旧暦変換（概算）
// 実際のアプリケーションでは、より正確なライブラリを使用することを推奨します

// 旧暦の月名
export const lunarMonthNames = [
  "正月", "二月", "三月", "四月", "五月", "六月",
  "七月", "八月", "九月", "十月", "十一月", "腊月"
];

// 旧暦の日名
export const lunarDayNames = [
  "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
  "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"
];

// 干支（年）
export const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
export const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
export const zodiacAnimals = ["鼠", "牛", "虎", "兎", "龍", "蛇", "馬", "羊", "猿", "鶏", "犬", "猪"];

// 旧暦データ（2020-2030年の概算データ）
// 各年のデータ: [新年の日付（月/日）, うるう月（0=なし）]
const lunarYearData: Record<number, [number, number, number]> = {
  2020: [1, 25, 4],  // 2020年1月25日が旧正月、うるう4月
  2021: [2, 12, 0],
  2022: [2, 1, 0],
  2023: [1, 22, 2],
  2024: [2, 10, 0],
  2025: [1, 29, 6],
  2026: [2, 17, 0],
  2027: [2, 6, 0],
  2028: [1, 26, 0],
  2029: [2, 13, 0],
  2030: [2, 3, 0],
};

export interface LunarDate {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
  stem: string;
  branch: string;
  zodiac: string;
  monthName: string;
  dayName: string;
}

// 新暦から旧暦への概算変換
export function solarToLunar(date: Date): LunarDate {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // 干支の計算
  const stemIndex = (year - 4) % 10;
  const branchIndex = (year - 4) % 12;
  
  // 旧暦の概算（簡易版）
  // 実際は複雑な天文計算が必要ですが、ここでは概算を使用
  const yearData = lunarYearData[year];
  
  let lunarYear = year;
  let lunarMonth: number;
  let lunarDay: number;
  
  if (yearData) {
    const newYearMonth = yearData[0];
    const newYearDay = yearData[1];
    
    const newYearDate = new Date(year, newYearMonth - 1, newYearDay);
    const diffDays = Math.floor((date.getTime() - newYearDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      // 旧正月前
      lunarYear = year - 1;
      // 前年の12月として概算
      lunarMonth = 12;
      lunarDay = 30 + diffDays;
      if (lunarDay <= 0) {
        lunarMonth = 11;
        lunarDay = 30 + lunarDay;
      }
    } else {
      // 旧正月後
      // 簡易的に30日/月として計算
      lunarMonth = Math.floor(diffDays / 30) + 1;
      lunarDay = (diffDays % 30) + 1;
      
      if (lunarMonth > 12) {
        lunarMonth = 12;
        lunarDay = 30;
      }
    }
  } else {
    // データがない年は概算
    lunarMonth = month;
    lunarDay = day;
  }
  
  // 干支の再計算（旧暦年に基づく）
  const actualStemIndex = (lunarYear - 4) % 10;
  const actualBranchIndex = (lunarYear - 4) % 12;
  
  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    isLeapMonth: false,
    stem: heavenlyStems[actualStemIndex >= 0 ? actualStemIndex : actualStemIndex + 10],
    branch: earthlyBranches[actualBranchIndex >= 0 ? actualBranchIndex : actualBranchIndex + 12],
    zodiac: zodiacAnimals[actualBranchIndex >= 0 ? actualBranchIndex : actualBranchIndex + 12],
    monthName: lunarMonthNames[lunarMonth - 1] || "正月",
    dayName: lunarDayNames[lunarDay - 1] || "初一"
  };
}

// 旧暦の日付が一致するかチェック
export function matchesLunarDate(
  lunarDate: LunarDate,
  targetMonth: number,
  targetDay: number
): boolean {
  return lunarDate.month === targetMonth && lunarDate.day === targetDay;
}

// 新暦の日付が一致するかチェック
export function matchesSolarDate(
  date: Date,
  targetMonth: number,
  targetDay: number
): boolean {
  return (date.getMonth() + 1) === targetMonth && date.getDate() === targetDay;
}

// 旧暦の日付が近いかチェック（前後N日以内）
export function isNearLunarDate(
  lunarDate: LunarDate,
  targetMonth: number,
  targetDay: number,
  daysRange: number = 3
): boolean {
  if (lunarDate.month !== targetMonth) return false;
  return Math.abs(lunarDate.day - targetDay) <= daysRange;
}

// 新暦の日付が近いかチェック（前後N日以内）
export function isNearSolarDate(
  date: Date,
  targetMonth: number,
  targetDay: number,
  daysRange: number = 3
): boolean {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (month !== targetMonth) return false;
  return Math.abs(day - targetDay) <= daysRange;
}
