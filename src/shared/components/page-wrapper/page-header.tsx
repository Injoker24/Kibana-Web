import React from 'react';

import {
    Image
} from 'react-bootstrap';

import {
    logoSakuku
} from 'images';

type PageHeaderProps = {
    title?: string;
};

const PageHeader: React.FC<PageHeaderProps> =
    ({ title }) => {
        return (<>
            <section className="page-header mb-5">
                <h6>{title}</h6>

                <Image src={logoSakuku}
                    alt="Sakuku"
                    title="Sakuku"
                    className="logo" />
            </section>
        </>);
    };

export default React.memo(PageHeader);