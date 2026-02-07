import { useRef, useEffect } from 'react';

/**
 * Hook to lock the body scroll.
 * @param isLocked Whether the scroll should be locked or not.
 */
export function useLockBodyScroll(isLocked: boolean) {
    const originalOverflow = useRef<string | null>(null);

    useEffect(() => {
        if (isLocked) {
            // Save original overflow style if not already saved
            if (originalOverflow.current === null) {
                originalOverflow.current = document.body.style.overflow || '';
                const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.paddingRight = `${scrollBarWidth}px`;
            }
            // Lock scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Restore original overflow style
            if (originalOverflow.current !== null) {
                document.body.style.overflow = originalOverflow.current;
                document.body.style.paddingRight = '';
                originalOverflow.current = null; // Reset ensures we re-capture if body style changes externally (though unlikely)
            } else {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            }
        }

        // Cleanup function to restore scroll on unmount if currently locked
        return () => {
            if (originalOverflow.current !== null) {
                document.body.style.overflow = originalOverflow.current;
                document.body.style.paddingRight = '';
            } else {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            }
        };
    }, [isLocked]);
}
