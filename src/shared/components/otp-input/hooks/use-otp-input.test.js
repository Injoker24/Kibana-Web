import { renderHook, act } from '@testing-library/react-hooks';
import useOtpInput from './use-otp-input';
import { cleanup } from '@testing-library/react';

let handleChangeMock;

beforeEach(() => {
  handleChangeMock = jest.fn();
});

afterEach(cleanup);

describe(`activeInput`, () => {
  it(`given no autoFocus, should be -1`, () => {
    const { result } = renderHook(() =>
      useOtpInput({
        value: '',
        length: 4,
        handleChangeMock
      })
    );

    expect(result.current.activeInput).toBe(-1);
  });

  it(`given autoFocus, should be 0`, () => {
    const { result } = renderHook(() =>
      useOtpInput({
        autoFocus: true,
        value: '',
        length: 4,
        handleChangeMock
      })
    );

    expect(result.current.activeInput).toBe(0);
  });
});

describe(`value`, () => {
  it(`given no initial value, then the otp value should be an empty array`, () => {
    const { result } = renderHook(() =>
      useOtpInput({
        length: 4,
        handleChangeMock,
        autoFocus: true,
        value: ''
      })
    );

    let value = result.current.getOtpValue();

    expect(value).toHaveLength(0);
  });

  it(`given initial value, then the otp value should not be an empty array`, () => {
    const { result } = renderHook(() =>
      useOtpInput({
        length: 4,
        handleChangeMock,
        autoFocus: true,
        value: '1234'
      })
    );

    let value = result.current.getOtpValue();

    expect(value).toEqual(['1', '2', '3', '4']);
    expect(value).toHaveLength(4);
  });
});

// it("handleOnChange should not change active input when otpType=number and value is string", () => {
//   const onChange = jest.fn();
//   const { result } = renderHook(() =>
//     useOtpInput({
//       OTPLength: 4,
//       onChange,
//       otpType: "number",
//       autoFocus: true,
//       value: ""
//     })
//   );
//   act(() => {
//     result.current.handleOnChange({ target: { value: "s" } });
//   });
//   expect(onChange).toHaveBeenCalledTimes(0);
//   expect(result.current.activeInput).toBe(0);
// });

// it(`handleOnChange should change active input when otpType=number 
//     and value is number and change focus, 
//     also call on change function that return string type value`, () => {
//   let value = "";
//   const onChange = jest.fn(e => {
//     value = e;
//   });
//   const { result, rerender } = renderHook(() =>
//     useOtpInput({
//       OTPLength: 4,
//       onChange,
//       otpType: "number",
//       autoFocus: true,
//       value
//     })
//   );
//   act(() => {
//     result.current.handleOnChange({ target: { value: "0" } });
//     rerender();
//   });
//   act(() => {
//     result.current.handleOnChange({ target: { value: "2" } });
//     rerender();
//   });
//   expect(onChange).toHaveBeenCalledTimes(2);
//   expect(onChange).toHaveReturnedTimes(2);
//   expect(result.current.activeInput).toBe(2);
//   expect(value).toBe("02");
// });

// it(`handleOnChange should change active input when otpType=any 
//     and change focus, also call on change function that return string type value`, () => {
//   let value = "";
//   const onChange = jest.fn(e => {
//     value = e;
//   });
//   const { result, rerender } = renderHook(() =>
//     useOtpInput({
//       OTPLength: 4,
//       onChange,
//       otpType: "any",
//       autoFocus: true,
//       value
//     })
//   );
//   act(() => {
//     result.current.handleOnChange({ target: { value: "1" } });
//     rerender();
//   });
//   act(() => {
//     result.current.handleOnChange({ target: { value: "2" } });
//     rerender();
//   });
//   expect(onChange).toHaveBeenCalledTimes(2);
//   expect(onChange).toHaveReturnedTimes(2);
//   expect(result.current.activeInput).toBe(2);
//   expect(value).toBe("12");
// });

// it(`handleOnKeyDown based on e.key it should remove value and change focus`, () => {
//   let value = "";
//   const onChange = jest.fn(e => {
//     value = e;
//   });
//   const { result, rerender } = renderHook(() =>
//     useOtpInput({
//       OTPLength: 4,
//       onChange,
//       otpType: "any",
//       autoFocus: true,
//       value
//     })
//   );
//   act(() => {
//     result.current.handleOnKeyDown({
//       key: "ArrowRight",
//       preventDefault: () => { }
//     });
//     rerender();
//   });
//   expect(result.current.activeInput).toBe(1);

//   act(() => {
//     result.current.handleOnKeyDown({
//       key: "ArrowLeft",
//       preventDefault: () => { }
//     });
//     rerender();
//   });
//   expect(result.current.activeInput).toBe(0);

//   act(() => {
//     result.current.handleOnChange({ target: { value: "1" } });
//     rerender();
//   });

//   act(() => {
//     result.current.handleOnKeyDown({
//       key: "Backspace",
//       preventDefault: () => { }
//     });
//     rerender();
//   });
//   expect(result.current.activeInput).toBe(0);
//   expect(value).toBe("1");

//   act(() => {
//     result.current.handleOnKeyDown({
//       key: "Delete",
//       preventDefault: () => { }
//     });
//     rerender();
//   });
//   expect(result.current.activeInput).toBe(0);
//   expect(value).toBe("");
// });

// it("handelOnInput should change focus to next input", () => {
//   const { result, rerender } = renderHook(() =>
//     useOtpInput({
//       OTPLength: 4,
//       otpType: "any",
//       autoFocus: true
//     })
//   );
//   act(() => {
//     result.current.handelOnInput({
//       target: { value: "12" },
//       preventDefault: () => { }
//     });
//     rerender();
//   });
//   expect(result.current.activeInput).toBe(1);
// });

// fit("handleOnPaste should change focus to next input", () => {
//   const { result, rerender } = renderHook(() =>
//     useOtpInput({
//       OTPLength: 4,
//       otpType: "any",
//       autoFocus: true
//     })
//   );
//   act(() => {
//     result.current.handelOnInput({
//       target: { value: "12" },
//       preventDefault: () => {}
//     });
//     rerender();
//   });
//   expect(result.current.activeInput).toBe(1);
// });

// it("focus input should change activeInput state bw length", () => {
//   const onChange = jest.fn();
//   const { result } = renderHook(() =>
//     useOtpInput({
//       OTPLength: 4,
//       onChange,
//       otpType: "any",
//       autoFocus: true,
//       value: "1234"
//     })
//   );
//   act(() => {
//     result.current.focusInput(2);
//   });
//   expect(result.current.activeInput).toBe(2);
// });
