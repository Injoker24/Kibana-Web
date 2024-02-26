import { ErrorWrapper } from 'models';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Form, Row } from 'react-bootstrap';

import {
  Footer,
  FormInput,
  Header,
  Loader,
  PopUpConfirm,
  PopUpError,
  TitleBanner,
} from 'shared/components';
import { useHistory } from 'react-router-dom';
import { IconAddCircle, IconClose } from 'images';
import { setLocalStorage } from 'utils';
import { useForm } from 'react-hook-form';
import { AuthService } from 'services';

const AuthRegisterFreelancer: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  const [editEducationData, setEditEducationData] = useState<
    { degree: string; major: string; university: string; country: string; graduationYear: string }[]
  >([]);

  const {
    register: registerEducation,
    errors: errorsEducation,
    formState: formStateEducation,
    handleSubmit: handleSubmitEducation,
    formState: { isValid: isValidEducation },
  } = useForm({
    mode: 'onChange',
  });

  const addEducation = (formData: any) => {
    const newEducation = {
      degree: formData.degree,
      major: formData.major,
      university: formData.university,
      country: formData.country,
      graduationYear: formData.graduationYear,
    };

    setEditEducationData((current) => [...current, newEducation]);
  };

  const removeEducation = (index: number) => {
    setEditEducationData(editEducationData.filter((item: any, i: number) => i !== index));
  };

  const [editSkillData, setEditSkillData] = useState<string[]>([]);

  const {
    register: registerSkill,
    errors: errorsSkill,
    formState: formStateSkill,
    handleSubmit: handleSubmitSkill,
  } = useForm({
    mode: 'onChange',
  });

  const addSkill = (formData: any) => {
    setEditSkillData((current) => [...current, formData.skill]);
  };

  const removeSkill = (index: number) => {
    setEditSkillData(editSkillData.filter((item, i) => i !== index));
  };

  const [editCVData, setEditCVData] = useState<any>();

  const handleUploadCV = (e: any) => {
    if (e.target.files.length !== 0) {
      const cv = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      setEditCVData(cv);
    }
  };

  const uploadCV = () => {
    document.getElementById('selectCV')?.click();
  };

  const [editPortfolioData, setEditPortfolioData] = useState<any>();

  const handleUploadPortfolio = (e: any) => {
    if (e.target.files.length !== 0) {
      const portfolio = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      setEditPortfolioData(portfolio);
    }
  };

  const uploadPortfolio = () => {
    document.getElementById('selectPortfolio')?.click();
  };

  const [editDescData, setEditDescData] = useState<string>('');

  const {
    register: registerDesc,
    errors: errorsDesc,
    formState: formStateDesc,
    handleSubmit: handleSubmitDesc,
    formState: { isValid: isValidDesc },
  } = useForm({
    mode: 'onChange',
  });

  const submitRegisterAsFreelancer = () => {
    mutateRegisterFreelancer();
  };

  const [confirmRegisterAsFreelancer, setConfirmRegisterAsFreelancer] = useState<boolean>();

  const confirmationRegisterAsFreelancer = (formData: any) => {
    setEditDescData(formData.desc);
    setConfirmRegisterAsFreelancer(true);
  };

  const cancelRegisterAsFreelancer = () => {
    setEditDescData('');
    setConfirmRegisterAsFreelancer(false);
  };

  const {
    isLoading: isLoadingRegisterFreelancer,
    mutate: mutateRegisterFreelancer,
    error: errorRegisterFreelancer,
  } = useMutation<{}, ErrorWrapper>(
    ['register-freelancer'],
    async () =>
      await AuthService.registerFreelancer({
        cv: editCVData?.data,
        portfolio: editPortfolioData?.data,
        educationHistory: editEducationData,
        skills: editSkillData,
        description: editDescData,
      }),
    {
      onSuccess: () => {
        setLocalStorage('status', 'freelancer');
        history.push({
          pathname: '/dashboard',
        });
      },
    },
  );

  return (
    <>
      {confirmRegisterAsFreelancer && (
        <PopUpConfirm
          title="Daftar freelancer"
          message="Apakah anda yakin akan mendaftar menjadi freelancer?"
          onCancel={cancelRegisterAsFreelancer}
          onSubmit={submitRegisterAsFreelancer}
        />
      )}
      {errorRegisterFreelancer && <PopUpError message={errorRegisterFreelancer.message} />}
      {isLoadingRegisterFreelancer && <Loader type="fixed" />}
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Daftar Freelancer'} />
        <Row className="justify-content-center">
          <div className="col-10">
            <div className="card-sm mb-5">
              <div className="mb-5">
                <h4 className="font-weight-semibold mb-4">Tambahkan riwayat edukasi anda!</h4>
                {editEducationData.map((item: any, i: any) => {
                  return (
                    <div className="mb-3 card-sm">
                      <p className="mb-2">
                        {item.degree} {item.major}
                      </p>
                      <div className="d-flex flex-row justify-content-between">
                        <p className="font-weight-bold mb-2">{item.university}</p>
                        <div
                          className="text-primary-dark cursor-pointer"
                          onClick={() => removeEducation(i)}
                        >
                          <IconClose />
                        </div>
                      </div>
                      <p className="text-muted">
                        {item.country} ({item.graduationYear})
                      </p>
                    </div>
                  );
                })}
                <div className="card-sm mb-4">
                  <form onSubmit={handleSubmitEducation(addEducation)}>
                    <div className="d-flex flex-column">
                      <Row className="justify-content-between">
                        <div className="mb-5 col-12 col-lg-6">
                          <Row className="align-items-center">
                            <h4 className="font-weight-semibold mb-3 col-12">Strata</h4>
                            <div className="col-12">
                              <FormInput errorMessage={errorsEducation?.degree?.message}>
                                <Form.Control
                                  type="text"
                                  id="degree"
                                  name="degree"
                                  isInvalid={
                                    formStateEducation.touched.degree === true &&
                                    !!errorsEducation.degree
                                  }
                                  ref={
                                    registerEducation({
                                      required: {
                                        value: true,
                                        message: 'Strata tidak boleh kosong.',
                                      },
                                    }) as string & ((ref: Element | null) => void)
                                  }
                                ></Form.Control>
                              </FormInput>
                            </div>
                          </Row>
                        </div>
                        <div className="mb-5 col-12 col-lg-6">
                          <Row className="align-items-center">
                            <h4 className="font-weight-semibold mb-3 col-12">Jurusan</h4>
                            <div className="col-12">
                              <FormInput errorMessage={errorsEducation?.major?.message}>
                                <Form.Control
                                  type="text"
                                  id="major"
                                  name="major"
                                  isInvalid={
                                    formStateEducation.touched.major === true &&
                                    !!errorsEducation.major
                                  }
                                  ref={
                                    registerEducation({
                                      required: {
                                        value: true,
                                        message: 'Jurusan tidak boleh kosong.',
                                      },
                                    }) as string & ((ref: Element | null) => void)
                                  }
                                ></Form.Control>
                              </FormInput>
                            </div>
                          </Row>
                        </div>
                      </Row>
                      <Row className="justify-content-between">
                        <div className="mb-5 col-12 col-lg-6">
                          <Row className="align-items-center">
                            <h4 className="font-weight-semibold mb-3 col-12">Universitas</h4>
                            <div className="col-12">
                              <FormInput errorMessage={errorsEducation?.university?.message}>
                                <Form.Control
                                  type="text"
                                  id="university"
                                  name="university"
                                  isInvalid={
                                    formStateEducation.touched.university === true &&
                                    !!errorsEducation.university
                                  }
                                  ref={
                                    registerEducation({
                                      required: {
                                        value: true,
                                        message: 'Universitas tidak boleh kosong.',
                                      },
                                    }) as string & ((ref: Element | null) => void)
                                  }
                                ></Form.Control>
                              </FormInput>
                            </div>
                          </Row>
                        </div>

                        <div className="mb-5 col-12 col-lg-6">
                          <Row className="align-items-center">
                            <h4 className="font-weight-semibold mb-3 col-12">Negara</h4>
                            <div className="col-12">
                              <FormInput errorMessage={errorsEducation?.country?.message}>
                                <Form.Control
                                  type="text"
                                  id="country"
                                  name="country"
                                  isInvalid={
                                    formStateEducation.touched.country === true &&
                                    !!errorsEducation.country
                                  }
                                  ref={
                                    registerEducation({
                                      required: {
                                        value: true,
                                        message: 'Negara tidak boleh kosong.',
                                      },
                                    }) as string & ((ref: Element | null) => void)
                                  }
                                ></Form.Control>
                              </FormInput>
                            </div>
                          </Row>
                        </div>
                      </Row>
                      <Row className="justify-content-between">
                        <div className="mb-5 col-12 col-lg-6">
                          <Row className="align-items-center">
                            <h4 className="font-weight-semibold mb-3 col-12">Tahun Kelulusan</h4>
                            <div className="col-12">
                              <FormInput errorMessage={errorsEducation?.graduationYear?.message}>
                                <Form.Control
                                  type="text"
                                  id="graduationYear"
                                  name="graduationYear"
                                  isInvalid={
                                    formStateEducation.touched.graduationYear === true &&
                                    !!errorsEducation.graduationYear
                                  }
                                  ref={
                                    registerEducation({
                                      required: {
                                        value: true,
                                        message: 'Tahun kelulusan tidak boleh kosong.',
                                      },
                                    }) as string & ((ref: Element | null) => void)
                                  }
                                ></Form.Control>
                              </FormInput>
                            </div>
                          </Row>
                        </div>
                      </Row>
                      <button
                        type="submit"
                        disabled={!isValidEducation}
                        className="btn btn-outline-primary"
                      >
                        Tambah Edukasi
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="mb-5">
                <h4 className="font-weight-semibold mb-4">Tambahkan keahlian anda!</h4>
                <div className="d-flex flex-row flex-wrap">
                  {editSkillData.map((item, i) => {
                    return (
                      <div className="chip chip-primary mr-2 mb-3">
                        <span className="mr-2"> {item} </span>
                        <div
                          className="cursor-pointer"
                          onClick={() => removeSkill(i)}
                        >
                          <IconClose />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <form onSubmit={handleSubmitSkill(addSkill)}>
                  <div className="d-flex flex-row mb-4">
                    <div className="w-100 mr-3">
                      <FormInput errorMessage={errorsSkill?.skill?.message}>
                        <Form.Control
                          type="text"
                          id="skill"
                          name="skill"
                          isInvalid={formStateSkill.touched.skill === true && !!errorsSkill.skill}
                          ref={
                            registerSkill({
                              required: {
                                value: true,
                                message: 'Keahlian tidak boleh kosong.',
                              },
                            }) as string & ((ref: Element | null) => void)
                          }
                        ></Form.Control>
                      </FormInput>
                    </div>
                    <div style={{ width: '6rem' }}>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ borderRadius: '0.5rem' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="mb-5">
                <h4 className="font-weight-semibold mb-4">Tambahkan CV anda!</h4>
                {editCVData && (
                  <div className="card-sm d-flex flex-row align-items-center justify-content-between mb-4">
                    <h4 className="text-primary-dark font-weight-bold">{editCVData.data.name}</h4>
                  </div>
                )}
                <div
                  className="cursor-pointer mb-4"
                  onClick={uploadCV}
                >
                  <div className="card-sm d-flex flex-row align-items-center justify-content-between">
                    <h4 className="text-primary-dark font-weight-bold">
                      Tambahkan CV (Curriculum Vitae)
                    </h4>
                    <div className="text-primary-dark">
                      <IconAddCircle />
                    </div>
                  </div>
                </div>
                <input
                  hidden
                  id="selectCV"
                  type="file"
                  onChange={handleUploadCV}
                />
              </div>

              <div className="mb-5">
                <h4 className="font-weight-semibold mb-4">Tambahkan Portfolio anda!</h4>
                {editPortfolioData && (
                  <div className="card-sm d-flex flex-row align-items-center justify-content-between mb-4">
                    <h4 className="text-primary-dark font-weight-bold">
                      {editPortfolioData.data.name}
                    </h4>
                  </div>
                )}
                <div
                  className="cursor-pointer mb-4"
                  onClick={uploadPortfolio}
                >
                  <div className="card-sm d-flex flex-row align-items-center justify-content-between">
                    <h4 className="text-primary-dark font-weight-bold">Tambahkan Portfolio</h4>
                    <div className="text-primary-dark">
                      <IconAddCircle />
                    </div>
                  </div>
                </div>
                <input
                  hidden
                  id="selectPortfolio"
                  type="file"
                  onChange={handleUploadPortfolio}
                />
              </div>

              <div>
                <h4 className="font-weight-semibold mb-4">
                  Deskripsikan diri anda secara singkat!
                </h4>
                <form onSubmit={handleSubmitDesc(confirmationRegisterAsFreelancer)}>
                  <div className="d-flex flex-column">
                    <div className="mb-5">
                      <FormInput errorMessage={errorsDesc?.desc?.message}>
                        <Form.Control
                          as="textarea"
                          id="desc"
                          name="desc"
                          className="desc-text-area"
                          isInvalid={formStateDesc.touched.desc === true && !!errorsDesc.desc}
                          ref={
                            registerDesc({
                              required: {
                                value: true,
                                message: 'Deskripsi tidak boleh kosong.',
                              },
                            }) as string & ((ref: Element | null) => void)
                          }
                        ></Form.Control>
                      </FormInput>
                    </div>
                    <button
                      type="submit"
                      disabled={!isValidDesc}
                      className="btn btn-primary align-self-end col-12 col-lg-6"
                    >
                      Jadi Freelancer Sekarang
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default AuthRegisterFreelancer;
