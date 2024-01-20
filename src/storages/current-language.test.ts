import currentLanguage from './current-language';
import { Language } from 'enums';
import Cookies from 'js-cookie';

describe(`sessionStorage is available`, () => {
    it(`should return 'id' as default language`, () => {
        expect(currentLanguage.get()).toBe(Language.Indonesian);
    });

    it(`should return the selected language`, () => {
        currentLanguage.set(Language.English);

        expect(currentLanguage.get()).toBe(Language.English);

        currentLanguage.set(Language.Indonesian);

        expect(currentLanguage.get()).toBe(Language.Indonesian);
    });
});

describe(`sessionStorage is unavailable`, () => {
    beforeAll(() => {
        Storage.prototype.getItem = jest.fn(
            (key: string) => {
                throw new Error();
            });

        Storage.prototype.setItem = jest.fn(
            (key: string, value: string) => {
                throw new Error();
            });
    });

    it(`should return 'id' as default language`, () => {
        expect(currentLanguage.get()).toBe(Language.Indonesian);
    });

    it(`should return the selected language`, () => {
        currentLanguage.set(Language.English);

        expect(currentLanguage.get()).toBe(Language.English);

        currentLanguage.set(Language.Indonesian);

        expect(currentLanguage.get()).toBe(Language.Indonesian);
    });
});