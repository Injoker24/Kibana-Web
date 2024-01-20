import uuid from './uuid';
import crypto from 'crypto';

describe('uuid', () => {
    it('should return uuid string when window.crypto is ready', () => {
        Object.defineProperty(window, 'crypto', {
            value: {
                getRandomValues: (arr: any) => crypto.randomBytes(arr.length),
            },
        });

        const value = uuid();

        // should has 36 characters
        expect(value.length).toBe(36);

        // should has 5 sections of alphanumeric
        expect(value.split('-').length).toBe(5);

        // should has the exact format
        expect(RegExp('[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}').test(value))
            .toBe(true);
    });

    it('should return uuid string when window.crypto is not ready', () => {
        const value = uuid();
        // should has 36 characters
        expect(value.length).toBe(36);

        // should has 5 sections of alphanumeric
        expect(value.split('-').length).toBe(5);

        // should has the exact format
        expect(RegExp('[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}').test(value))
            .toBe(true);
    });
});