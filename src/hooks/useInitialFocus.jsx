import {useEffect} from "react";
import {queryFocusableElements} from "../handlers/trapFocusInComponent";
import PropTypes from "prop-types";

const useInitialFocus = (show, ref, wantLast = true) => {
    useEffect(() => {
        if (!show) return;

        const focusableElements = queryFocusableElements(ref);
        if (focusableElements.length < 1) return;

        const focusElement = wantLast
            ? focusableElements[focusableElements.length - 1]
            : focusableElements[0];
        focusElement.focus();
    }, [show, ref, wantLast]);
}

useInitialFocus.propTyoes = {
    show: PropTypes.bool.isRequired,
    ref: PropTypes.shape({}).isRequired,
    wantLast: PropTypes.bool.isRequired,
}

export default useInitialFocus;
