import { min } from "rxjs";

function daysBetween(earlier: Date, later: Date) {
  const firstDate = earlier;
  const secondDate = later;

  const firstDateInMs = firstDate.getTime();
  const secondDateInMs = secondDate.getTime();

  const differenceBtwDates = secondDateInMs - firstDateInMs;

  const aDayInMs = 24 * 60 * 60 * 1000;

  const daysDiff = Math.round(differenceBtwDates / aDayInMs);
  return daysDiff;
}

export function dateDiffStr(earlier: Date, later: Date) {
  const days = later.getDate() - earlier.getDate();
  const hours = later.getHours() - earlier.getHours();
  const minutes = later.getMinutes() - earlier.getMinutes();
  const seconds = later.getSeconds() - earlier.getSeconds();

  if(days > 0) {
    return `${days} days`;
  }
  if(hours > 0) 
    return `${hours} hours`
  if(minutes > 0) 
    return `${minutes} mins`
  if(seconds > 30) 
    return `${seconds}s`
  return "now"
} 