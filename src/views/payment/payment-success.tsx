import React from 'react';

import {
    Button,
    Image
} from 'react-bootstrap';

import {
    currentLanguage
} from 'storages';

import {
    iconSuccess
} from 'images';

import {
    PageWrapper,
    PageBody,
    PageActions,
    PageHeader
} from 'shared/components';

import {
    PaymentInformation,
    PaymentAmount
} from './components';

const PaymentSuccess: React.FC<any> =
    ({
        transactionId,
        transactionDate,
        merchantName = 'MERCHANT',
        amount
    }: any) => {

        const handleExitApplication = () => {
            // new tab
            if (window.opener) {
                window.opener.postMessage('Completed', '*');
                return;
            }

            // iframe
            try {
                console.log(window.parent.location.href);
            } catch (error) {
                window.parent.postMessage('Completed', '*');
                return;
            }

            // webview
            window.location.href = `/${currentLanguage.get()}/payment/completed`;
        };


        return (<>
            <PageWrapper className="text-center">
                <PageHeader />
                <PageBody>
                    <div className="mb-4">
                        <Image src={iconSuccess}
                            className="animated zoomIn"
                            alt="Sukses"
                            title="Sukses" />
                    </div>

                    <h5 className="font-weight-bold">Transaksi Anda Berhasil!</h5>

                    <PaymentInformation
                        merchantName={merchantName}
                        transactionId={transactionId}
                        transactionDate={transactionDate}
                    />

                    <PaymentAmount
                        amount={amount}
                    />
                </PageBody>
                <PageActions>
                    <Button type="button"
                        block={true}
                        variant="primary"
                        onClick={handleExitApplication}>
                        KEMBALI KE <span className="d-inline-block">{merchantName}</span>
                    </Button>
                </PageActions>
            </PageWrapper>
        </>);
    };

export default PaymentSuccess;