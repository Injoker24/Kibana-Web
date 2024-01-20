import React from 'react';

import CurrencyValue from './currency-value';

import {
    render,
    cleanup,
    screen
} from '@testing-library/react';

afterEach(cleanup);

const scenarios = [{
    input: '1500',
    output: '1.500'
}, {
    input: 2000000,
    output: '2.000.000'
}, {
    input: 2500.55,
    output: '2.501'
}];

scenarios.forEach(scenario => {
    it(`given ${scenario.input} should render ${scenario.output}`, () => {
        render(<CurrencyValue value={scenario.input} />);
        screen.getByText(scenario.output);
    });
})