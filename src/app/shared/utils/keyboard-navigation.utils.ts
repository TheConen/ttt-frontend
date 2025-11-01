/**
 * Keyboard navigation utilities for accessibility (Enter/Space key handling)
 */

export class KeyboardNavigationUtils {

  /**
   * Executes callback on Enter or Space key press
   */
  static handleActivation(
    event: KeyboardEvent,
    callback: () => void,
  preventDefault = true
  ): void {
    if (event.key === 'Enter' || event.key === ' ') {
      if (preventDefault) {
        event.preventDefault();
      }
      callback();
    }
  }

  /**
   * Opens external link with custom or default handler
   */
  static handleExternalLink(
    event: KeyboardEvent,
    url: string,
    linkHandler?: (url: string, event: Event) => void
  ): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      if (linkHandler) {
        linkHandler(url, event);
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }
  }

  /**
   * Handles toggle actions with condition check
   */
  static handleToggle(
    event: KeyboardEvent,
    condition: boolean,
    toggleCallback: () => void
  ): void {
    if (condition && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      toggleCallback();
    }
  }

  /**
   * Executes action if condition function returns true
   */
  static handleConditional(
    event: KeyboardEvent,
    conditionFn: () => boolean,
    actionFn: () => void
  ): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (conditionFn()) {
        actionFn();
      }
    }
  }

  static getAccessibilityAttributes(
    isInteractive = true,
    role = 'button',
    ariaLabel?: string
  ): Record<string, string | number | null> {
    return {
      'attr.tabindex': isInteractive ? 0 : -1,
      'attr.role': isInteractive ? role : null,
      'attr.aria-label': ariaLabel || null
    };
  }
}
