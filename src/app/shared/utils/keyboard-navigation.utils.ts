/**
 * Keyboard Navigation Utilities
 *
 * Provides consistent keyboard navigation patterns across the application.
 * Handles Enter, Space key interactions for accessibility compliance.
 */

export class KeyboardNavigationUtils {

  /**
   * Standard keyboard navigation handler for clickable elements
   * Executes callback on Enter or Space key press
   *
   * @param event - KeyboardEvent from template
   * @param callback - Function to execute on key activation
   * @param preventDefault - Whether to prevent default behavior (default: true)
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
   * Keyboard navigation handler for external links
   * Provides consistent behavior for opening external URLs
   *
   * @param event - KeyboardEvent from template
   * @param url - URL to open
   * @param linkHandler - Optional custom link handler function
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
        // Default secure external link behavior
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }
  }

  /**
   * Keyboard navigation handler for togglable elements
   * Common pattern for expandable content, modals, etc.
   *
   * @param event - KeyboardEvent from template
   * @param condition - Boolean condition to check before toggle
   * @param toggleCallback - Function to execute the toggle
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
   * Keyboard navigation handler for conditional actions
   * Provides flexibility for complex conditional logic
   *
   * @param event - KeyboardEvent from template
   * @param conditionFn - Function that returns boolean condition
   * @param actionFn - Function to execute if condition is true
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

  /**
   * Get standard accessibility attributes for keyboard-navigable elements
   * Returns object with tabindex, role, and keyboard event handler
   *
   * @param isInteractive - Whether element should be keyboard accessible
   * @param role - ARIA role for the element (default: 'button')
   * @param ariaLabel - Accessible label for screen readers
   */
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