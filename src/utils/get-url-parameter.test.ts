import getUrlParameter from './get-url-parameter';

// global.window = Object.create(window);

Object.defineProperty(window, 'location', {
    value: {
        href: 'http://consent.bca.co.id',
        search: '?req-id=1122&verification=abcdef12345'
    }
});

it('should return the right value', () => {
    const reqId = getUrlParameter('req-id');
    expect(reqId).toBe('1122');

    const verification = getUrlParameter('verification');
    expect(verification).toBe('abcdef12345')
});

it('should return empty string when url has no exact parameter', () => {
    const falsy = getUrlParameter('nothing');
    expect(falsy).toBeFalsy();
})