/**
 * Check leap year
 * 
 * @param {number} value - Year
 */
export default function isLeapYear(value: number) {
    if (value % 400 === 0) return true;
    if (value % 100 === 0) return false;
    if (value % 4 === 0) return true;

    return false;
};