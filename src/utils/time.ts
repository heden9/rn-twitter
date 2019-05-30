import moment from 'moment';

export function formatTime(unixTimeStamp: number): string {
  const time = moment.unix(unixTimeStamp);
  const now = moment();
  const tenDaysAgo = now.subtract(10, 'day');
  // 发帖日期在十天前
  if (time.isBefore(tenDaysAgo)) {
    return time.format('YYYY/M/D');
  }
  return time.fromNow(true);
}

export function formatTimeDetail(unixTimeStamp: number): string {
  const time = moment.unix(unixTimeStamp);
  return time.format('a h:mm · YYYY/M/D');
}
