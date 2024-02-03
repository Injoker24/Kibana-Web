import { IconEyeOpen, IconEyeSlash } from 'images';
import { AuthLoginInput, AuthLoginOutput, ErrorWrapper } from 'models';
import React, { useState } from 'react';

import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { AuthService } from 'services';
import { Footer, FormInput, Header, Loader, PopUpError } from 'shared/components';
import { setLocalStorage } from 'utils';

const AuthLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<AuthLoginInput>({
    emailUsername: '',
    password: '',
  });
  const {
    register,
    errors,
    formState,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  const {
    isLoading: isLoadingLogin,
    mutate: mutateLogin,
    error: errorLogin,
  } = useMutation<AuthLoginOutput, ErrorWrapper>(
    ['login', formData],
    async () =>
      await AuthService.login({
        emailUsername: formData.emailUsername,
        password: formData.password,
      }),
    {
      onSuccess: (result) => {
        setLocalStorage('isFreelancer', result.isFreelancer.toString());
        setLocalStorage('isConnectedBank', result.isConnectedBank.toString());
        setLocalStorage('profileImageUrl', result.profileImageUrl);
        setLocalStorage('username', result.username);
        setLocalStorage('name', result.name);
        setLocalStorage('token', result.token);
        setLocalStorage('status', 'client');
        window.location.href = '/dashboard';
      },
    },
  );

  const submitForm = (formData: any) => {
    setFormData(formData);
    mutateLogin();
  };

  return (
    <>
      {errorLogin && <PopUpError message={errorLogin.message} />}
      {isLoadingLogin && <Loader type="fixed" />}
      <Header />
      <div className="min-layout-height d-flex flex-row flex-wrap">
        <div className="bg-primary text-light col-12 col-md-6 flex-centered">
          <div className="p-4 m-md-auto p-md-5">
            <h3 className="mb-3">Pekerjaanmu terlalu sulit? Kita Bantu Anda!</h3>
            <h4>Dapatkan bantuan terbaik disini. Tidak perlu mencari kesana kemari.</h4>
          </div>
        </div>
        <div className="col-12 col-md-6 flex-centered">
          <div className="p-4 m-md-auto p-md-5 col-12">
            <div className="mb-4 mb-md-5">
              <h2>Masuk</h2>
              <p>Selamat datang kembali!</p>
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-3 mb-md-4">
                <FormInput
                  label="E-mail atau Username"
                  labelFor="emailUsername"
                  errorMessage={errors?.emailUsername?.message}
                >
                  <Form.Control
                    type="text"
                    id="emailUsername"
                    name="emailUsername"
                    isInvalid={formState.touched.emailUsername === true && !!errors.emailUsername}
                    ref={
                      register({
                        required: {
                          value: true,
                          message: 'E-mail atau Username harus diisi.',
                        },
                      }) as string & ((ref: Element | null) => void)
                    }
                  />
                </FormInput>
              </div>
              <div className="mb-4 mb-md-5">
                <FormInput
                  label="Password"
                  labelFor="password"
                  errorMessage={errors?.password?.message}
                >
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      isInvalid={formState.touched.password === true && !!errors.password}
                      ref={
                        register({
                          required: {
                            value: true,
                            message: 'Password harus diisi.',
                          },
                        }) as string & ((ref: Element | null) => void)
                      }
                    />
                    <div
                      className="text-primary cursor-pointer"
                      onClick={() => setShowPassword((x) => !x)}
                      style={{ position: 'absolute', right: '1rem', bottom: '0.75rem' }}
                    >
                      {showPassword ? <IconEyeOpen /> : <IconEyeSlash />}
                    </div>
                  </div>
                </FormInput>
              </div>
              <div className="mb-4 mb-md-5">
                <button
                  disabled={!isValid}
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Masuk
                </button>
              </div>
            </form>
            <p className="mr-2 d-inline">Belum punya akun?</p>
            <a
              className="text-primary"
              href="/auth/register"
            >
              Daftar disini!
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthLogin;
