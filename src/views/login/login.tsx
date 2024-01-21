import { heroIllustration } from 'images';
import { AuthLoginOutput, DashboardInquiryNewServiceOutput, DashboardInquiryNewTaskOutput, DashboardInquiryServiceCategoryListOutput, ErrorWrapper } from 'models';
import React from 'react';

import { Image, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { AuthService } from 'services';
import { Footer, Header, Loader } from 'shared/components';

const Login: React.FC = () => {
  const { data: loginData, isLoading: isLoadingLogin } = useQuery<AuthLoginOutput, ErrorWrapper>(
    ['login'],
    async () => await AuthService.login(),
  );

  return (
    <>
      <Header />
      <div className='min-layout-height'>

      </div>
      <Footer />
    </>
  );
};

export default Login;
