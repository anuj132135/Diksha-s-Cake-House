import { useEffect } from 'react';

/**
 * useDialogFallback: Implements light-dismiss fallback for browsers without
 * native `closedby` support per Modern Web Guidance:
 * - Checks target === dialog
 * - Calculates getBoundingClientRect() to distinguish backdrop vs dialog content
 * - Closes dialog if clicked on backdrop
 */
export function useDialogFallback(dialogRef, isOpen, onClose) {
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        try {
          dialog.showModal();
        } catch {
          // Dialog may already be open
        }
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }

    // Fallback for browsers without native closedby support
    const handleDialogClick = (event) => {
      // 1. When clicking the backdrop, event target is the dialog itself
      if (event.target !== dialog) return;

      // 2. Check if click coordinates fall within content box
      const rect = dialog.getBoundingClientRect();
      const isInsideContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );

      if (isInsideContent) return;

      // 3. Clicked on backdrop, dismiss
      if (onClose) {
        onClose();
      } else {
        dialog.close();
      }
    };

    dialog.addEventListener('click', handleDialogClick);

    // Also sync close event when user presses Esc
    const handleClose = () => {
      if (onClose) onClose();
    };
    dialog.addEventListener('close', handleClose);

    return () => {
      dialog.removeEventListener('click', handleDialogClick);
      dialog.removeEventListener('close', handleClose);
    };
  }, [dialogRef, isOpen, onClose]);
}
