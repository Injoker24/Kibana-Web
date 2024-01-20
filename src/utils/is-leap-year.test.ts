import isLeapYear from './is-leap-year';

const scenarios = [
    {
        input: 2020,
        output: true
    },
    {
        input: 2000,
        output: true
    },
    {
        input: 1991,
        output: false
    },
    {
        input: 2100,
        output: false
    }
];

scenarios.forEach(({ input, output }) => {
    it(`given '${input}', should return '${output}'`, () => {
        expect(isLeapYear(input))
            .toBe(output);
    });
});