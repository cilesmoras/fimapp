export function truncateString(string: string, length: number) {
  if (string.length <= length) return string;

  return `${string.slice(0, length)}...`;
}
