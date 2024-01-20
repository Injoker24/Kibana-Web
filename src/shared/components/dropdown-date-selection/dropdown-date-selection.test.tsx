import React from 'react';

import DropdownDateSelection from './dropdown-date-selection';

import {
    cleanup,
    render,
    fireEvent,
    screen
} from '@testing-library/react';

let handleChangeMock: (data: { value: Date, formattedValue?: string }) => void

beforeEach(() => {
    handleChangeMock = jest.fn();
});

afterEach(cleanup);

describe(`given empty default value`, () => {

    function setup() {
        render(<DropdownDateSelection
            format={'YYYY-MM-DD'}
            onChange={handleChangeMock} />);

        return {};
    }

    it(`should render 3 dropdown list resembling the day, month, and year`, () => {
        setup();

        // default value
        screen.getByDisplayValue('Tgl');
        screen.getByDisplayValue('Bulan');
        screen.getByDisplayValue('Tahun');
    });

    it(`should emit the selected date`, () => {

        setup();

        // Select 10
        fireEvent.change(screen.getByTestId('select-day'), {
            target: { value: 10 }
        });

        // Select June
        fireEvent.change(screen.getByTestId('select-month'), {
            target: { value: 5 }
        });

        // Select 2000
        fireEvent.change(screen.getByTestId('select-year'), {
            target: { value: 2000 }
        });

        // Should emit 10 June 2000
        expect(handleChangeMock).toHaveBeenCalledTimes(1);
        expect(handleChangeMock).toHaveBeenCalledWith({
            value: new Date(2000, 5, 10),
            formattedValue: '2000-06-10'
        });
    });

    /**
     * Skenario         #1
     * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * Pilih tanggal    30
     * Pilih bulan      Februari
     * 
     * Expected:
     * Tanggal          28
     * Emit Value       (-)
     * 
     * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * Notes:
     * Maksimal tanggal di bulan Februari (asumsi non-kabisat) adalah 28
     */
    it(`should change the selected date automatically when conditions #1 are met`, () => {
        setup();

        fireEvent.change(screen.getByTestId('select-day'), {
            target: { value: 30 }
        });

        fireEvent.change(screen.getByTestId('select-month'), {
            target: { value: 1 }
        });

        screen.getByDisplayValue('28');
        expect(handleChangeMock).toHaveBeenCalledTimes(0);
    });

    /**
     * Skenario         #2
     * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * Pilih tanggal    30
     * Pilih tahun      2000
     * Pilih bulan      Februari
     * 
     * Expected:
     * Tanggal          29
     * Emit Value       (Date) 29 Februari 2020
     * 
     * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * Notes:
     * Maksimal tanggal di bulan Februari 2000 (kabisat) adalah 29
     */
    it(`should change the selected date automatically when conditions #2 are met`, () => {
        setup();

        // Select 30
        fireEvent.change(screen.getByTestId('select-day'), {
            target: { value: 30 }
        });

        // Select 2020
        fireEvent.change(screen.getByTestId('select-year'), {
            target: { value: 2020 }
        });

        // Select February
        fireEvent.change(screen.getByTestId('select-month'), {
            target: { value: 1 }
        });

        screen.getByDisplayValue('29');

        // should emit 29 February 2020
        expect(handleChangeMock).toHaveBeenCalledTimes(1);
        expect(handleChangeMock).toHaveBeenCalledWith({
            value: new Date(2020, 1, 29),
            formattedValue: '2020-02-29'
        });
    });

    /**
     * Skenario         #3
     * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * Pilih tanggal    31
     * Pilih bulan      Maret
     * 
     * > Expected:
     *      Tanggal     31
     * 
     * Pilih bulan      April
     * 
     * > Exptected:
     *      Tanggal     30
     * 
     * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * Notes:
     * Maksimal tanggal di bulan yang dipilih
     */
    it(`should change the selected date automatically when conditions #3 are met`, () => {
        setup();

        // Select 31
        fireEvent.change(screen.getByTestId('select-day'), {
            target: { value: 31 }
        });

        screen.getByDisplayValue('31');

        // Select March
        fireEvent.change(screen.getByTestId('select-month'), {
            target: { value: 2 }
        });

        screen.getByDisplayValue('31');

        // Select April
        fireEvent.change(screen.getByTestId('select-month'), {
            target: { value: 3 }
        });

        screen.getByDisplayValue('30');

        expect(handleChangeMock).toHaveBeenCalledTimes(0);
    });

    /**
     * Skenario         #4
     * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * Pilih tanggal    31
     * Pilih bulan      Agustus
     * 
     * > Expected:
     *      Tanggal     31
     * 
     * Pilih bulan      September
     * 
     * > Exptected:
     *      Tanggal     30
     * 
     * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * Notes:
     * Maksimal tanggal di bulan yang dipilih
     */
    it(`should change the selected date automatically when conditions #4 are met`, () => {
        setup();

        // Select 31
        fireEvent.change(screen.getByTestId('select-day'), {
            target: { value: 31 }
        });

        screen.getByDisplayValue('31');

        // Select August
        fireEvent.change(screen.getByTestId('select-month'), {
            target: { value: 7 }
        });

        screen.getByDisplayValue('31');

        // Select September
        fireEvent.change(screen.getByTestId('select-month'), {
            target: { value: 8 }
        });

        screen.getByDisplayValue('30');

        expect(handleChangeMock).toHaveBeenCalledTimes(0);
    });
});

describe(`given default value`, () => {
    it(`should render 3 dropdown list resembling the day, month, and year`, () => {
        const currentDate = new Date(2020, 4, 26);

        render(
            <DropdownDateSelection
                value={currentDate}
                format={'YYYY-MM-DD'}
                onChange={handleChangeMock} />
        );

        // default value
        screen.getByDisplayValue('26');
        screen.getByDisplayValue('Mei');
        screen.getByDisplayValue('2020');
    });
});