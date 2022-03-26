export function parseOrDefault(x: string | number | undefined, defaultValue: number): number {
  let result: number;

  if (x === undefined) {
    result = defaultValue;
  } else if (typeof x === 'string') {
    result = parseInt(x, 10);
    if (Number.isNaN(result)) result = defaultValue;
  } else {
    result = x;
  }

  return result;
}
