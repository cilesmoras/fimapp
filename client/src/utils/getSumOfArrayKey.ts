export default function getSumOfArrayKey(
  arr: Record<string, unknown>[],
  key: string
) {
  return arr?.reduce((accumulator, currentValue) => {
    const value = parseFloat(currentValue[key] as string);
    return accumulator + (isNaN(value) ? 0 : value);
  }, 0);
}
