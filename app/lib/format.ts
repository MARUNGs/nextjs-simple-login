/**
 * 날짜 포맷
 * @param date
 * @returns
 */
export function formatToTimeAgo(date: string) {
  const formatter = new Intl.RelativeTimeFormat("ko");
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const dayOne = 1000 * 60 * 60 * 24;
  const diff = Math.round((time - now) / dayOne);
  return formatter.format(diff, "days");
}
