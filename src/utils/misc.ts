/**
 *
 * @param value any
 * @returns whether the value is `undefined` or `null`
 */
export function isNil(value: unknown): value is null | undefined {
  return value === undefined || value === null;
}

export function capitalize(value: string): string {
  if (!value.length) return value;

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function fromSecondsToHumanReadable(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);

  const components: string[] = [];

  if (hours > 0) components.push(`${hours}h`);
  if (minutes > 0) components.push(`${minutes}m`);

  return components.join(" ");
}

export function formatCamelCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
