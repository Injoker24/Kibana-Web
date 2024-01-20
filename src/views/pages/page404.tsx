import React from 'react';
import { PageWrapper, PageHeader, PageBody } from 'shared/components';

const Page404: React.FC = () => {
    return (<>
        <PageWrapper className="text-center">
            <PageHeader />
            <PageBody>
                <h1 className="font-weight-bold text-primary" style={{ fontSize: '7rem' }}>404</h1>
                <p>Halaman tidak ditemukan</p>
            </PageBody>
        </PageWrapper>
    </>);
};

export default Page404;