export function parseOffset(offset: string): number {
    const [sign, hours, minutes] = offset.match(/([+-])(\d{2}):(\d{2})/)!.slice(1);
    const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    return sign === "+" ? totalMinutes : -totalMinutes;
  }
  
  export function formatOffset(minutes: number): string {
    const sign = minutes < 0 ? "-" : "+";
    const absMinutes = Math.abs(minutes);
    const hours = String(Math.floor(absMinutes / 60)).padStart(2, "0");
    const mins = String(absMinutes % 60).padStart(2, "0");
    return `${sign}${hours}:${mins}`;
  }