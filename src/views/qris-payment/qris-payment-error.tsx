import React from 'react';

import {
    Image,
    Button
} from 'react-bootstrap';

import {
    PageWrapper,
    PageHeader,
    PageBody,
    PageActions
} from 'shared/components';

import {
    iconGeneralError
} from 'images';

import {
    currentLanguage
} from 'storages';

const PaymentError: React.FC<any> = ({
    isFatal = false,
    content,
    copartName
}: any) => {

    const handleReloadPage = () => window.location.reload();

    const handleExitApplication = () => {
        // new tab
        if (window.opener) {
            window.opener.postMessage('Failed', '*');
            return;
        }

        // iframe
        try {
            console.log(window.parent.location.href);
        } catch (error) {
            window.parent.postMessage('Failed', '*');
            return;
        }

        // webview
        window.location.href = `/${currentLanguage.get()}/qris-payment/failed`;
    };

    return (<>
        <PageWrapper className="text-center">
            <PageHeader />
            <PageBody>
                <div className="mb-4">
                    <Image src={iconGeneralError}
                        className="animated zoomIn"
                        alt="Gagal"
                        title="Gagal" />
                </div>

                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </PageBody>
            <PageActions>
                {isFatal === true ?
                    <Button type="button"
                        block={true}
                        variant="primary"
                        onClick={handleExitApplication}>
                        {copartName
                            ? <>KEMBALI KE <span className="d-inline-block">{copartName}</span></>
                            : <>KEMBALI</>
                        }
                    </Button>
                    : <Button type="button"
                        block={true}
                        variant="primary"
                        onClick={handleReloadPage}>
                        REFRESH
                    </Button>}
            </PageActions>
        </PageWrapper>
    </>);
};

export default PaymentError;