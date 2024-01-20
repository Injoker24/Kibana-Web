import React from 'react';
import { render, screen, fireEvent, cleanup, wait } from '@testing-library/react';
import Deeplink from './deeplink';
import { FirebaseService } from 'services';

let handleErrorMock: () => void;

beforeEach(() => {
    handleErrorMock = jest.fn();
});

afterEach(cleanup);

it(`on initial load, should render message, reload button, and deeplink`, async () => {
    // @ts-ignore
    delete window.parent.location;

    // @ts-ignore
    window.location = {
        reload: jest.fn()
    }

    jest.spyOn(FirebaseService, 'getDynamicLink')
        .mockResolvedValueOnce({
            shortLink: 'https://testcobrand.page.link/6V7Rt9cWH9Si661y6',
            previewLink: 'https://testcobrand.page.link/6V7Rt9cWH9Si661y6?d=1'
        });

    const { getByRole } = render(
        <Deeplink
            merchantName={'HAPPY CHICKEN'}
            phoneNumber={'081245459898'}
            iosAppStoreId={'965131157'}
            minAndroidVersion={'176'}
            onError={handleErrorMock}
        />
    );

    screen.getByText(/proses aktivasi sakuku belum dapat dilakukan./i);

    await wait(() => {
        expect(FirebaseService.getDynamicLink).toHaveBeenCalledWith({
            merchantName: 'HAPPY CHICKEN',
            iosAppStoreId: '965131157',
            minAndroidVersion: '176'
        });
    });

    expect(
        getByRole('link', { name: /buka aplikasi sakuku/i })
    ).toHaveAttribute('href', 'https://testcobrand.page.link/6V7Rt9cWH9Si661y6');

    // should call reload
    fireEvent.click(screen.getByRole('button', { name: /ulangi proses aktivasi sakuku/i }));

    expect(window.location.reload).toHaveBeenCalledTimes(1);
});