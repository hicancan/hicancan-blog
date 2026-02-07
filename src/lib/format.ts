import { SITE_CONFIG } from '../config';

/**
 * Format a date to locale string
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString(SITE_CONFIG.locale, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
}

/**
 * Format a date to short locale string (MM/DD)
 */
export function formatDateShort(date: Date): string {
    return date.toLocaleDateString(SITE_CONFIG.locale, {
        month: '2-digit',
        day: '2-digit',
    });
}
