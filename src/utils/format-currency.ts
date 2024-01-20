/**
 * Format number to thousand separator (.) format
 * 
 * @param {number|string} amount
 * 
 * @returns {string} Amount string in 'X.XXX.XXX'-format
 */
export default function formatCurrency(amount: number | string)
    : string {

    if (isNaN(Number(amount))) {
        return '';
    }

    return amount.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}