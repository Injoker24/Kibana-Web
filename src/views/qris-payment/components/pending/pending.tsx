import React from 'react';

import {
    Button,
    Image
} from 'react-bootstrap';

import dayjs from 'dayjs';

import { iconPending } from 'images';

import {
    PageBody,
    PageActions,
    Loader
} from 'shared/components';

import { PaymentStatus } from 'enums';

import { QRISPaymentService } from 'services';

interface Props {
    paymentId: string,
    copartName: string,
    transactionDate: string | number,
    onSubmit: (status: PaymentStatus) => void,
    onError: (data: {
        isFatalError: boolean,
        content: string
    }) => void,
    onExit: () => void
}

const Pending: React.FC<Props> = ({
    paymentId,
    copartName,
    transactionDate,
    onSubmit,
    onError,
    onExit
}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [counter, setCounter] = React.useState<number>(0);
    const [isLimitExceeded, setIsLimitExceeded] = React.useState<boolean>(false);

    //#region Restore from storage
    React.useEffect(() => {
        const counter = Number(sessionStorage.getItem(paymentId));
        setCounter(counter);

        if (counter >= 3) {
            setIsLimitExceeded(true);
        }
    }, [paymentId]);
    //#endregion

    //#region Keep in storage when counter was up
    React.useEffect(() => {
        if (counter) {
            sessionStorage.setItem(paymentId, String(counter));
        }
    }, [paymentId, counter]);
    //#endregion

    const handleCheckStatus = async () => {

        if (isLoading) {
            return false;
        }

        setIsLoading(true);

        try {
            const currentCounter = counter + 1;
            setCounter(currentCounter);

            const { output_schema } = await QRISPaymentService.checkPaymentStatus(paymentId, dayjs(transactionDate).format('YYYYMMDD'));
            setIsLoading(false);

            if (output_schema.status !== PaymentStatus.Pending) {
                onSubmit(output_schema.status);
            } else {
                if (currentCounter >= 3) {
                    setIsLimitExceeded(true);
                }
            }
        } catch (error) {
            setIsLoading(false);

            const {
                status,
                data: { error_schema }
            } = error;

            // kalo masi TO aja, dibiarin di page yang sama aja
            if (status !== 504) {
                onError({
                    isFatalError: error_schema.fatal_error_flag === true,
                    content: error_schema.message
                });
            }
        }
    };

    return (<>
        {isLoading && <Loader type="absolute" />}

        <PageBody>
            <div className="mb-4">
                <Image src={iconPending}
                    className="animated zoomIn"
                    alt="Pending"
                    title="Pending" />
            </div>

            <h5 className="font-weight-bold">Transaksi mengalami gangguan.</h5>
            {!isLimitExceeded &&
                <span className="d-block">Cek status transaksi melalui tombol di bawah ini.</span>
            }
            <span>Info Halo BCA 1500888</span>
        </PageBody>
        <PageActions>
            {!isLimitExceeded
                ? <Button type="button"
                    block={true}
                    variant="primary"
                    onClick={handleCheckStatus}>
                    CEK STATUS
                </Button>
                : <Button type="button"
                    block={true}
                    variant="primary"
                    onClick={onExit}>
                    KEMBALI KE {copartName}
                </Button>
            }
        </PageActions>
    </>);
};

export default Pending;