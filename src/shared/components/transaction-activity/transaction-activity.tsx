import { TransactionActivityButtonsEnum, TransactionActivityEnum } from 'enums';
import { IconClose, IconDownloadCloud } from 'images';
import React, { useState } from 'react';
import InfoBox from '../info-box';
import { Form, Row } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import FormInput from '../form-input';
import { useForm } from 'react-hook-form';
import TransactionService from 'services/transaction.service';
import { useMutation } from 'react-query';
import { ErrorWrapper } from 'models';
import Loader from '../loader';

interface Props {
  userType: string;
  projectType: string;
  activity: {
    timestamp: string;
    code: string;
    title: string;
    description?: string;
    files?: {
      downloadUrl: string;
      fileName: string;
    }[];
    responseDeadline?: string;
    deadlineExtension?: string;
    buttons?: {
      code: string;
      name: string;
    }[];
  };
  transactionId: string;
  refetchTransaction: () => {};
}

const TransactionActivity: React.FC<Props> = ({
  userType,
  projectType,
  activity,
  transactionId,
  refetchTransaction,
}) => {
  // #region Ask Revision
  const [modalRevision, setModalRevision] = useState<boolean>(false);
  const [revisionMessage, setRevisionMessage] = useState<string>('');

  const openModalRevision = () => {
    setModalRevision(true);
  };

  const {
    register: registerRevision,
    errors: errorsRevision,
    formState: formStateRevision,
    handleSubmit: handleSubmitRevision,
    formState: { isValid: isValidRevision },
  } = useForm({
    mode: 'onChange',
  });

  const confirmSubmitRevision = (formData: any) => {
    setRevisionMessage(formData.revisionMessage);
    mutateAskRevision();
  };

  const {
    isLoading: isLoadingAskRevision,
    mutate: mutateAskRevision,
    error: errorAskRevision,
  } = useMutation<{}, ErrorWrapper>(
    ['ask-revision'],
    async () =>
      await TransactionService.askRevision({
        transactionId: transactionId,
        message: revisionMessage,
      }),
    {
      onSuccess: () => {
        setModalRevision(false);
        setRevisionMessage('');
        refetchTransaction();
      },
    },
  );
  // #endregion

  // #region Complete
  const [modalComplete, setModalComplete] = useState<boolean>(false);

  const openModalComplete = () => {
    setModalComplete(true);
  };

  const {
    isLoading: isLoadingComplete,
    mutate: mutateComplete,
    error: errorComplete,
  } = useMutation<{}, ErrorWrapper>(
    ['complete'],
    async () =>
      await TransactionService.complete({
        transactionId: transactionId,
      }),
    {
      onSuccess: () => {
        setModalComplete(false);
        refetchTransaction();
      },
    },
  );
  // #endregion

  // #region Cancel Return
  const [modalCancelReturn, setModalCancelReturn] = useState<boolean>(false);

  const openModalCancelReturn = () => {
    setModalCancelReturn(true);
  };

  const {
    isLoading: isLoadingCancelReturn,
    mutate: mutateCancelReturn,
    error: errorCancelReturn,
  } = useMutation<{}, ErrorWrapper>(
    ['cancel-return'],
    async () =>
      await TransactionService.cancelReturn({
        transactionId: transactionId,
      }),
    {
      onSuccess: () => {
        setModalCancelReturn(false);
        refetchTransaction();
      },
    },
  );
  // #endregion

  // #region Call Admin
  const [modalCallAdmin, setModalCallAdmin] = useState<boolean>(false);

  const openModalCallAdmin = () => {
    setModalCallAdmin(true);
  };

  const {
    isLoading: isLoadingCallAdmin,
    mutate: mutateCallAdmin,
    error: errorCallAdmin,
  } = useMutation<{}, ErrorWrapper>(
    ['call-admin'],
    async () =>
      await TransactionService.callAdmin({
        transactionId: transactionId,
      }),
    {
      onSuccess: () => {
        setModalCallAdmin(false);
        refetchTransaction();
      },
    },
  );
  // #endregion

  // #region Manage Cancellation
  const [modalAcceptCancellation, setModalAcceptCancellation] = useState<boolean>(false);
  const [modalRejectCancellation, setModalRejectCancellation] = useState<boolean>(false);
  const [manageCancellationType, setManageCancellationType] = useState<string>('');

  const openModalAcceptCancellation = () => {
    setModalAcceptCancellation(true);
    setManageCancellationType('ACCEPT');
  };

  const openModalRejectCancellation = () => {
    setModalRejectCancellation(true);
    setManageCancellationType('REJECT');
  };

  const {
    isLoading: isLoadingManageCancellation,
    mutate: mutateManageCancellation,
    error: errorManageCancellation,
  } = useMutation<{}, ErrorWrapper>(
    ['manage-cancellation'],
    async () =>
      await TransactionService.manageCancellation({
        transactionId: transactionId,
        type: manageCancellationType,
      }),
    {
      onSuccess: () => {
        setModalAcceptCancellation(false);
        setModalRejectCancellation(false);
        refetchTransaction();
      },
    },
  );
  // #endregion

  // #region Cancel Cancellation
  const [modalCancelCancellation, setModalCancelCancellation] = useState<boolean>(false);

  const openModalCancelCancellation = () => {
    setModalCancelCancellation(true);
  };

  const {
    isLoading: isLoadingCancelCancellation,
    mutate: mutateCancelCancellation,
    error: errorCancelCancellation,
  } = useMutation<{}, ErrorWrapper>(
    ['cancel-cancellation'],
    async () =>
      await TransactionService.cancelCancel({
        transactionId: transactionId,
      }),
    {
      onSuccess: () => {
        setModalCancelCancellation(false);
        refetchTransaction();
      },
    },
  );
  // #endregion

  // #region Manage Return
  const [modalAcceptReturn, setModalAcceptReturn] = useState<boolean>(false);
  const [modalRejectReturn, setModalRejectReturn] = useState<boolean>(false);
  const [manageReturnType, setManageReturnType] = useState<string>('');

  const openModalAcceptReturn = () => {
    setModalAcceptReturn(true);
    setManageReturnType('ACCEPT');
  };

  const openModalRejectReturn = () => {
    setModalRejectReturn(true);
    setManageReturnType('REJECT');
  };

  const {
    isLoading: isLoadingManageReturn,
    mutate: mutateManageReturn,
    error: errorManageReturn,
  } = useMutation<{}, ErrorWrapper>(
    ['manage-return'],
    async () =>
      await TransactionService.manageReturn({
        transactionId: transactionId,
        type: manageReturnType,
      }),
    {
      onSuccess: () => {
        setModalAcceptReturn(false);
        setModalRejectReturn(false);
        refetchTransaction();
      },
    },
  );
  // #endregion

  return (
    <>
      {modalRevision && (
        <Popup
          open={true}
          closeOnDocumentClick={false}
          className="popup-activity"
        >
          {isLoadingAskRevision && <Loader type="inline" />}
          {!isLoadingAskRevision && (
            <>
              <div className="flex-column">
                <div className="flex-centered w-100 justify-content-between mb-3">
                  <h3 className="mb-0">Minta revisi</h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setModalRevision(false);
                      setRevisionMessage('');
                    }}
                  >
                    <IconClose />
                  </div>
                </div>

                {errorAskRevision && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorAskRevision?.message}
                      type="danger"
                    />
                  </div>
                )}

                <form onSubmit={handleSubmitRevision(confirmSubmitRevision)}>
                  <div className="mb-4">
                    <p className="mb-2">Berikan alasan untuk revisi yang kamu minta!</p>
                    <FormInput errorMessage={errorsRevision?.revisionMessage?.message}>
                      <Form.Control
                        as="textarea"
                        id="revisionMessage"
                        name="revisionMessage"
                        className="activity-popup-text-area"
                        isInvalid={
                          formStateRevision.touched.revisionMessage === true &&
                          !!errorsRevision.revisionMessage
                        }
                        ref={
                          registerRevision({
                            required: {
                              value: true,
                              message: 'Pesan tidak boleh kosong.',
                            },
                          }) as string & ((ref: Element | null) => void)
                        }
                      ></Form.Control>
                    </FormInput>
                  </div>

                  <Row>
                    <div className="col-12 col-md-6">
                      <div
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setModalRevision(false);
                          setRevisionMessage('');
                        }}
                      >
                        Kembali
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3 mb-md-0 order-first order-md-last">
                      <button
                        type="submit"
                        className="btn btn-danger w-100"
                        disabled={!isValidRevision}
                      >
                        Lanjut
                      </button>
                    </div>
                  </Row>
                </form>
              </div>
            </>
          )}
        </Popup>
      )}
      {modalComplete && (
        <Popup
          open={true}
          closeOnDocumentClick={false}
          className="popup-activity"
        >
          {isLoadingComplete && <Loader type="inline" />}
          {!isLoadingComplete && (
            <>
              <div className="flex-column">
                <div className="flex-centered w-100 justify-content-between mb-3">
                  <h3 className="mb-0">Selesaikan pesanan</h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setModalComplete(false);
                    }}
                  >
                    <IconClose />
                  </div>
                </div>

                {errorComplete && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorComplete?.message}
                      type="danger"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <InfoBox
                    message={
                      'Dengan menyelesaikan pesanan, dana akan diteruskan kepada freelancer!'
                    }
                    type="warning"
                  />
                </div>

                <Row>
                  <div className="col-12 col-md-6">
                    <div
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setModalComplete(false);
                      }}
                    >
                      Kembali
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3 mb-md-0 order-first order-md-last">
                    <div
                      className="btn btn-primary"
                      onClick={() => {
                        mutateComplete();
                      }}
                    >
                      Lanjut
                    </div>
                  </div>
                </Row>
              </div>
            </>
          )}
        </Popup>
      )}
      {modalCancelReturn && (
        <Popup
          open={true}
          closeOnDocumentClick={false}
          className="popup-activity"
        >
          {isLoadingCancelReturn && <Loader type="inline" />}
          {!isLoadingCancelReturn && (
            <>
              <div className="flex-column">
                <div className="flex-centered w-100 justify-content-between mb-3">
                  <h3 className="mb-0">Batalkan ajuan pengembalian</h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setModalCancelReturn(false);
                    }}
                  >
                    <IconClose />
                  </div>
                </div>

                {errorCancelReturn && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorCancelReturn?.message}
                      type="danger"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <InfoBox
                    message={`Kamu hanya dapat mengajukan pengembalian <b>1 kali</b> saja!`}
                    type="warning"
                  />
                </div>

                <Row>
                  <div className="col-12 col-md-6">
                    <div
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setModalCancelReturn(false);
                      }}
                    >
                      Kembali
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3 mb-md-0 order-first order-md-last">
                    <div
                      className="btn btn-primary"
                      onClick={() => {
                        mutateCancelReturn();
                      }}
                    >
                      Lanjut
                    </div>
                  </div>
                </Row>
              </div>
            </>
          )}
        </Popup>
      )}
      {modalCallAdmin && (
        <Popup
          open={true}
          closeOnDocumentClick={false}
          className="popup-activity"
        >
          {isLoadingCallAdmin && <Loader type="inline" />}
          {!isLoadingCallAdmin && (
            <>
              <div className="flex-column">
                <div className="flex-centered w-100 justify-content-between mb-3">
                  <h3 className="mb-0">Hubungi admin</h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setModalCallAdmin(false);
                    }}
                  >
                    <IconClose />
                  </div>
                </div>

                {errorCallAdmin && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorCallAdmin?.message}
                      type="danger"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <InfoBox
                    message={
                      'Admin akan menentukan langkah terbaik untuk merampungkan ketidaksetujuan!'
                    }
                    type="warning"
                  />
                </div>

                <Row>
                  <div className="col-12 col-md-6">
                    <div
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setModalCallAdmin(false);
                      }}
                    >
                      Kembali
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3 mb-md-0 order-first order-md-last">
                    <div
                      className="btn btn-primary"
                      onClick={() => {
                        mutateCallAdmin();
                      }}
                    >
                      Lanjut
                    </div>
                  </div>
                </Row>
              </div>
            </>
          )}
        </Popup>
      )}
      {modalAcceptCancellation && (
        <Popup
          open={true}
          closeOnDocumentClick={false}
          className="popup-activity"
        >
          {isLoadingManageCancellation && <Loader type="inline" />}
          {!isLoadingManageCancellation && (
            <>
              <div className="flex-column">
                <div className="flex-centered w-100 justify-content-between mb-3">
                  <h3 className="mb-0">Terima permintaan pembatalan</h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setModalAcceptCancellation(false);
                      setManageCancellationType('');
                    }}
                  >
                    <IconClose />
                  </div>
                </div>

                {errorManageCancellation && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorManageCancellation?.message}
                      type="danger"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <InfoBox
                    message={'Pesanan akan dibatalkan dan dana akan dikembalikan!'}
                    type="warning"
                  />
                </div>

                <Row>
                  <div className="col-12 col-md-6">
                    <div
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setModalAcceptCancellation(false);
                        setManageCancellationType('');
                      }}
                    >
                      Kembali
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3 mb-md-0 order-first order-md-last">
                    <div
                      className="btn btn-primary"
                      onClick={() => {
                        mutateManageCancellation();
                      }}
                    >
                      Lanjut
                    </div>
                  </div>
                </Row>
              </div>
            </>
          )}
        </Popup>
      )}
      {modalRejectCancellation && (
        <Popup
          open={true}
          closeOnDocumentClick={false}
          className="popup-activity"
        >
          {isLoadingManageCancellation && <Loader type="inline" />}
          {!isLoadingManageCancellation && (
            <>
              <div className="flex-column">
                <div className="flex-centered w-100 justify-content-between mb-3">
                  <h3 className="mb-0">Tolak permintaan pembatalan</h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setModalRejectCancellation(false);
                      setManageCancellationType('');
                    }}
                  >
                    <IconClose />
                  </div>
                </div>

                {errorManageCancellation && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorManageCancellation?.message}
                      type="danger"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <InfoBox
                    message={
                      'Freelancer dapat memilih untuk menghubungi admin atau membatalkan ajuan pembatalan!'
                    }
                    type="warning"
                  />
                </div>

                <Row>
                  <div className="col-12 col-md-6">
                    <div
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setModalRejectCancellation(false);
                        setManageCancellationType('');
                      }}
                    >
                      Kembali
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3 mb-md-0 order-first order-md-last">
                    <div
                      className="btn btn-primary"
                      onClick={() => {
                        mutateManageCancellation();
                      }}
                    >
                      Lanjut
                    </div>
                  </div>
                </Row>
              </div>
            </>
          )}
        </Popup>
      )}
      {modalCancelCancellation && (
        <Popup
          open={true}
          closeOnDocumentClick={false}
          className="popup-activity"
        >
          {isLoadingCancelCancellation && <Loader type="inline" />}
          {!isLoadingCancelCancellation && (
            <>
              <div className="flex-column">
                <div className="flex-centered w-100 justify-content-between mb-3">
                  <h3 className="mb-0">Batalkan ajuan pembatalan</h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setModalCancelCancellation(false);
                    }}
                  >
                    <IconClose />
                  </div>
                </div>

                {errorCancelCancellation && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorCancelCancellation?.message}
                      type="danger"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <InfoBox
                    message={`Kamu hanya dapat mengajukan pembatalan <b>1 kali</b> saja!`}
                    type="warning"
                  />
                </div>

                <Row>
                  <div className="col-12 col-md-6">
                    <div
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setModalCancelCancellation(false);
                      }}
                    >
                      Kembali
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3 mb-md-0 order-first order-md-last">
                    <div
                      className="btn btn-primary"
                      onClick={() => {
                        mutateCancelCancellation();
                      }}
                    >
                      Lanjut
                    </div>
                  </div>
                </Row>
              </div>
            </>
          )}
        </Popup>
      )}
      {modalAcceptReturn && (
        <Popup
          open={true}
          closeOnDocumentClick={false}
          className="popup-activity"
        >
          {isLoadingManageReturn && <Loader type="inline" />}
          {!isLoadingManageReturn && (
            <>
              <div className="flex-column">
                <div className="flex-centered w-100 justify-content-between mb-3">
                  <h3 className="mb-0">Terima permintaan pengembalian</h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setModalAcceptReturn(false);
                      setManageReturnType('');
                    }}
                  >
                    <IconClose />
                  </div>
                </div>

                {errorManageReturn && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorManageReturn?.message}
                      type="danger"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <InfoBox
                    message={'Pesanan akan dibatalkan dan dana akan diteruskan kepada klien!'}
                    type="warning"
                  />
                </div>

                <Row>
                  <div className="col-12 col-md-6">
                    <div
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setModalAcceptReturn(false);
                        setManageReturnType('');
                      }}
                    >
                      Kembali
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3 mb-md-0 order-first order-md-last">
                    <div
                      className="btn btn-primary"
                      onClick={() => {
                        mutateManageReturn();
                      }}
                    >
                      Lanjut
                    </div>
                  </div>
                </Row>
              </div>
            </>
          )}
        </Popup>
      )}
      {modalRejectReturn && (
        <Popup
          open={true}
          closeOnDocumentClick={false}
          className="popup-activity"
        >
          {isLoadingManageReturn && <Loader type="inline" />}
          {!isLoadingManageReturn && (
            <>
              <div className="flex-column">
                <div className="flex-centered w-100 justify-content-between mb-3">
                  <h3 className="mb-0">Tolak permintaan pengembalian</h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setModalRejectReturn(false);
                      setManageReturnType('');
                    }}
                  >
                    <IconClose />
                  </div>
                </div>

                {errorManageReturn && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorManageReturn?.message}
                      type="danger"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <InfoBox
                    message={
                      'Klien dapat memilih untuk menghubungi admin atau membatalkan ajuan pengembalian!'
                    }
                    type="warning"
                  />
                </div>

                <Row>
                  <div className="col-12 col-md-6">
                    <div
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setModalRejectReturn(false);
                        setManageReturnType('');
                      }}
                    >
                      Kembali
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3 mb-md-0 order-first order-md-last">
                    <div
                      className="btn btn-primary"
                      onClick={() => {
                        mutateManageReturn();
                      }}
                    >
                      Lanjut
                    </div>
                  </div>
                </Row>
              </div>
            </>
          )}
        </Popup>
      )}
      <div className="card-sm mb-3 pb-0">
        <p className="mb-3">{activity.timestamp}</p>
        <h4
          className="font-weight-semibold mb-0"
          style={{ paddingBottom: '32px' }}
        >
          {activity.title}
        </h4>

        {activity.files &&
          activity.code === TransactionActivityEnum.MenambahkanFilePendukungDeskripsi && (
            <>
              {activity.files.map((file) => {
                return (
                  <div
                    className="cursor-pointer"
                    style={{ paddingBottom: '32px' }}
                  >
                    <a
                      href={file.downloadUrl}
                      title={file.fileName}
                      download={file.fileName}
                    >
                      <div className="card-sm d-flex flex-row align-items-center justify-content-between">
                        <h4 className="text-primary-dark font-weight-bold">{file.fileName}</h4>
                        <div className="text-primary-dark">
                          <IconDownloadCloud />
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </>
          )}

        {activity.deadlineExtension &&
          activity.code === TransactionActivityEnum.MemintaRevisi &&
          projectType === 'service' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Deadline pengerjaan diperpanjang menjadi <span class="font-weight-bold text-primary-dark">(${activity.deadlineExtension})</span>.`}
              />
            </div>
          )}

        {activity.description && (
          <p
            className="text-grey"
            style={{ whiteSpace: 'pre-wrap', paddingBottom: '32px' }}
          >
            {activity.description}
          </p>
        )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.MenambahkanFilePendukungDeskripsi &&
          userType === 'client' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Jika freelancer tidak mengirimkan hasil pekerjaan sebelum deadline <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span>, maka pesanan akan otomatis dibatalkan dan dana akan dikembalikan ke klien.`}
              />
            </div>
          )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.MenambahkanFilePendukungDeskripsi &&
          userType === 'freelancer' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Jika kamu tidak mengirimkan hasil pekerjaan sebelum deadline <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span>, maka pesanan akan otomatis dibatalkan dan dana akan dikembalikan ke klien.`}
              />
            </div>
          )}

        {activity.files &&
          (activity.code === TransactionActivityEnum.MenambahkanFilePendukung ||
            activity.code === TransactionActivityEnum.MengirimHasil) && (
            <>
              {activity.files.map((file) => {
                return (
                  <div
                    className="cursor-pointer"
                    style={{ paddingBottom: '32px' }}
                  >
                    <a
                      href={file.downloadUrl}
                      title={file.fileName}
                      download={file.fileName}
                    >
                      <div className="card-sm d-flex flex-row align-items-center justify-content-between">
                        <h4 className="text-primary-dark font-weight-bold">{file.fileName}</h4>
                        <div className="text-primary-dark">
                          <IconDownloadCloud />
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </>
          )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.MengirimHasil &&
          userType === 'client' &&
          projectType === 'task' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Selesaikan pesanan dalam waktu 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span> atau pesanan akan otomatis dianggap selesai. Jika revisi diminta, maka deadline tetap tidak akan diperpanjang.`}
              />
            </div>
          )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.MengirimHasil &&
          userType === 'freelancer' &&
          projectType === 'task' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Jika klien tidak menyelesaikan pesanan sebelum 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span>, maka pesanan akan otomatis dianggap selesai. Jika revisi diminta, maka deadline tetap tidak akan diperpanjang.`}
              />
            </div>
          )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.MengirimHasil &&
          userType === 'client' &&
          projectType === 'service' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Selesaikan pesanan dalam waktu 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span> atau pesanan akan otomatis dianggap selesai. Jika revisi diminta, maka deadline akan diperpanjang sesuai durasi sebelumnya.`}
              />
            </div>
          )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.MengirimHasil &&
          userType === 'freelancer' &&
          projectType === 'service' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Jika klien tidak menyelesaikan pesanan sebelum 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span>, maka pesanan akan otomatis dianggap selesai. Jika revisi diminta, maka deadline akan diperpanjang sesuai durasi sebelumnya.`}
              />
            </div>
          )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.Pengembalian &&
          userType === 'client' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Jika freelancer tidak merespon sebelum 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span>, maka pesanan akan otomatis terbatalkan dan dana akan dikembalikan.`}
              />
            </div>
          )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.Pengembalian &&
          userType === 'freelancer' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Jika kamu tidak merespon sebelum 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span>, maka pesanan akan otomatis terbatalkan dan dana akan diteruskan kepada klien.`}
              />
            </div>
          )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.MenolakPengembalian &&
          userType === 'client' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Berikan respon dalam waktu 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span> atau pesanan akan otomatis dianggap selesai.`}
              />
            </div>
          )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.MenolakPengembalian &&
          userType === 'freelancer' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Jika klien tidak merespon sebelum 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span>, maka pesanan akan otomatis dianggap selesai.`}
              />
            </div>
          )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.Pembatalan &&
          userType === 'client' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Berikan respon dalam waktu 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span> atau pesanan akan otomatis dibatalkan dan dana akan dikembalikan.`}
              />
            </div>
          )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.Pembatalan &&
          userType === 'freelancer' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Jika klien tidak merespon sebelum 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span>, maka pesanan akan otomatis dibatalkan dan dana akan diteruskan kepada klien.`}
              />
            </div>
          )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.MenolakPembatalan &&
          userType === 'client' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Jika freelancer tidak merespon sebelum 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span>, maka pesanan akan otomatis dilanjutkan.`}
              />
            </div>
          )}

        {activity.responseDeadline &&
          activity.code === TransactionActivityEnum.MenolakPembatalan &&
          userType === 'freelancer' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Jika kamu tidak merespon sebelum 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span>, maka pesanan akan otomatis dilanjutkan.`}
              />
            </div>
          )}

        {activity.buttons && (
          <Row
            style={{ paddingBottom: '32px' }}
            className="justify-content-end"
          >
            {activity.buttons.map((button) => {
              return (
                <div className="col-12 col-md-6 mb-4 mb-md-0">
                  {button.code === TransactionActivityButtonsEnum.SelesaikanPesanan && (
                    <div
                      className="btn btn-primary"
                      onClick={openModalComplete}
                    >
                      {button.name}
                    </div>
                  )}
                  {button.code === TransactionActivityButtonsEnum.MintaRevisi && (
                    <div
                      className="btn btn-danger"
                      onClick={openModalRevision}
                    >
                      {button.name}
                    </div>
                  )}
                  {button.code === TransactionActivityButtonsEnum.BatalkanPengembalian && (
                    <div
                      className="btn btn-primary"
                      onClick={openModalCancelReturn}
                    >
                      {button.name}
                    </div>
                  )}
                  {button.code === TransactionActivityButtonsEnum.HubungiAdmin && (
                    <div
                      className="btn btn-outline-primary"
                      onClick={openModalCallAdmin}
                    >
                      {button.name}
                    </div>
                  )}
                  {button.code === TransactionActivityButtonsEnum.TolakPembatalan && (
                    <div
                      className="btn btn-danger"
                      onClick={openModalRejectCancellation}
                    >
                      {button.name}
                    </div>
                  )}
                  {button.code === TransactionActivityButtonsEnum.TerimaPembatalan && (
                    <div
                      className="btn btn-primary"
                      onClick={openModalAcceptCancellation}
                    >
                      {button.name}
                    </div>
                  )}
                  {button.code === TransactionActivityButtonsEnum.BatalkanPembatalan && (
                    <div
                      className="btn btn-primary"
                      onClick={openModalCancelCancellation}
                    >
                      {button.name}
                    </div>
                  )}
                  {button.code === TransactionActivityButtonsEnum.TolakPengembalian && (
                    <div
                      className="btn btn-danger"
                      onClick={openModalRejectReturn}
                    >
                      {button.name}
                    </div>
                  )}
                  {button.code === TransactionActivityButtonsEnum.TerimaPengembalian && (
                    <div
                      className="btn btn-primary"
                      onClick={openModalAcceptReturn}
                    >
                      {button.name}
                    </div>
                  )}
                </div>
              );
            })}
          </Row>
        )}
      </div>
    </>
  );
};

export default TransactionActivity;
