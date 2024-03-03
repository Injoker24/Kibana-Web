import { TransactionActivityButtonsEnum, TransactionActivityEnum } from 'enums';
import { IconDownloadCloud } from 'images';
import React from 'react';
import InfoBox from '../info-box';
import { Row } from 'react-bootstrap';

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
}

const TransactionActivity: React.FC<Props> = ({ userType, projectType, activity }) => {
  return (
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
                  <div className="btn btn-danger">{button.name}</div>
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
  );
};

export default TransactionActivity;
