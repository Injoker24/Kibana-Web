import React, { useState, useEffect, useCallback } from 'react';

type DaySelectionProps = {
    max: number,
    value: number,
    onChange: (value: number) => void
};

const DaySelection: React.FC<DaySelectionProps> =
    ({
        value,
        max,
        onChange
    }) => {
        const [selectedValue, setSelectedValue] = useState<number>(value);

        const handleChangeSelection = useCallback(
            (value: number) => {
                setSelectedValue(value);
                onChange(value);
            }, [onChange]);

        useEffect(() => {
            if (selectedValue > max) {
                handleChangeSelection(max);
            }
        }, [
            selectedValue,
            max,
            handleChangeSelection
        ]);

        const dateOptions = [];
        for (let i = 1; i <= max; i++) {
            dateOptions.push(<option key={i} value={i}>{`00${i}`.slice(-2)}</option>);
        }

        return <>
            <select
                className="form-control"
                value={selectedValue}
                onChange={(e) => handleChangeSelection(+e.target.value)}
                data-testid="select-day">

                <option value={-1} disabled>Tgl</option>
                {dateOptions}
            </select>
        </>;
    };

export default DaySelection;