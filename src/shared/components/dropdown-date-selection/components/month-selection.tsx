import React, { useState } from 'react';

type MonthSelectionProps = {
    value: number,
    onChange: (value: number) => void
};

const MonthSelection: React.FC<MonthSelectionProps> =
    ({
        value,
        onChange
    }) => {
        const [selectedValue, setSelectedValue] = useState(value);

        const handleChangeSelection = (value: number) => {
            setSelectedValue(value);
            onChange(value);
        };

        const months = [
            'Januari', 'Februari', 'Maret',
            'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September',
            'Oktober', 'November', 'Desember',
        ];

        return <>
            <select
                className="form-control"
                value={selectedValue}
                onChange={(e) => handleChangeSelection(+e.target.value)}
                data-testid="select-month">
                <option value={-1} disabled>Bulan</option>
                {months.map((item, index) => {
                    return <option key={index} value={index}>{item}</option>
                })}
            </select>
        </>;
    };

export default MonthSelection;