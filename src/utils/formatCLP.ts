/**
 * Formats a number as Chilean Peso (CLP).
 * Example: 6990 → "$6.990"
 */
export function formatCLP(value: number): string {
  return value.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
}
