import React from 'react';

type PageHeaderProps = {
    title?: string;
};

const PageHeader: React.FC<PageHeaderProps> =
    ({ title }) => {
        return (<>
            <section className="page-header mb-5">
                <h6>{title}</h6>
            </section>
        </>);
    };

export default React.memo(PageHeader);