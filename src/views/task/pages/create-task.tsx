import React, { useEffect, useState } from 'react';
import { Row, Form } from 'react-bootstrap';

import {
  Footer,
  FormInput,
  Header,
  InlineRetryError,
  Loader,
  PopUpError,
  PopUpSuccess,
  TitleBanner,
} from 'shared/components';
import { useHistory } from 'react-router-dom';
import { IconClose } from 'images';
import { useForm } from 'react-hook-form';
import { ErrorWrapper, TaskCreateTaskOutput, TaskInquiryCategoryOutput } from 'models';
import { TaskService } from 'services';
import { useMutation, useQuery } from 'react-query';
import DatePicker from 'react-datepicker';

const CreateTask: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  const [startDate, setStartDate] = useState<any>(null);

  const [formattedDate, setFormattedDate] = useState<string>('');

  const {
    data: taskCategory,
    isLoading: isLoadingTaskCategory,
    refetch: refetchTaskCategory,
    error: errorTaskCategory,
  } = useQuery<TaskInquiryCategoryOutput, ErrorWrapper>(
    ['inquiry-task-category'],
    async () => await TaskService.inquiryCategory(),
  );

  const [step1Data, setStep1Data] = useState<{
    name: string;
    subCategory: string;
    deadline: string;
    difficulty: string;
    description: string;
    price: number;
    tags: string[];
  }>();

  const {
    register: registerStep1,
    errors: errorsStep1,
    formState: formStateStep1,
    handleSubmit: handleSubmitStep1,
    formState: { isValid: isValidStep1 },
  } = useForm({
    mode: 'onChange',
  });

  const [editTagData, setEditTagData] = useState<string[]>([]);

  const {
    register: registerTag,
    errors: errorsTag,
    formState: formStateTag,
    handleSubmit: handleSubmitTag,
  } = useForm({
    mode: 'onChange',
  });

  const addTag = (formData: any) => {
    setEditTagData((current) => [...current, formData.tag]);
  };

  const removeTag = (index: number) => {
    setEditTagData(editTagData.filter((item, i) => i !== index));
  };

  const submitStep1 = (formData: any) => {
    if (formData.subCategory === -1) {
      return;
    }

    if (formData.difficulty === -1) {
      return;
    }

    const object = {
      name: formData.name,
      subCategory: formData.subCategory,
      deadline: '',
      difficulty: formData.difficulty,
      description: formData.description,
      price: formData.price,
      tags: editTagData,
    };

    setStep1Data(object);
    const year = startDate.toLocaleString('default', { year: 'numeric' });
    const month = startDate.toLocaleString('default', { month: '2-digit' });
    const day = startDate.toLocaleString('default', { day: '2-digit' });

    const formattedDate = year + '-' + month + '-' + day;
    setFormattedDate(formattedDate);
    mutateCreateTask();
  };

  const {
    data: createTaskData,
    isLoading: isLoadingCreateTask,
    mutate: mutateCreateTask,
    error: errorCreateTask,
  } = useMutation<TaskCreateTaskOutput, ErrorWrapper>(
    ['create-task'],
    async () =>
      await TaskService.create({
        name: step1Data?.name || '',
        subCategory: step1Data?.subCategory || '',
        deadline: formattedDate || '',
        difficulty: step1Data?.difficulty || '',
        description: step1Data?.description || '',
        price: step1Data?.price || 0,
        tags: step1Data?.tags || [],
      }),
  );

  return (
    <>
      {isLoadingCreateTask && <Loader type="fixed" />}
      {errorCreateTask && <PopUpError message={errorCreateTask.message} />}
      {createTaskData && (
        <PopUpSuccess
          message="Berhasil membuat tugas!"
          onClose={() => {
            history.push('/task/' + createTaskData.id);
          }}
        />
      )}
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Buat Tugas'} />
        <Row className="justify-content-center">
          <div className="col-10">
            <div className="card-sm mb-5">
              {isLoadingTaskCategory && <Loader type="inline" />}
              {errorTaskCategory && (
                <div className="flex-centered">
                  <InlineRetryError
                    message={errorTaskCategory.message}
                    onRetry={refetchTaskCategory}
                  />
                </div>
              )}
              {taskCategory && (
                <>
                  <form
                    onSubmit={handleSubmitStep1(submitStep1)}
                    id="step1Form"
                  >
                    <div className="mb-4">
                      <h6 className="font-weight-semibold mb-3">Nama tugas</h6>
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
                                message: 'Nama tugas harus diisi.',
                              },
                            }) as string & ((ref: Element | null) => void)
                          }
                        />
                      </FormInput>
                    </div>
                    <div className="mb-4">
                      <h6 className="font-weight-semibold mb-3">Kategori / sub-kategori tugas</h6>
                      <FormInput errorMessage={errorsStep1?.subCategory?.message}>
                        <Form.Control
                          as="select"
                          id="subCategory"
                          name="subCategory"
                          isInvalid={
                            formStateStep1.touched.subCategory === true && !!errorsStep1.subCategory
                          }
                          defaultValue={step1Data?.subCategory}
                          ref={registerStep1() as string & ((ref: Element | null) => void)}
                        >
                          <option
                            hidden
                            value={-1}
                          >
                            Pilih Kategori / Sub-Kategori
                          </option>
                          {taskCategory.categories.map((cat) => {
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
                      <h6 className="font-weight-semibold mb-3">Batas waktu pengerjaan tugas</h6>
                      <div>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          placeholderText="Pilih Batas Waktu"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <h6 className="font-weight-semibold mb-3">Tingkat kesulitan tugas</h6>
                      <FormInput errorMessage={errorsStep1?.difficulty?.message}>
                        <Form.Control
                          as="select"
                          id="difficulty"
                          name="difficulty"
                          isInvalid={
                            formStateStep1.touched.difficulty === true && !!errorsStep1.difficulty
                          }
                          defaultValue={step1Data?.difficulty}
                          ref={
                            registerStep1({
                              required: {
                                value: true,
                                message: 'Tingkat kesulitan harus diisi.',
                              },
                            }) as string & ((ref: Element | null) => void)
                          }
                        >
                          <option
                            hidden
                            value={-1}
                          >
                            Pilih Tingkat Kesulitan
                          </option>
                          <option value="Pemula">Pemula</option>
                          <option value="Menengah">Menengah</option>
                          <option value="Expert">Expert</option>
                          <option value="Profesional">Profesional</option>
                        </Form.Control>
                      </FormInput>
                    </div>
                    <div className="mb-4">
                      <h6 className="font-weight-semibold mb-3">
                        Jelaskan mengenai proyek yang anda butuhkan!
                      </h6>
                      <FormInput errorMessage={errorsStep1?.description?.message}>
                        <Form.Control
                          as="textarea"
                          id="description"
                          name="description"
                          className="activity-popup-text-area"
                          isInvalid={
                            formStateStep1.touched.description === true && !!errorsStep1.description
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
                      <h6 className="font-weight-semibold mb-3">Harga tugas</h6>
                      <FormInput errorMessage={errorsStep1?.price?.message}>
                        <div className="d-flex flex-row">
                          <div className="input-prefix mr-3 flex-centered">Rp</div>
                          <Form.Control
                            type="number"
                            id="price"
                            name="price"
                            isInvalid={formStateStep1.touched.price === true && !!errorsStep1.price}
                            defaultValue={step1Data?.price}
                            ref={
                              registerStep1({
                                required: {
                                  value: true,
                                  message: 'Harga tugas harus diisi.',
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
                      {editTagData.map((item, i) => {
                        return (
                          <div className="chip chip-primary mr-2 mb-3">
                            <span className="mr-2"> {item} </span>
                            <div
                              className="cursor-pointer"
                              onClick={() => removeTag(i)}
                            >
                              <IconClose />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <form onSubmit={handleSubmitTag(addTag)}>
                      <div className="d-flex flex-row mb-4">
                        <div className="w-100 mr-3">
                          <FormInput errorMessage={errorsTag?.tag?.message}>
                            <Form.Control
                              type="text"
                              id="tag"
                              name="tag"
                              isInvalid={formStateTag.touched.tag === true && !!errorsTag.tag}
                              ref={
                                registerTag({
                                  required: {
                                    value: true,
                                    message: 'Tag tidak boleh kosong.',
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
                            disabled={editTagData.length >= 5}
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
                      disabled={!isValidStep1 || editTagData.length === 0}
                    >
                      Buat Tugas
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default CreateTask;
