export function parseTimeArguments (args) {
    const timeString = args.join(' ');

    const hourPattern = /(\d+)h/;
    const minutePattern = /(\d+)m/;
    const secondPattern = /(\d+)s/;

    const hours = timeString.match(hourPattern) ? parseInt(timeString.match(hourPattern)[1]) : 0;
    const minutes = timeString.match(minutePattern) ? parseInt(timeString.match(minutePattern)[1]) : 0;
    const seconds = timeString.match(secondPattern) ? parseInt(timeString.match(secondPattern)[1]) : 0;

    return Number((hours * 3600 || 0) + (minutes * 60 || 0) + (seconds || 0) * 1000);
}

export function formatDuration(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  
  return `${hours}h ${minutes}m ${seconds}s`;
}