import React, { useState } from 'react';

type YearSelectionProps = {
    value: number,
    onChange: (value: number) => void
};

const YearSelection: React.FC<YearSelectionProps> =
    ({
        value,
        onChange
    }) => {
        const [selectedValue, setSelectedValue] = useState<number>(value);

        const handleChangeSelection = (value: number) => {
            setSelectedValue(value);
            onChange(value);
        };

        const currentYear = (new Date()).getFullYear();
        const minYear = currentYear - 100;

        const yearOptions = [];

        for (let i = currentYear; i >= minYear; i--) {
            yearOptions.push(
                <option key={i} value={i} data-testid="select-year-option">{i}</option>
            );
        }

        return <>
            <select
                className="form-control"
                value={selectedValue}
                onChange={(e) => handleChangeSelection(+e.target.value)}
                data-testid="select-year">
                    
                <option value={-1} disabled>Tahun</option>
                {yearOptions}
            </select>
        </>;
    };

export default YearSelection;