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
    Redirect
} from 'react-router-dom';

const AccountActivationSuccess: React.FC<any> =
    ({
        phoneNumber,
        merchantName = 'MERCHANT'
    }: any) => {

        // if no state props was given, should redirect to error
        if (!phoneNumber) {
            return <Redirect to={'/error'} />
        }

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
            window.location.href = `/${currentLanguage.get()}/account-activation/completed`;
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

                    <h5 className="font-weight-bold">Selamat!</h5>
                    <p>Sakuku Anda telah aktif!</p>
                    <div>
                        <span>Nomor Sakuku</span>
                        <h5 className="font-weight-bold text-primary">{phoneNumber}</h5>
                    </div>
                </PageBody>
                <PageActions>
                    <Button type="button"
                        block={true}
                        variant="primary"
                        onClick={handleExitApplication}>
                        KEMBALI KE {merchantName}
                    </Button>
                </PageActions>
            </PageWrapper>
        </>);
    }

export default AccountActivationSuccess;