import React, {
    PropsWithChildren
} from 'react';

type PageBodyProps = {
    className?: string;
};

const PageBody: React.FC<PropsWithChildren<PageBodyProps>> =
    ({
        className = '',
        children
    }) => {
        return (<>
            <section className={`page-body animated fadeIn ${className}`}>
                {children}
            </section>
        </>);
    };

export default PageBody;