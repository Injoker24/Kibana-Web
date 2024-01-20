import React, {
    PropsWithChildren
} from 'react';

type PageWrapperProps = {
    className?: string;
};

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> =
    ({
        className = '',
        children
    }) => {
        return (<>
            <section className={`page-wrapper ${className}`}>
                {children}
            </section>
        </>);
    };

export default PageWrapper;