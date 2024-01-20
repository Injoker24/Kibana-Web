import { useState, useEffect } from "react";

const ZERO_KEYCODE = 48;
const NINE_KEYCODE = 57;

const useOtpInput = ({ autoFocus, value, onChange, length }) => {
    const [activeInput, setActiveInput] = useState(autoFocus ? 0 : -1);

    const getOtpValue = () => (value ? value.toString().split("") : []);

    // Helper to return OTP from input
    const handleOtpChange = otp => {
        let otpValue = otp.join("");
        onChange(otpValue);
    };

    // Focus on input by index
    const focusInput = input => {
        const nextActiveInput = Math.max(Math.min(length - 1, input), 0);
        setActiveInput(nextActiveInput);
    };

    /**
     * @typedef {"next" | "prev"} FocusDirections
     * @param {FocusDirections} direction
     */
    const focusInputByDirection = (direction = "next") => {
        focusInput(direction === "next" ? activeInput + 1 : activeInput - 1);
    };

    // Change OTP value at focused input
    const changeActiveInputValue = ([nextValue]) => {
        const otp = getOtpValue();
        otp[activeInput] = nextValue;
        handleOtpChange(otp);
    };

    // Handle pasted OTP
    const handleOnPaste = (e, data) => {
        e.preventDefault();
        const otp = getOtpValue();

        // Get pastedData in an array of max size (num of inputs - current position)
        const clipboardData =
            process.env.NODE_ENV === "test"
                ? data.slice(0, length - activeInput).split("")
                : e.clipboardData
                    .getData("text/plain")
                    .slice(0, length - activeInput)
                    .split("");

        // Paste data from focused input onwards
        // eslint-disable-next-line no-plusplus
        for (let pos = 0; pos < length; ++pos) {
            if (pos >= activeInput && clipboardData.length > 0) {
                otp[pos] = clipboardData.shift();
            }
        }

        // Pass copied value through onChange rules
        let filteredOtpValue = [otp.length];
        let validCharIndex = 0;
        for (let charIndex = 0; charIndex < otp.length; ++charIndex) {
            if (isValidNumber(otp[charIndex])) {
                filteredOtpValue[validCharIndex] = otp[charIndex];
                validCharIndex++;
            }
        }

        handleOtpChange(filteredOtpValue);
    };

    const isValidNumber = char => {
        return !(
            char.charCodeAt(0) > NINE_KEYCODE || char.charCodeAt(0) < ZERO_KEYCODE
        );
    };

    const handleOnChange = e => {
        if (isValidNumber(e.target.value)) {
            changeActiveInputValue(e.target.value);
        }
    };

    // Handle cases of backspace, delete, left arrow, right arrow
    const handleOnKeyDown = e => {
        switch (e.key) {
            case "Backspace":
                e.preventDefault();
                changeActiveInputValue("");
                focusInputByDirection("prev");
                break;
            case "Delete":
                e.preventDefault();
                changeActiveInputValue("");
                break;
            case "ArrowLeft":
                e.preventDefault();
                focusInputByDirection("prev");
                break;
            case "ArrowRight":
                e.preventDefault();
                focusInputByDirection("next");
                break;
            default:
                break;
        }
    };

    /** Seek to next input will be done, since it will be fixed by [activeInput] effect */
    const handleOnInput = e => {
        e.preventDefault();
        focusInputByDirection("next");
    };

    const onInputFocus = (index, event) => {
        setActiveInput(index);
        event.target.select();
    };

    useEffect(() => {
        // activeInput should be focused on the right place
        if (activeInput > value.length) {
            setActiveInput(value.length);
        }
    }, [activeInput, value.length]);

    return {
        activeInput,
        getOtpValue,
        handleOnChange,
        handleOnKeyDown,
        handleOnInput,
        handleOnPaste,
        onInputFocus
    };
};

export default useOtpInput;