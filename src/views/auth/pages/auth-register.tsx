import { IconEyeOpen, IconEyeSlash } from 'images';
import { AuthRegisterInput, AuthRegisterOutput, ErrorWrapper } from 'models';
import React, { useEffect, useState } from 'react';

import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { AuthService } from 'services';
import { Footer, FormInput, Header, Loader, PopUpError } from 'shared/components';
import { setLocalStorage } from 'utils';

const AuthRegister: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState<AuthRegisterInput>({
    email: '',
    username: '',
    name: '',
    phoneNumber: '',
    password: '',
  });
  const {
    register,
    errors,
    formState,
    handleSubmit,
    formState: { isValid },
    watch,
    triggerValidation,
  } = useForm({
    mode: 'onChange',
  });

  const password = watch('password');
  useEffect(() => {
    triggerValidation('passwordRepeat');
  }, [password, triggerValidation]);

  const {
    isLoading: isLoadingRegister,
    mutate: mutateRegister,
    error: errorRegister,
  } = useMutation<AuthRegisterOutput, ErrorWrapper>(
    ['register', formData],
    async () =>
      await AuthService.register({
        email: formData.email,
        username: '@' + formData.username,
        name: formData.name,
        phoneNumber: '+62' + formData.phoneNumber,
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
    mutateRegister();
  };

  return (
    <>
      {errorRegister && <PopUpError message={errorRegister.message} />}
      {isLoadingRegister && <Loader type="fixed" />}
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
              <h2>Buat akun baru</h2>
              <p>Bergabung dengan Kibana mulai hari ini!</p>
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-3 mb-md-4">
                <FormInput
                  label="E-mail"
                  labelFor="email"
                  errorMessage={errors?.email?.message}
                >
                  <Form.Control
                    type="text"
                    id="email"
                    name="email"
                    isInvalid={formState.touched.email === true && !!errors.email}
                    ref={
                      register({
                        required: {
                          value: true,
                          message: 'E-mail harus diisi.',
                        },
                      }) as string & ((ref: Element | null) => void)
                    }
                  />
                </FormInput>
              </div>
              <div className="mb-3 mb-md-4">
                <FormInput
                  label="Username"
                  labelFor="username"
                  errorMessage={errors?.username?.message}
                >
                  <div className="d-flex flex-row">
                    <div className="input-prefix mr-3 flex-centered">@</div>
                    <Form.Control
                      type="text"
                      id="username"
                      name="username"
                      isInvalid={formState.touched.username === true && !!errors.username}
                      ref={
                        register({
                          required: {
                            value: true,
                            message: 'Username harus diisi.',
                          },
                        }) as string & ((ref: Element | null) => void)
                      }
                    />
                  </div>
                </FormInput>
              </div>
              <div className="mb-3 mb-md-4">
                <FormInput
                  label="Nama"
                  labelFor="name"
                  errorMessage={errors?.name?.message}
                >
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    isInvalid={formState.touched.name === true && !!errors.name}
                    ref={
                      register({
                        required: {
                          value: true,
                          message: 'Nama harus diisi.',
                        },
                      }) as string & ((ref: Element | null) => void)
                    }
                  />
                </FormInput>
              </div>
              <div className="mb-3 mb-md-4">
                <FormInput
                  label="Nomor handphone"
                  labelFor="phoneNumber"
                  errorMessage={errors?.phoneNumber?.message}
                >
                  <div className="d-flex flex-row">
                    <div className="input-prefix mr-3 flex-centered">+62</div>
                    <Form.Control
                      type="number"
                      id="phoneNumber"
                      name="phoneNumber"
                      isInvalid={formState.touched.phoneNumber === true && !!errors.phoneNumber}
                      ref={
                        register({
                          required: {
                            value: true,
                            message: 'Nomor handphone harus diisi.',
                          },
                        }) as string & ((ref: Element | null) => void)
                      }
                    />
                  </div>
                </FormInput>
              </div>
              <div className="mb-3 mb-md-4">
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
                <FormInput
                  label="Ulangi Password"
                  labelFor="passwordRepeat"
                  errorMessage={errors?.passwordRepeat?.message}
                >
                  <div className="position-relative">
                    <Form.Control
                      type={showRepeatPassword ? 'text' : 'password'}
                      id="passwordRepeat"
                      name="passwordRepeat"
                      isInvalid={
                        formState.touched.passwordRepeat === true && !!errors.passwordRepeat
                      }
                      ref={
                        register({
                          validate: (value) => {
                            return watch('password') === value || 'Password tidak sesuai.';
                          },
                        }) as string & ((ref: Element | null) => void)
                      }
                    />
                    <div
                      className="text-primary cursor-pointer"
                      onClick={() => setShowRepeatPassword((x) => !x)}
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
                  Daftar
                </button>
              </div>
            </form>
            <p className="mr-2 d-inline">Sudah punya akun?</p>
            <a
              className="text-primary"
              href="/auth/login"
            >
              Masuk disini!
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthRegister;
