import React from 'react';

import {
    Button
} from 'react-bootstrap';

import {
    PageBody,
    PageActions,
    FormInput,
    DropdownDateSelection
} from 'shared/components';

interface Props {
    value?: Date,
    phoneNumber: string;
    onSubmit: (data: {
        value: Date,
        formattedValue: string
    }) => void;
}

const BirthDateVerification: React.FC<Props> = ({
    value,
    phoneNumber,
    onSubmit
}) => {
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [birthDate, setBirthDate] = React.useState<{
        value: Date,
        formattedValue: string
    }>();

    const handleChangeBirthDate = React.useCallback(
        (data: { value: Date, formattedValue: string }) => {
            if (data.value > new Date()) {
                setErrorMessage('Tanggal Lahir tidak valid');
                return;
            }

            setErrorMessage('');
            setBirthDate(data);
        }, []
    );

    const handleSubmitBirthDate = async (e: any) => {
        e.preventDefault();

        if (!birthDate) {
            return;
        }

        onSubmit(birthDate);
    };

    return (<form onSubmit={handleSubmitBirthDate}>
        <PageBody>
            <FormInput label="Nomor Handphone">
                <div className="text-primary">
                    {phoneNumber}
                </div>
            </FormInput>

            <FormInput label="Tanggal Lahir"
                errorMessage={errorMessage}
            >
                <DropdownDateSelection
                    value={value}
                    format={'YYYY-MM-DD'}
                    onChange={handleChangeBirthDate}
                />
            </FormInput>

            {/* <div className="absolute-bottom-center">
                <small className="d-block mb-2">
                    Registrasi ini dikenakan biaya SMS
                </small>
            </div> */}
        </PageBody>
        <PageActions>
            <Button type="submit"
                block={true}
                variant="primary"
                disabled={!birthDate}>
                LANJUT
            </Button>
        </PageActions>
    </form>);
};

export default BirthDateVerification;