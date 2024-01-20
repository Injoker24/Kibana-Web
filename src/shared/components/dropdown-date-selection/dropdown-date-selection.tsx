import React, { useState, useEffect } from 'react';

import {
    Col,
    Form
} from 'react-bootstrap';

import dayjs from 'dayjs';

import {
    isLeapYear
} from 'utils';

import {
    DaySelection,
    MonthSelection,
    YearSelection
} from './components';

enum Month {
    January = 0,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

type DropdownDateSelectionProps = {
    value?: Date,
    format: string,
    onChange: (data: { value: Date, formattedValue: string }) => void
};

const DropdownDateSelection: React.FC<DropdownDateSelectionProps> =
    ({
        value,
        format,
        onChange
    }) => {
        //#region Initial States
        const [
            selectedDay,
            setSelectedDay
        ] = useState<number>(value?.getDate() || -1);

        const [
            selectedMonth,
            setSelectedMonth
        ] = useState<number>(value?.getMonth() || -1);

        const [
            selectedYear,
            setSelectedYear
        ] = useState<number>(value?.getFullYear() || -1);

        const [
            maxDayInMonth,
            setMaxDayInMonth
        ] = useState<number>(31);
        //#endregion

        //#region Event handling
        const handleChangeDay =
            (value: number) => {
                setSelectedDay(value);
            };

        const handleChangeMonth =
            (value: number) => {
                setSelectedMonth(value);
            };

        const handleChangeYear =
            (value: number) => {
                setSelectedYear(value);
            };
        //#endregion

        //#region Bubble the value
        useEffect(() => {
            //#region Set possible maximum day in a month
            let max = 31;

            if (selectedMonth !== -1) {
                max = (selectedMonth === Month.February)
                    ? 28
                    : (
                        [
                            Month.January,
                            Month.March,
                            Month.May,
                            Month.July,
                            Month.August,
                            Month.October,
                            Month.December
                        ].includes(selectedMonth) ? 31 : 30
                    );
            }

            // if leap year
            if (isLeapYear(selectedYear)
                && selectedMonth === Month.February
            ) {
                max++;
            }

            setMaxDayInMonth(max);
            //#endregion

            if (
                selectedYear !== -1
                && selectedMonth !== -1
                && selectedDay !== -1

                && selectedDay <= max
            ) {
                const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
                onChange({
                    value: selectedDate,
                    formattedValue: dayjs(selectedDate).format(format)
                });
            }
        }, [selectedDay, selectedMonth, selectedYear, onChange, format]);
        //#endregion

        return (<>
            <Form.Row>
                <Col xs={"auto"} md={3}>
                    <DaySelection
                        max={maxDayInMonth}
                        value={selectedDay}
                        onChange={handleChangeDay} />
                </Col>
                <Col xs={"auto"} md={5}>
                    <MonthSelection
                        value={selectedMonth}
                        onChange={handleChangeMonth} />
                </Col>
                <Col xs={"auto"} md={3}>
                    <YearSelection
                        value={selectedYear}
                        onChange={handleChangeYear} />
                </Col>
            </Form.Row>
        </>);
    };

export default DropdownDateSelection;