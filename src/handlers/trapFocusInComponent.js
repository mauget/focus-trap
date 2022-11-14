
// Based on https://dev.to/mohitkyadav/how-to-trap-focus-in-react-3in8
// Call from onKeyDown on root of modal, passing a ref to that root
const trapFocusInComponent = (event, refFocusTrap) => {
    // No tab, no interest
    if (event.key !== 'Tab') return;

    // Initial housekeeping ...

    // Core data: collect ordered focusable child elements
    const { current: rootElement } = refFocusTrap;
    const query = 'a[href], button:not([disabled]), textarea, input, select';

    const focusableElements = rootElement.querySelectorAll(query);
    const { length: elementCount } = focusableElements;

    // Maybe there are no focusable elements?
    if (elementCount === 0) return

    // Capture first and last elements of ordered list (each could be same element)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[elementCount - 1]

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

export default trapFocusInComponent;
