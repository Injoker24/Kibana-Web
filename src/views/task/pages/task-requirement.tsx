import React, { useEffect, useState } from 'react';
import { Form, Row } from 'react-bootstrap';

import {
  Footer,
  FormInput,
  Header,
  InfoBox,
  Loader,
  PopUpError,
  TitleBanner,
} from 'shared/components';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IconAddCircle } from 'images';
import { useMutation } from 'react-query';
import { ErrorWrapper } from 'models';
import TransactionService from 'services/transaction.service';

const TaskRequirement: React.FC = () => {
  const params = useParams<{ transactionId: string }>();
  const history = useHistory();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  const [addFile, setAddFile] = useState<any>();
  const [description, setDescription] = useState<string>('');

  const {
    register: registerRequirement,
    errors: errorsRequirement,
    formState: formStateRequirement,
    handleSubmit: handleSubmitRequirement,
    formState: { isValid: isValidRequirement },
  } = useForm({
    mode: 'onChange',
  });

  const confirmSubmitRequirement = (formData: any) => {
    setDescription(formData.description);
    mutateSendRequirement();
  };

  const handleUploadAddFile = (e: any) => {
    if (e.target.files.length !== 0) {
      const addFile = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      setAddFile(addFile);
    }
  };

  const uploadAddFile = () => {
    document.getElementById('selectAddFile')?.click();
  };

  const {
    isLoading: isLoadingSendRequirement,
    mutate: mutateSendRequirement,
    error: errorSendRequirement,
  } = useMutation<{}, ErrorWrapper>(
    ['send-requirement'],
    async () =>
      await TransactionService.sendRequirement({
        supportingFile: addFile.data,
        transactionId: params.transactionId,
        description: description,
      }),
    {
      onSuccess: () => {
        history.push({
          pathname: '/task/owned/' + params.transactionId,
          state: {
            transactionId: params.transactionId,
            status: 'payment',
          },
        });
      },
    },
  );

  return (
    <>
      {isLoadingSendRequirement && <Loader type="fixed" />}
      {errorSendRequirement && <PopUpError message={errorSendRequirement.message} />}
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Prasyarat'} />
        <Row className="justify-content-center">
          <div className="col-10">
            <div className="mb-4">
              <InfoBox message="Kamu diminta memberikan detail proyek, seperti tujuan yang ingin dicapai, cara pembuatan yang diinginkan, referensi yang dibutuhkan, dan segala informasi relevan lainnya. Proses ini memungkinkan kamu untuk memberikan panduan yang jelas kepada penyedia jasa agar mereka dapat memahami proyekmu dengan lebih baik." />
            </div>
            <div className="card-sm mb-5">
              <form onSubmit={handleSubmitRequirement(confirmSubmitRequirement)}>
                {addFile && (
                  <div className="card-sm d-flex flex-row align-items-center justify-content-between mb-4">
                    <h4 className="text-primary-dark font-weight-bold mb-0">{addFile.data.name}</h4>
                  </div>
                )}

                <div
                  className="cursor-pointer mb-5"
                  onClick={uploadAddFile}
                >
                  <div className="card-sm d-flex flex-row align-items-center justify-content-between">
                    <h4 className="text-primary-dark font-weight-bold mb-0 mr-2">
                      Tambahkan File Pendukung
                    </h4>
                    <div className="text-primary-dark">
                      <IconAddCircle />
                    </div>
                  </div>
                </div>

                <input
                  hidden
                  id="selectAddFile"
                  type="file"
                  onChange={handleUploadAddFile}
                />
                <div className="mb-5">
                  <h4 className="font-weight-semibold mb-3">
                    Jelaskan mengenai proyek yang kamu butuhkan!
                  </h4>
                  <FormInput errorMessage={errorsRequirement?.description?.message}>
                    <Form.Control
                      as="textarea"
                      id="description"
                      name="description"
                      className="requirement-text-area"
                      isInvalid={
                        formStateRequirement.touched.description === true &&
                        !!errorsRequirement.description
                      }
                      ref={
                        registerRequirement({
                          required: {
                            value: true,
                            message: 'Deskripsi tidak boleh kosong.',
                          },
                        }) as string & ((ref: Element | null) => void)
                      }
                    ></Form.Control>
                  </FormInput>
                </div>
                <Row className="justify-content-end">
                  <div className="col-12 col-md-6">
                    <button
                      className="btn btn-primary w-100"
                      type="submit"
                      disabled={!addFile || !isValidRequirement}
                    >
                      Lanjut ke Bukti Pembayaran
                    </button>
                  </div>
                </Row>
              </form>
            </div>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default TaskRequirement;
