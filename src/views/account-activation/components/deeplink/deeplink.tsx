import React from 'react';

import {
    Button, Spinner
} from 'react-bootstrap';

import {
    PageWrapper,
    PageHeader,
    PageBody,
    PageActions,
} from 'shared/components';

import { FirebaseService } from 'services';
import { FirebaseDynamicLinkResponse } from 'models';

interface Props {
    merchantName: string;
    phoneNumber: string;
    iosAppStoreId: string;
    minAndroidVersion: string;
    onError: (data: {
        isFatalError: boolean,
        content: string
    }) => void,
}

const Deeplink: React.FC<Props> = ({
    merchantName,
    phoneNumber,
    iosAppStoreId,
    minAndroidVersion,
    onError
}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [links, setLinks] = React.useState<FirebaseDynamicLinkResponse>();

    React.useEffect(() => {
        const getLinks = async () => {
            try {
                setIsLoading(true);
                const data = await FirebaseService.getDynamicLink({
                    merchantName,
                    iosAppStoreId,
                    minAndroidVersion
                });

                setLinks(data);
            } catch (error) {
                // on error
                onError({
                    content: error.message,
                    isFatalError: true,
                });
            } finally {
                setIsLoading(false);
            }
        };

        getLinks();
    }, [merchantName, iosAppStoreId, minAndroidVersion, onError]);

    return (<>
        <PageWrapper>
            <PageHeader title="Aktivasi" />
            <PageBody>
                <p>Proses Aktivasi Sakuku belum dapat dilakukan.</p>

                <p className="mb-5">Silakan melakukan registrasi atau login ulang pada Aplikasi Sakuku dengan nomor handphone <span className="text-primary">{phoneNumber}</span></p>

                {isLoading
                    ? <section className="text-center">
                        <Spinner animation={'border'} />
                    </section>
                    : <a href={links?.shortLink}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="btn btn-primary btn-block animated fadeIn">
                        BUKA APLIKASI SAKUKU
                    </a>
                }

            </PageBody>
            <PageActions>
                <p className="text-center">Jika sudah login Sakuku,</p>
                <Button type="button"
                    block={true}
                    variant={'primary'}
                    onClick={() => window.location.reload()}>
                    ULANGI PROSES AKTIVASI SAKUKU
                </Button>
            </PageActions>
        </PageWrapper>
    </>);
};

export default Deeplink;