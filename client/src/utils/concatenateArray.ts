export default function concatenateArray(array: string[], separator: string) {
  return array.filter(Boolean).join(separator);
}
