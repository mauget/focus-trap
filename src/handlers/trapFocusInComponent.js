/**
 * Collect array of ordered focusable child elements
 * @param ref
 * @returns {*}
 */
const queryFocusableElements = (ref) => {
    // Core data: collect ordered focusable child elements
    const { current: rootElement } = ref;
    const query = 'a[href], button:not([disabled]), textarea, input, select';

    return rootElement.querySelectorAll(query);
}

/**
 * Side-effect: trap focus to focusable members of the given event's subtree.
 *
 * Based on https://dev.to/mohitkyadav/how-to-trap-focus-in-react-3in8
 * Call from onKeyDown on root of modal, passing a ref to that root
 * @param event
 * @param refFocusTrap
 */
const trapFocusInComponent = (event, refFocusTrap) => {
    // No tab, no interest
    if (event.key !== 'Tab') return;

    // Get first and last elements
    const focusableElements = queryFocusableElements(refFocusTrap);
    if (focusableElements.length < 1) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const { shiftKey: backwardDirection } = event;
    const forwardDirection = !backwardDirection;

    // Begin logic to wrap focus if tab attempt out of component ...
    const { activeElement } = document;
    let focusTargetElement = null;

    // 1 Forward tab on active lastElement? Set focus to first focusable element
    if (forwardDirection && activeElement === lastElement) {
        focusTargetElement = firstElement;
    }

    // 2 Backward tab on active firstElement? Set focus to last focusable element
    if (backwardDirection && activeElement === firstElement) {
        focusTargetElement = lastElement;
    }

    // 3 Need a wrap? Force focus to wrap target, swallow key-down event.
    if (focusTargetElement) {
        focusTargetElement.focus();
        event.preventDefault();
    }
}
export { trapFocusInComponent, queryFocusableElements };
export default trapFocusInComponent;
