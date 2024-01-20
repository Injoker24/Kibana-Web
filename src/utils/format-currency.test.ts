import formatCurrency from './format-currency';

const scenarios = [{
    input: 0,
    output: '0'
},{
    input: 1500,
    output: '1.500'
}, {
    input: 300,
    output: '300'
}, {
    input: 3500000,
    output: '3.500.000'
}, {
    input: '1250000000',
    output: '1.250.000.000'
}, {
    input: 'Not a Number',
    output: ''
}];

scenarios.forEach(e => {
    it(`given '${e.input}' should return '${e.output}'`, () => {
        expect(formatCurrency(e.input))
            .toBe(e.output);
    });
});