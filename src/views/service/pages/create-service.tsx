import React, { useEffect, useState } from 'react';
import { Row, Tab, Tabs, Image, Form } from 'react-bootstrap';

import {
  Footer,
  FormInput,
  Header,
  InfoBox,
  InlineRetryError,
  Loader,
  PopUpError,
  PopUpSuccess,
  TitleBanner,
} from 'shared/components';
import { useHistory } from 'react-router-dom';
import { formatCurrency } from 'utils';
import { IconChevronRight, IconClose, IconGallery, IconStar } from 'images';
import { useForm } from 'react-hook-form';
import {
  ErrorWrapper,
  ServiceCreateServiceOutput,
  ServiceInquiryAdditionalInfoOutput,
  ServiceInquiryCategoryOutput,
} from 'models';
import { ServiceService } from 'services';
import { useMutation, useQuery } from 'react-query';

const CreateService: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  const {
    data: serviceCategory,
    isLoading: isLoadingServiceCategory,
    refetch: refetchServiceCategory,
    error: errorServiceCategory,
  } = useQuery<ServiceInquiryCategoryOutput, ErrorWrapper>(
    ['inquiry-service-category'],
    async () => await ServiceService.inquiryCategory(),
  );

  const [step1Data, setStep1Data] = useState<{
    name: string;
    subCategory: string;
    workingTime: number;
    revisionCount: number;
    description: string;
    price: number;
    tags: string[];
  }>();

  const {
    data: additionalInfo,
    isLoading: isLoadingAdditionalInfo,
    refetch: refetchAdditionalInfo,
    error: errorAdditionalInfo,
  } = useQuery<ServiceInquiryAdditionalInfoOutput, ErrorWrapper>(
    ['inquiry-additional-info'],
    async () => await ServiceService.inquiryAdditionalInfo(step1Data?.subCategory || ''),
    {
      enabled: !!step1Data,
    },
  );

  const {
    register: registerStep1,
    errors: errorsStep1,
    formState: formStateStep1,
    handleSubmit: handleSubmitStep1,
    formState: { isValid: isValidStep1 },
  } = useForm({
    mode: 'onChange',
  });

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

  const [currentStep, setCurrentStep] = useState<number>(1);

  const submitStep1 = (formData: any) => {
    if (formData.subCategory === -1) {
      return;
    }

    if (formData.revisionCount === -1) {
      return;
    }

    const object = {
      name: formData.name,
      subCategory: formData.subCategory,
      workingTime: formData.workingTime,
      revisionCount: formData.revisionCount,
      description: formData.description,
      price: formData.price,
      tags: editSkillData,
    };

    setStep1Data(object);
    setCurrentStep(2);
  };

  const [step2Data, setStep2Data] = useState<
    {
      id: string;
      isSupported: boolean;
    }[]
  >();

  const {
    register: registerStep2,
    errors: errorsStep2,
    formState: formStateStep2,
    handleSubmit: handleSubmitStep2,
  } = useForm({
    mode: 'onChange',
  });

  const submitStep2 = (formData: any) => {
    const keyArray = Object.keys(formData);
    const valueArray = Object.values(formData);

    let object = keyArray.map((key, i) => {
      return {
        id: key,
        isSupported: Boolean(valueArray[i]),
      };
    });

    setStep2Data(object);
    setCurrentStep(3);
  };

  const [imageData, setImageData] = useState<any[]>([]);
  const [errorExceedImage, setErrorExceedImage] = useState<boolean>(false);

  const handleUploadImage = (e: any) => {
    if (e.target.files.length !== 0) {
      const addFile = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      if (imageData.length <= 4) {
        setImageData((item: any) => [...item, addFile]);
      }
      if (imageData.length === 4) {
        setErrorExceedImage(true);
      }
    }
    e.target.value = '';
  };

  const uploadImage = () => {
    document.getElementById('selectUploadImage')?.click();
  };

  const removeImage = (index: number) => {
    if (imageData.length === 5) {
      setErrorExceedImage(false);
    }
    setImageData(imageData.filter((item: any, i: number) => i !== index));
  };

  const createService = () => {
    mutateCreateService();
  };

  const {
    data: createServiceData,
    isLoading: isLoadingCreateService,
    mutate: mutateCreateService,
    error: errorCreateService,
  } = useMutation<ServiceCreateServiceOutput, ErrorWrapper>(
    ['create-service'],
    async () =>
      await ServiceService.create({
        image: imageData?.map((t) => t.data),
        name: step1Data?.name || '',
        subCategory: step1Data?.subCategory || '',
        workingTime: step1Data?.workingTime || 0,
        revisionCount: step1Data?.revisionCount || 0,
        description: step1Data?.description || '',
        price: step1Data?.price || 0,
        tags: step1Data?.tags || [],
        additionalInfo: step2Data || [{ id: '', isSupported: false }],
      }),
  );

  return (
    <>
      {isLoadingCreateService && <Loader type="fixed" />}
      {errorCreateService && <PopUpError message={errorCreateService.message} />}
      {createServiceData && (
        <PopUpSuccess
          message="Berhasil membuat layanan!"
          onClose={() => {
            history.push('/service/' + createServiceData.id);
          }}
        />
      )}
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Buat Layanan'} />
        <Row className="justify-content-center">
          <div className="col-10">
            <Row className="mb-5">
              <div
                className="d-flex align-items-center flex-column mr-4 mb-3"
                style={{ width: '10rem' }}
              >
                <div
                  className={
                    'rounded-circle shadow-lg flex-centered mb-3 ' +
                    (currentStep === 1 ? 'bg-primary-light' : 'bg-white')
                  }
                  style={{ width: '7rem', height: '7rem' }}
                >
                  <h1 className="text-primary-dark m-0">1</h1>
                </div>
                <p className="text-center">Deskripsi umum layanan</p>
              </div>
              <div className="text-primary-dark align-self-center mr-4">
                <IconChevronRight />
              </div>
              <div
                className="d-flex align-items-center flex-column mr-4 mb-3"
                style={{ width: '10rem' }}
              >
                <div
                  className={
                    'rounded-circle shadow-lg flex-centered mb-3 ' +
                    (currentStep === 2 ? 'bg-primary-light' : 'bg-white')
                  }
                  style={{ width: '7rem', height: '7rem' }}
                >
                  <h1 className="text-primary-dark m-0">2</h1>
                </div>
                <p className="text-center">Deskripsi khusus layanan</p>
              </div>
              <div className="text-primary-dark align-self-center mr-4">
                <IconChevronRight />
              </div>
              <div
                className="d-flex align-items-center flex-column mb-3"
                style={{ width: '10rem' }}
              >
                <div
                  className={
                    'rounded-circle shadow-lg flex-centered mb-3 ' +
                    (currentStep === 3 ? 'bg-primary-light' : 'bg-white')
                  }
                  style={{ width: '7rem', height: '7rem' }}
                >
                  <h1 className="text-primary-dark m-0">3</h1>
                </div>
                <p className="text-center">Foto-foto pendukung</p>
              </div>
            </Row>
            {currentStep === 1 && (
              <div className="card-sm mb-5">
                {isLoadingServiceCategory && <Loader type="inline" />}
                {errorServiceCategory && (
                  <div className="flex-centered">
                    <InlineRetryError
                      message={errorServiceCategory.message}
                      onRetry={refetchServiceCategory}
                    />
                  </div>
                )}
                {serviceCategory && (
                  <>
                    <form
                      onSubmit={handleSubmitStep1(submitStep1)}
                      id="step1Form"
                    >
                      <div className="mb-4">
                        <h6 className="font-weight-semibold mb-3">Nama layanan</h6>
                        <FormInput errorMessage={errorsStep1?.name?.message}>
                          <Form.Control
                            type="text"
                            id="name"
                            name="name"
                            isInvalid={formStateStep1.touched.name === true && !!errorsStep1.name}
                            defaultValue={step1Data?.name}
                            ref={
                              registerStep1({
                                required: {
                                  value: true,
                                  message: 'Nama layanan harus diisi.',
                                },
                              }) as string & ((ref: Element | null) => void)
                            }
                          />
                        </FormInput>
                      </div>
                      <div className="mb-4">
                        <h6 className="font-weight-semibold mb-3">
                          Kategori / sub-kategori layanan
                        </h6>
                        <FormInput errorMessage={errorsStep1?.subCategory?.message}>
                          <Form.Control
                            as="select"
                            id="subCategory"
                            name="subCategory"
                            isInvalid={
                              formStateStep1.touched.subCategory === true &&
                              !!errorsStep1.subCategory
                            }
                            defaultValue={step1Data?.subCategory}
                            ref={registerStep1() as string & ((ref: Element | null) => void)}
                          >
                            <option
                              hidden
                              value={-1}
                            >
                              Pilih kategori / sub-kategori
                            </option>
                            {serviceCategory.categories.map((cat) => {
                              return (
                                <>
                                  <option disabled></option>
                                  <option disabled>{cat.name}</option>
                                  {cat.subCategories.map((subCat) => {
                                    return <option value={subCat.id}>{subCat.name}</option>;
                                  })}
                                </>
                              );
                            })}
                          </Form.Control>
                        </FormInput>
                      </div>
                      <div className="mb-4">
                        <h6 className="font-weight-semibold mb-3">Waktu pengerjaan</h6>
                        <FormInput errorMessage={errorsStep1?.workingTime?.message}>
                          <div className="d-flex flex-row">
                            <Form.Control
                              type="number"
                              id="workingTime"
                              name="workingTime"
                              isInvalid={
                                formStateStep1.touched.workingTime === true &&
                                !!errorsStep1.workingTime
                              }
                              defaultValue={step1Data?.workingTime}
                              ref={
                                registerStep1({
                                  required: {
                                    value: true,
                                    message: 'Waktu pengerjaan harus diisi.',
                                  },
                                }) as string & ((ref: Element | null) => void)
                              }
                            />
                            <div className="input-prefix ml-3 flex-centered">Hari</div>
                          </div>
                        </FormInput>
                      </div>
                      <div className="mb-4">
                        <h6 className="font-weight-semibold mb-3">Jumlah revisi</h6>
                        <FormInput errorMessage={errorsStep1?.revisionCount?.message}>
                          <Form.Control
                            as="select"
                            id="revisionCount"
                            name="revisionCount"
                            isInvalid={
                              formStateStep1.touched.revisionCount === true &&
                              !!errorsStep1.revisionCount
                            }
                            defaultValue={step1Data?.revisionCount}
                            ref={
                              registerStep1({
                                required: {
                                  value: true,
                                  message: 'Waktu pengerjaan harus diisi.',
                                },
                              }) as string & ((ref: Element | null) => void)
                            }
                          >
                            <option
                              hidden
                              value={-1}
                            >
                              Pilih jumlah revisi
                            </option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </Form.Control>
                        </FormInput>
                      </div>
                      <div className="mb-4">
                        <h6 className="font-weight-semibold mb-3">
                          Jelaskan mengenai layanan yang kamu tawarkan!
                        </h6>
                        <FormInput errorMessage={errorsStep1?.description?.message}>
                          <Form.Control
                            as="textarea"
                            id="description"
                            name="description"
                            className="activity-popup-text-area"
                            isInvalid={
                              formStateStep1.touched.description === true &&
                              !!errorsStep1.description
                            }
                            defaultValue={step1Data?.description}
                            ref={
                              registerStep1({
                                required: {
                                  value: true,
                                  message: 'Deskripsi harus diisi.',
                                },
                              }) as string & ((ref: Element | null) => void)
                            }
                          />
                        </FormInput>
                      </div>
                      <div className="mb-4">
                        <h6 className="font-weight-semibold mb-3">Harga layanan</h6>
                        <FormInput errorMessage={errorsStep1?.price?.message}>
                          <div className="d-flex flex-row">
                            <div className="input-prefix mr-3 flex-centered">Rp</div>
                            <Form.Control
                              type="number"
                              id="price"
                              name="price"
                              isInvalid={
                                formStateStep1.touched.price === true && !!errorsStep1.price
                              }
                              defaultValue={step1Data?.price}
                              ref={
                                registerStep1({
                                  required: {
                                    value: true,
                                    message: 'Harga layanan harus diisi.',
                                  },
                                }) as string & ((ref: Element | null) => void)
                              }
                            />
                          </div>
                        </FormInput>
                      </div>
                    </form>
                    <div className="mb-5">
                      <h6 className="font-weight-semibold mb-3">Tag (Maksimal 5)</h6>
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
                                isInvalid={
                                  formStateSkill.touched.skill === true && !!errorsSkill.skill
                                }
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
                              disabled={editSkillData.length >= 5}
                              style={{ borderRadius: '0.5rem' }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="d-flex flex-row justify-content-end">
                      <button
                        form="step1Form"
                        type="submit"
                        className="btn btn-primary w-100 col-6 mb-3"
                        disabled={!isValidStep1 || editSkillData.length === 0}
                      >
                        Lanjut
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            {currentStep === 2 && (
              <div className="card-sm mb-5">
                {isLoadingAdditionalInfo && <Loader type="inline" />}
                {errorAdditionalInfo && (
                  <div className="flex-centered">
                    <InlineRetryError
                      message={errorAdditionalInfo.message}
                      onRetry={refetchAdditionalInfo}
                    />
                  </div>
                )}
                {additionalInfo && (
                  <>
                    <div className="mb-4">
                      <form
                        onSubmit={handleSubmitStep2(submitStep2)}
                        id="step2Form"
                      >
                        {additionalInfo.additionalInfo.map((t) => {
                          return (
                            <div className="mb-3">
                              <h4 className="font-weight-semibold mb-3">{t.title}?</h4>
                              <div className="d-flex flex-row align-items-center">
                                <p className="mr-2">Tidak</p>
                                <FormInput>
                                  <label className="switch mb-0">
                                    <Form.Control
                                      type="checkbox"
                                      id={t.id}
                                      name={t.id}
                                      ref={
                                        registerStep2() as string & ((ref: Element | null) => void)
                                      }
                                    />
                                    <span className="slider round"></span>
                                  </label>
                                </FormInput>
                                <p className="ml-2">Ya</p>
                              </div>
                            </div>
                          );
                        })}
                      </form>
                    </div>
                    <Row>
                      <div className="col-12 col-md-6 mb-3">
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="btn btn-outline-primary w-100"
                        >
                          Kembali
                        </button>
                      </div>
                      <div className="col-12 col-md-6 order-first order-md-last mb-3">
                        <button
                          form="step2Form"
                          type="submit"
                          className="btn btn-primary w-100"
                        >
                          Lanjut
                        </button>
                      </div>
                    </Row>
                  </>
                )}
              </div>
            )}
            {currentStep === 3 && (
              <div className="card-sm mb-5">
                <div className="mb-4">
                  <h4 className="font-weight-semibold mb-3">
                    Tambahkan foto pendukung agar klien dapat melihat hasil karya kamu sebelumnya!
                    (Maksimal 5 foto)
                  </h4>
                  <div className="d-flex flex-nowrap overflow-auto">
                    {imageData?.map((item, i) => (
                      <div
                        className="position-relative cursor-pointer mr-4 image-create-service mb-4"
                        onClick={() => removeImage(i)}
                        style={{ minWidth: '20rem' }}
                      >
                        <Image
                          className="w-100 h-100"
                          src={item?.preview}
                          style={{ filter: 'brightness(0.75)', borderRadius: '0.5rem' }}
                        />
                        <div
                          className="text-white position-absolute"
                          style={{ top: '9rem', left: '9rem' }}
                        >
                          <IconClose />
                        </div>
                      </div>
                    ))}
                    {!errorExceedImage && (
                      <div
                        className="cursor-pointer mb-4 d-flex flex-centered add-image-create-service"
                        onClick={uploadImage}
                        style={{ minWidth: '20rem' }}
                      >
                        <div className="d-flex flex-centered flex-column">
                          <div className="text-primary-dark">
                            <IconGallery />
                          </div>
                          <small className="text-muted">Upload Gambar</small>
                        </div>
                      </div>
                    )}
                    <input
                      hidden
                      id="selectUploadImage"
                      type="file"
                      onChange={handleUploadImage}
                    />
                  </div>
                </div>
                <Row>
                  <div className="col-12 col-md-6 mb-3">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="btn btn-outline-primary w-100"
                    >
                      Kembali
                    </button>
                  </div>
                  <div className="col-12 col-md-6 order-first order-md-last mb-3">
                    <button
                      className="btn btn-primary w-100"
                      onClick={createService}
                      disabled={imageData.length === 0}
                    >
                      Buat Layanan
                    </button>
                  </div>
                </Row>
              </div>
            )}
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default CreateService;
