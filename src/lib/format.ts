/**
 * Formatting utilities
 */

/**
 * Format a date to zh-CN locale string
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
}

/**
 * Format a date to short zh-CN locale string (MM/DD)
 */
export function formatDateShort(date: Date): string {
    return date.toLocaleDateString('zh-CN', {
        month: '2-digit',
        day: '2-digit'
    });
}
