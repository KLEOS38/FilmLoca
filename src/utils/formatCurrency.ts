/**
 * Formats a number as currency with K (thousand) or M (million) notation for space economy
 * Examples:
 * - 500 -> "₦500"
 * - 50000 -> "₦50k"
 * - 2000000 -> "₦2m"
 * 
 * @param amount - The amount to format
 * @param currency - Currency symbol (default: "₦")
 * @returns Formatted string
 */
export function formatCompactCurrency(amount: number | null | undefined, currency: string = "₦"): string {
  if (amount === null || amount === undefined || amount === 0) {
    return "";
  }

  // If less than 1000, show as-is
  if (amount < 1000) {
    return `${currency}${amount.toLocaleString()}`;
  }

  // If 1000 or more but less than 1,000,000, use K notation
  if (amount >= 1000 && amount < 1000000) {
    const thousands = amount / 1000;
    // Round to 1 decimal place if needed, otherwise show as integer
    const rounded = thousands % 1 === 0 ? thousands : Math.round(thousands * 10) / 10;
    return `${currency}${rounded}k`;
  }

  // If 1,000,000 or more, use M notation
  const millions = amount / 1000000;
  const rounded = millions % 1 === 0 ? millions : Math.round(millions * 10) / 10;
  return `${currency}${rounded}m`;
}

