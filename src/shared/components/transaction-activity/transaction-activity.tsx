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
      id: string;
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
                    <div className="card-sm d-flex flex-row align-items-center justify-content-between">
                      <h4 className="text-primary-dark font-weight-bold">{file.fileName}</h4>
                      <div className="text-primary-dark">
                        <IconDownloadCloud />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
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
                    <div className="card-sm d-flex flex-row align-items-center justify-content-between">
                      <h4 className="text-primary-dark font-weight-bold">{file.fileName}</h4>
                      <div className="text-primary-dark">
                        <IconDownloadCloud />
                      </div>
                    </div>
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
          activity.code === TransactionActivityEnum.Pengembalian &&
          userType === 'client' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Jika freelancer tidak merespon sebelum 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span>, maka pesanan akan otomatis terbatalkan dan dana akan dikembalikan.`}
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
          activity.code === TransactionActivityEnum.Pembatalan &&
          userType === 'client' && (
            <div style={{ paddingBottom: '32px' }}>
              <InfoBox
                message={`Berikan respon dalam waktu 2x24 jam <span class="font-weight-bold text-primary-dark">(${activity.responseDeadline})</span> atau pesanan akan otomatis dibatalkan dan dana akan dikembalikan.`}
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

        {activity.buttons && (
          <Row
            style={{ paddingBottom: '32px' }}
            className="justify-content-end"
          >
            {activity.buttons.map((button) => {
              return (
                <div className="col-12 col-md-6 mb-4 mb-md-0">
                  {button.code === TransactionActivityButtonsEnum.SelesaikanPesanan && (
                    <div className="btn btn-primary">{button.name}</div>
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
                    <div className="btn btn-primary">{button.name}</div>
                  )}
                  {button.code === TransactionActivityButtonsEnum.HubungiAdmin && (
                    <div className="btn btn-outline-primary">{button.name}</div>
                  )}
                  {button.code === TransactionActivityButtonsEnum.TolakPembatalan && (
                    <div className="btn btn-danger">{button.name}</div>
                  )}
                  {button.code === TransactionActivityButtonsEnum.TerimaPembatalan && (
                    <div className="btn btn-primary">{button.name}</div>
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
