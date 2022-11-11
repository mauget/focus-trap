
// Based on https://dev.to/mohitkyadav/how-to-trap-focus-in-react-3in8
// Call from onKeyDown on root of modal, passing a ref to that root
const trapFocusInComponent = (event, refFocusTrap) => {
    // No tab, no interest
    if (event.key !== 'Tab') return;

    // Core: collect ordered focusable elements with a filtered dom query
    const query = 'a[href], button:not([disabled]), textarea, input, select';
    const focusableElements = refFocusTrap.current.querySelectorAll(query);

    // Maybe there are no focusable elements?
    if (focusableElements.length === 0) return

    // Capture first and last elements of ordered list (both could be same element)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const backwardDirection = event.shiftKey;
    const forwardDirection = !backwardDirection;

    // Wrap focus if tab attempt out of component
    const activeElement = document.activeElement;
    let focusTargetElement = null;

    // Forward tab with active lastElement: set focus to first focusable element
    if (forwardDirection && activeElement === lastElement) {
        focusTargetElement = firstElement;
    }

    // Backward tab with active firstElement: set focus to last focusable element
    if (backwardDirection && activeElement === firstElement) {
        focusTargetElement = lastElement;
    }

    if (focusTargetElement) {
        focusTargetElement.focus();
        return event.preventDefault();
    }
}

export default trapFocusInComponent;
