import { ErrorWrapper, TaskInquiryTaskDetailOutput } from 'models';
import React from 'react';
import { useQuery } from 'react-query';
import { TaskService } from 'services';
import { Image, Row } from 'react-bootstrap';

import { Footer, Header, InfoBox, InlineRetryError, Loader, TitleBanner } from 'shared/components';
import { useParams } from 'react-router-dom';
import { IconCheckmarkCircle, IconChevronLeft, IconClock, IconCrossCircle, IconStar } from 'images';
import { formatCurrency } from 'utils';

const TaskDetail: React.FC = () => {
  const params = useParams<{ taskId: string }>();
  const {
    data: taskDetail,
    isLoading: isLoadingTaskDetail,
    refetch: refetchTaskDetail,
    error: errorTaskDetail,
  } = useQuery<TaskInquiryTaskDetailOutput, ErrorWrapper>(
    ['inquiry-task-detail', params.taskId],
    async () => await TaskService.inquiryTaskDetail(params.taskId),
  );

  return (
    <>
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Detail Tugas'} />
        <Row className="justify-content-center">
          <div className="col-10">
            <div
              className="text-primary-dark flex-centered justify-content-start cursor-pointer mb-4"
              onClick={() => {
                window.location.href = '/task/search';
              }}
            >
              <div className="mr-3">
                <IconChevronLeft />
              </div>
              <p className="cursor-pointer">Kembali</p>
            </div>
            {isLoadingTaskDetail && <Loader type="inline" />}
            {errorTaskDetail && (
              <div className="flex-centered">
                <InlineRetryError
                  message={errorTaskDetail.message}
                  onRetry={refetchTaskDetail}
                />
              </div>
            )}
            {taskDetail && (
              <>
                <Row className="mb-5">
                  <div className="col-12 col-lg-8">
                    <div>
                      <h3 className="mb-3">{taskDetail.taskDetail.name}</h3>
                      <div className="d-flex flex-row flex-wrap">
                        {taskDetail.taskDetail.tags.map((tag) => {
                          return (
                            <div
                              key={tag}
                              className="chip chip-primary mr-2 mb-3"
                            >
                              {tag}
                            </div>
                          );
                        })}
                      </div>
                      <div className="d-flex flex-row align-items-center mb-5">
                        <div className="text-primary-dark mr-2">
                          <IconClock />
                        </div>
                        <p className="text-grey">Deadline {taskDetail.taskDetail.dueDate}</p>
                      </div>

                      <div className="card-sm mb-5 d-block d-lg-none">
                        <p className="text-grey mb-1">Tingkat Kesulitan</p>
                        <h3 className="text-primary-dark">{taskDetail.taskDetail.difficulty}</h3>
                        <div className="d-flex justify-content-end">
                          <h3 className="text-primary-dark mb-3">
                            Rp {formatCurrency(taskDetail.taskDetail.price)}
                          </h3>
                        </div>
                        <div className="btn btn-primary w-100">Daftar untuk Mengerjakan</div>
                      </div>

                      <div className="mb-5 d-block d-lg-none">
                        <h4 className="font-weight-semibold mb-3">
                          Freelancer yang sudah mendaftar
                        </h4>
                        <div className="card-sm">
                          {taskDetail.registeredFreelancer?.map((freelancer) => {
                            return (
                              <div className="d-flex flex-row align-items-center mb-4">
                                <Image
                                  className="service-detail-freelancer-profile-image mr-4"
                                  src={freelancer.profileImageUrl}
                                  alt={freelancer.name}
                                />
                                <h4 className="font-weight-semibold mb-0 text-primary-dark">
                                  {freelancer.name}
                                </h4>
                              </div>
                            );
                          })}
                          {!taskDetail.registeredFreelancer && (
                            <InfoBox message={'Belum ada freelancer yang mendaftar'} />
                          )}
                        </div>
                      </div>

                      <h4 className="font-weight-semibold mb-3">Deskripsi Tugas</h4>
                      <p
                        className="mb-5"
                        dangerouslySetInnerHTML={{
                          __html: taskDetail.taskDetail.description,
                        }}
                      ></p>
                    </div>

                    <div className="mb-5 mb-lg-0">
                      <h4 className="font-weight-semibold mb-3">Klien</h4>
                      <div className="card-sm">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <Image
                              className="service-detail-freelancer-profile-image mr-4"
                              src={taskDetail.client.profileImageUrl}
                              alt={taskDetail.client.name}
                            />
                            <h4 className="font-weight-semibold mb-0">{taskDetail.client.name}</h4>
                          </div>
                          <div className="btn btn-primary">Lihat Profil</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-4">
                    <div className="card-sm mb-5 d-none d-lg-block">
                      <p className="text-grey mb-1">Tingkat Kesulitan</p>
                      <h3 className="text-primary-dark">{taskDetail.taskDetail.difficulty}</h3>
                      <div className="d-flex justify-content-end">
                        <h3 className="text-primary-dark mb-3">
                          Rp {formatCurrency(taskDetail.taskDetail.price)}
                        </h3>
                      </div>
                      <div className="btn btn-primary w-100">Daftar untuk Mengerjakan</div>
                    </div>

                    <div className="mb-5 d-none d-lg-block">
                      <h4 className="font-weight-semibold mb-3">Freelancer yang sudah mendaftar</h4>
                      <div className="card-sm">
                        {taskDetail.registeredFreelancer?.map((freelancer) => {
                          return (
                            <div className="d-flex flex-row align-items-center mb-4">
                              <Image
                                className="service-detail-freelancer-profile-image mr-4"
                                src={freelancer.profileImageUrl}
                                alt={freelancer.name}
                              />
                              <h4 className="font-weight-semibold mb-0 text-primary-dark">
                                {freelancer.name}
                              </h4>
                            </div>
                          );
                        })}
                        {!taskDetail.registeredFreelancer && (
                          <InfoBox message={'Belum ada freelancer yang mendaftar'} />
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-weight-semibold mb-3">Ulasan untuk klien</h4>
                      <div className="card-sm">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex flex-row align-items-center">
                            <h2 className="mr-2 mb-0">{taskDetail.review.averageRating}</h2>
                            <div className="text-warning">
                              <IconStar />
                            </div>
                          </div>
                          <p>{taskDetail.review.ratingAmount} ulasan</p>
                        </div>
                        <hr />
                        <div
                          className="overflow-auto"
                          style={taskDetail.review.reviewList ? { height: '70rem' } : {}}
                        >
                          {taskDetail.review.reviewList?.map((review) => {
                            return (
                              <div className="mb-3">
                                <p className="font-weight-bold">{review.name}</p>
                                <div className="d-flex flex-row mb-2">
                                  {Array(review.star)
                                    .fill(null)
                                    .map(() => {
                                      return (
                                        <div className="text-warning">
                                          <IconStar />
                                        </div>
                                      );
                                    })}
                                </div>
                                <small className="d-block mb-2">{review.description}</small>
                                <small className="d-block text-muted">{review.timestamp}</small>
                              </div>
                            );
                          })}
                          {!taskDetail.review.reviewList && (
                            <InfoBox message={'Belum ada review'} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
              </>
            )}
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default TaskDetail;
