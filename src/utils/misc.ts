/**
 *
 * @param value any
 * @returns whether the value is `undefined` or `null`
 */
export function isNil(value: unknown): value is null | undefined {
  return value === undefined || value === null;
}
