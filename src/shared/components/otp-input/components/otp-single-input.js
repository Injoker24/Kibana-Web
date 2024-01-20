import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * This is react stateless component
 * Renders an input box
 * @param {Object} {
 *   focused,
 *   autoFocus,
 *   disabled,
 *   value,
 *   secure,
 *   ...rest
 * }
 * @returns
 */
const OtpSingleInput = ({
    focused,
    autoFocus,
    disabled,
    value,
    onInputFocus,
    index,
    secure,
    className,
    ...rest
}) => {
    const inputRef = useRef(null);
    const componentMounted = useRef(false);
    useEffect(() => {
        // When component mounts
        if (autoFocus && focused) {
            inputRef.current.focus();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // When component focus updates
        if (componentMounted.current && focused) {
            inputRef.current.focus();
        }
        componentMounted.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focused]);

    const handleFocus = event => onInputFocus(index, event);

    return (
        <input
            className={`form-control otp-single-input ${className} ${secure ? 'secure-input' : ''}`}
            // type={secure ? "password" : "tel"}
            type={'tel'}
            maxLength="1"
            ref={inputRef}
            disabled={disabled}
            onFocus={handleFocus}
            autoComplete={'none'} // normalnya ini 'on' / 'off'. tetapi entah kenapa di chrome android dia agak bluun. konon katanya, autocomplete ini dalemnya keyword. dan 'off' itu banyak di abuse sampe akhirnya ga dianggap. ah. sudahlah..
            value={value || ""}
            {...rest}
        />
    );
};

OtpSingleInput.propTypes = {
    focus: PropTypes.bool,
    autoFocus: PropTypes.bool,
    numInputs: PropTypes.number,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    secure: PropTypes.bool,
    className: PropTypes.string
};

export default React.memo(OtpSingleInput);