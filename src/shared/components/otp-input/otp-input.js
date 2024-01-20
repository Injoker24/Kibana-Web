import React, { useMemo } from 'react';
import { OtpSingleInput } from './components';
import { useOtpInput } from './hooks';
import PropTypes from 'prop-types';

const OtpInput = ({
    // main props
    length,
    value,
    onChange,

    // state
    disabled = false,
    autoFocus = true,
    secure = false,

    // class
    className = '',

    inputClassName = ''
}) => {
    const {
        activeInput,
        getOtpValue,
        handleOnChange,
        handleOnKeyDown,
        handleOnInput,
        handleOnPaste,
        onInputFocus
    } = useOtpInput({
        autoFocus,
        value,
        onChange,
        length
    });

    // Needs to be memorized
    const renderInputs = useMemo(() => {
        const value = getOtpValue();
        const inputs = [];

        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < length; index++) {
            inputs.push(
                <OtpSingleInput
                    key={index}
                    focused={activeInput === index}
                    value={value[index]}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    onInput={handleOnInput}
                    onPaste={handleOnPaste}
                    onInputFocus={onInputFocus}
                    index={index}
                    // onBlur={() => setActiveInput(-1)}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    secure={secure}
                    data-testid='input'
                    className={inputClassName}
                />
            );
        }

        return inputs;
    }, [
        getOtpValue,
        length,
        activeInput,
        handleOnChange,
        handleOnKeyDown,
        handleOnInput,
        handleOnPaste,
        onInputFocus,
        disabled,
        autoFocus,
        secure,
        inputClassName
    ]);

    return (
        <div className={'d-flex ' + className}>
            {renderInputs}
        </div>
    );
};

OtpInput.propTypes = {
    length: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func,

    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    secure: PropTypes.bool,

    className: PropTypes.string
};

OtpInput.defaultProps = {
    length: 4,
    value: '',
    onChange: () => { },

    disabled: false,
    autoFocus: false,
    secure: false,

    className: '',
    inputClassName: ''
};

export default OtpInput;