import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AccountActivationSuccess from './account-activation-success';

// it(`should redirect when accessed violately`, () => {
//     render(<AccountActivationSuccess />);


// });

function setup() {
    render(
        <AccountActivationSuccess
            phoneNumber={'08123456789'}
            merchantName={'SANDWICH'} />
    );

    screen.getByRole('img', { name: /sukses/i });
    screen.getByRole('heading', { name: /selamat!/i })
    screen.getByText(/sakuku anda telah aktif!/i);
    screen.getByText(/08123456789/);

    return {
        $button: screen.getByRole('button', { name: /kembali ke sandwich/i })
    }
}

it(`should display success page with the given props and do postMessage (opened in new tab)`, () => {
    const { $button } = setup();

    // @ts-ignore
    window.opener = {
        postMessage: jest.fn()
    }

    fireEvent.click($button);

    expect(window.opener.postMessage).toHaveBeenCalledWith('Completed', '*');
});