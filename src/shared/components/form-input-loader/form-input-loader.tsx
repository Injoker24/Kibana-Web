import React from 'react';
import {
    Spinner
} from 'react-bootstrap';

const FormInputLoader: React.FC = () => {
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            right: '0.75rem',
            transform: 'translateY(-50%)'
        }}>
            <Spinner
                data-testid="spinner"
                animation="border"
                style={{
                    width: '1rem',
                    height: '1rem',
                    borderWidth: '0.15em'
                }}>
            </Spinner>
        </div>
    );
};

export default FormInputLoader;