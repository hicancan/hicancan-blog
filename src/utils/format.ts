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
