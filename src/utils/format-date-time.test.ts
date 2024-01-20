import formatDateTime from './format-date-time';

const scenarios = [{
    input: 1594721163000, // epoch
    output: '14 Juli 2020 17:06:03'
}, {
    input: '1594721163000', // epoch (string)
    output: '14 Juli 2020 17:06:03'
}];

scenarios.forEach(e => {
    it(`given '${e.input}' should return '${e.output}'`, () => {
        expect(formatDateTime(e.input))
            .toBe(e.output);
    });
});