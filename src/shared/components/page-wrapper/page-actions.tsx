import React, {
    PropsWithChildren
} from 'react';

type PageActionsProps = {
    className?: string;
};

const PageActions: React.FC<PropsWithChildren<PageActionsProps>> =
    ({
        className = '',
        children
    }) => {
        return (<>
            <section className={`page-actions animated fadeIn ${className}`}>
                {children}
            </section>
        </>);
    };

export default PageActions;