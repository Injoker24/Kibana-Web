import dayjs from 'dayjs';
import 'dayjs/locale/id';

/**
 * Converts Epoch Time to 'DD MMMM YYYY HH:mm:ss' format
 * 
 * @param {string|number} value Epoch Time (in UTC)
 * 
 * @returns {string} DateTime string in 'DD MMMM YYYY HH:mm:ss' format
 */
export default function formatDateTime(value: string | number): string {
    return dayjs(+value)
        .locale('id')
        .format('DD MMMM YYYY HH:mm:ss');
}