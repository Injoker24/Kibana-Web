import { ErrorWrapper } from 'models';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Form, Row } from 'react-bootstrap';

import {
  Footer,
  FormInput,
  Header,
  InlineRetryError,
  Loader,
  TitleBanner,
} from 'shared/components';
import { useHistory } from 'react-router-dom';
import { IconAddCircle, IconClose } from 'images';
import { getLocalStorage, setLocalStorage } from 'utils';
import { useForm } from 'react-hook-form';

const AuthRegisterFreelancer: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Daftar Freelancer'} />
        <Row className="justify-content-center">
          <div className="col-10"></div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default AuthRegisterFreelancer;
