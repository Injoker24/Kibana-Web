import Cookies from 'js-cookie';
import { Language } from 'enums';

/**
 * Current Selected Language
 */
const currentLanguage = {
    get: () => {
        let selectedLanguage;

        try {
            selectedLanguage = sessionStorage.getItem('lang');
        } catch (err) {
            selectedLanguage = Cookies.get('lang');
        }

        if (!selectedLanguage) {
            selectedLanguage = Language.Indonesian;
        }

        return selectedLanguage;
    },
    set: (selectedLanguage: string) => {
        try {
            sessionStorage.setItem('lang', selectedLanguage);
        } catch (err) {
            Cookies.set('lang', selectedLanguage);
        }
    }
};

export default currentLanguage;