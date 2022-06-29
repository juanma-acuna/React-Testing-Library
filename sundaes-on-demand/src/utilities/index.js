/**
 * @function formatCurrency
 * Format a number as a currency (USD)
 *
 * @param {number} amount
 * @returns {string}
 *
 * @example
 * formatCurrency(0) => $0.00
 *
 * @example
 * formatCurrency(1.5) => $1.50
 *
 * @example
 * formatCurrency(45.9887) => $45.99
 */
export function formatCurrency(amount) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format(amount);
}
