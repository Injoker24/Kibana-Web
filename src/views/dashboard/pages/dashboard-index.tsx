import {
  IconCreateTaskService,
  IconHistoryTaskService,
  IconMyTaskService,
  IconSearchTaskService,
  heroIllustration,
  DefaultAvatar,
} from 'images';
import {
  ErrorWrapper,
  ServiceInquiryCategoryOutput,
  ServiceInquiryNewServiceOutput,
  TaskInquiryCategoryOutput,
  TaskInquiryNewTaskOutput,
} from 'models';
import React, { useEffect, useState } from 'react';

import { Image, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { ServiceService, TaskService } from 'services';
import { Service, Task, Loader, Header, Footer, InlineRetryError } from 'shared/components';
import { getLocalStorage } from 'utils';

const DashboardIndex: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [status, setStatus] = useState();
  const [userData, setUserData] = useState<{
    name: string;
    username: string;
    profileImageUrl?: string;
  }>();

  useEffect(() => {
    document.body.scrollTo(0, 0);
    setStatus(getLocalStorage('status'));
    setUserData({
      name: getLocalStorage('name'),
      username: getLocalStorage('username'),
      profileImageUrl: getLocalStorage('profileImageUrl'),
    });
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

  const {
    data: taskCategory,
    isLoading: isLoadingTaskCategory,
    refetch: refetchTaskCategory,
    error: errorTaskCategory,
  } = useQuery<TaskInquiryCategoryOutput, ErrorWrapper>(
    ['inquiry-task-category'],
    async () => await TaskService.inquiryCategory(),
  );

  const {
    data: newTask,
    isLoading: isLoadingNewTask,
    refetch: refetchNewTask,
    error: errorNewTask,
  } = useQuery<TaskInquiryNewTaskOutput, ErrorWrapper>(
    ['inquiry-new-task'],
    async () => await TaskService.inquiryNewTask(),
  );

  const {
    data: newService,
    isLoading: isLoadingNewService,
    refetch: refetchNewService,
    error: errorNewService,
  } = useQuery<ServiceInquiryNewServiceOutput, ErrorWrapper>(
    ['inquiry-new-service'],
    async () => await ServiceService.inquiryNewService(),
  );

  const openDetailServiceCategory = (id: string, name: string) => {
    history.push({
      pathname: '/service/category/',
      state: {
        stateId: id,
        stateName: name,
      },
    });
  };

  const openDetailTaskCategory = (id: string, name: string) => {
    history.push({
      pathname: '/task/category/',
      state: {
        stateId: id,
        stateName: name,
      },
    });
  };

  return (
    <>
      <Header />
      <div className="min-layout-height">
        {/* Hero */}
        {!status && (
          <div className="bg-primary text-light py-3 py-md-5 mb-5 justify-content-center form-row">
            <div className="d-flex flex-row my-5 justify-content-center justify-content-md-between col-10">
              <div
                className="mr-md-5 align-self-center"
                style={{ maxWidth: '25rem' }}
              >
                <Image
                  className="d-block d-md-none mb-4"
                  src={heroIllustration}
                  alt="hero-illustration"
                />
                <h2 className="mb-3">Pekerjaanmu terlalu sulit? Kita Bantu Anda!</h2>
                <h4 className="mb-4">
                  Dapatkan bantuan terbaik disini. Tidak perlu mencari kesana kemari.
                </h4>
                <button className="btn btn-secondary">Pelajari Lebih Lanjut</button>
              </div>
              <Image
                className="d-none d-md-block"
                src={heroIllustration}
                alt="hero-illustration"
              />
            </div>
          </div>
        )}

        {status && userData && (
          <Row className="justify-content-center my-5">
            <div className="col-10">
              <div className="card-sm">
                <div className="d-flex flex-row justify-content-between flex-wrap">
                  <div className="col-12 col-lg-5 pr-lg-5 p-0 mb-4 mb-lg-0">
                    <div className="d-flex flex-row align-items-center dashboard-border-card h-100 flex-wrap">
                      <div className="col-12 col-xl-9">
                        <div className="d-flex flex-row align-items-center mr-0 mr-xl-3 mb-3 mb-xl-0">
                          <Image
                            className="dashboard-profile-image mr-4"
                            src={
                              userData.profileImageUrl ? userData.profileImageUrl : DefaultAvatar
                            }
                            alt={userData.name}
                          />
                          <div>
                            <h4 className="font-weight-bold mb-0">{userData.name}</h4>
                            <p className="text-muted">@{userData.username}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 text-center text-xl-right">
                        <a
                          className="text-primary"
                          href="/account/my/profile"
                        >
                          Lihat Profil
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-7 p-0">
                    <div className="d-flex flex-row flex-wrap">
                      <div
                        className="col-6 col-md-3 p-0 pr-3 mb-3 mb-md-0"
                        onClick={() => {
                          if (status === 'client') {
                            history.push({
                              pathname: '/task/create',
                            });
                          } else if (status === 'freelancer') {
                            history.push({
                              pathname: '/service/create',
                            });
                          }
                        }}
                      >
                        <div className="dashboard-border-card flex-centered flex-column cursor-pointer h-100">
                          <div
                            className={
                              status === 'client' ? 'text-primary-dark' : 'text-secondary-dark'
                            }
                          >
                            <IconCreateTaskService />
                          </div>
                          <p className="text-center">
                            {status === 'client' ? 'Buat Tugas' : 'Buat Layanan'}
                          </p>
                        </div>
                      </div>
                      <div
                        className="col-6 col-md-3 p-0 pr-md-3 pl-3 pl-md-0 mb-3 mb-md-0"
                        onClick={() => {
                          if (status === 'client') {
                            history.push({
                              pathname: '/task/owned',
                            });
                          } else if (status === 'freelancer') {
                            history.push({
                              pathname: '/service/owned',
                            });
                          }
                        }}
                      >
                        <div className="dashboard-border-card flex-centered flex-column cursor-pointer h-100">
                          <div
                            className={
                              status === 'client' ? 'text-primary-dark' : 'text-secondary-dark'
                            }
                          >
                            <IconMyTaskService />
                          </div>
                          <p className="text-center">
                            {status === 'client' ? 'Tugas Saya' : 'Layanan Saya'}
                          </p>
                        </div>
                      </div>
                      <div
                        className="col-6 col-md-3 p-0 pr-3"
                        onClick={() => {
                          if (status === 'client') {
                            history.push({
                              pathname: '/service/history',
                            });
                          } else if (status === 'freelancer') {
                            history.push({
                              pathname: '/task/history',
                            });
                          }
                        }}
                      >
                        <div className="dashboard-border-card flex-centered flex-column cursor-pointer h-100">
                          <div
                            className={
                              status === 'client' ? 'text-primary-dark' : 'text-secondary-dark'
                            }
                          >
                            <IconHistoryTaskService />
                          </div>
                          <p className="text-center">
                            {status === 'client' ? 'Riwayat Layanan' : 'Riwayat Tugas'}
                          </p>
                        </div>
                      </div>
                      <div
                        className="col-6 col-md-3 p-0 pl-3 pl-md-0"
                        onClick={() => {
                          if (status === 'client') {
                            history.push({
                              pathname: '/service/search',
                            });
                          } else {
                            history.push({
                              pathname: '/task/search',
                            });
                          }
                        }}
                      >
                        <div className="dashboard-border-card flex-centered flex-column cursor-pointer h-100">
                          <div
                            className={
                              status === 'client' ? 'text-primary-dark' : 'text-secondary-dark'
                            }
                          >
                            <IconSearchTaskService />
                          </div>
                          <p className="text-center">
                            {status === 'client' ? 'Cari Layanan' : 'Cari Tugas'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        )}

        {/* Service Category */}
        {status !== 'freelancer' && (
          <Row className="justify-content-center mb-5">
            <div className="col-10">
              <h3 className="mb-3">Cari layanan berdasarkan kategori</h3>
              {errorServiceCategory && (
                <div className="flex-centered">
                  <InlineRetryError
                    message={errorServiceCategory.message}
                    onRetry={refetchServiceCategory}
                  />
                </div>
              )}
              <Row className="service-category-list-container">
                {isLoadingServiceCategory && <Loader type="inline" />}
                {serviceCategory &&
                  serviceCategory.categories.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="card-sm d-flex flex-row p-0 m-3 cursor-pointer"
                        style={{ minWidth: '20rem' }}
                        onClick={() => openDetailServiceCategory(item.id, item.name)}
                      >
                        <div className="p-3 align-self-end w-100">
                          <p className="font-weight-semibold text-right cursor-pointer">
                            {item.name}
                          </p>
                          <p className="text-right cursor-pointer">
                            <small>{item.serviceAmount} layanan</small>
                          </p>
                        </div>
                        <Image
                          className="service-category-image"
                          src={item.imageUrl}
                          alt={item.name}
                        />
                      </div>
                    );
                  })}
              </Row>
            </div>
          </Row>
        )}

        {/* Task Category */}
        {status === 'freelancer' && (
          <Row className="justify-content-center mb-5">
            <div className="col-10">
              <h3 className="mb-3">Cari tugas berdasarkan kategori</h3>
              {errorTaskCategory && (
                <div className="flex-centered">
                  <InlineRetryError
                    message={errorTaskCategory.message}
                    onRetry={refetchTaskCategory}
                  />
                </div>
              )}
              <Row className="service-category-list-container">
                {isLoadingTaskCategory && <Loader type="inline" />}
                {taskCategory &&
                  taskCategory.categories.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="card-sm d-flex flex-row p-0 m-3 cursor-pointer"
                        style={{ minWidth: '20rem' }}
                        onClick={() => openDetailTaskCategory(item.id, item.name)}
                      >
                        <div className="p-3 align-self-end w-100">
                          <p className="font-weight-semibold text-right cursor-pointer">
                            {item.name}
                          </p>
                          <p className="text-right cursor-pointer">
                            <small>{item.taskAmount} tugas</small>
                          </p>
                        </div>
                        <Image
                          className="service-category-image"
                          src={item.imageUrl}
                          alt={item.name}
                        />
                      </div>
                    );
                  })}
              </Row>
            </div>
          </Row>
        )}

        {/* Tutorial */}
        {!status && (
          <div className="bg-primary-light py-3 justify-content-center form-row mb-5">
            <div className="form-row my-5 col-10">
              <div className="align-self-center col-12 col-lg-4 mb-5 mb-lg-0 pr-3">
                <h3 className="mb-3">Tidak ada waktu untuk mencari freelancer yang cocok?</h3>
                <p className="mb-4">Tunggu mereka yang menghubungi kamu terlebih dahulu.</p>
                <button className="btn btn-primary">Mulai Sekarang</button>
              </div>
              <div className="d-flex flex-row col-12 col-lg-8 justify-content-lg-end flex-wrap">
                <div
                  className="d-flex align-items-center flex-column col-6 col-md-3 mb-3 mb-md-0"
                  style={{ width: '10rem' }}
                >
                  <div
                    className="rounded-circle shadow-sm flex-centered bg-light mb-3"
                    style={{ width: '7rem', height: '7rem' }}
                  >
                    <h1 className="text-primary-dark m-0">1</h1>
                  </div>
                  <p className="text-center">Posting pekerjaan kamu.</p>
                </div>
                <div
                  className="d-flex align-items-center flex-column col-6 col-md-3 mb-3 mb-md-0"
                  style={{ width: '10rem' }}
                >
                  <div
                    className="rounded-circle shadow-sm flex-centered bg-light mb-3"
                    style={{ width: '7rem', height: '7rem' }}
                  >
                    <h1 className="text-primary-dark m-0">2</h1>
                  </div>
                  <p className="text-center">Tunggu tawaran dari freelancer.</p>
                </div>
                <div
                  className="d-flex align-items-center flex-column col-6 col-md-3"
                  style={{ width: '10rem' }}
                >
                  <div
                    className="rounded-circle shadow-sm flex-centered bg-light mb-3"
                    style={{ width: '7rem', height: '7rem' }}
                  >
                    <h1 className="text-primary-dark m-0">3</h1>
                  </div>
                  <p className="text-center">Pilih berdasarkan CV & Portfolio.</p>
                </div>
                <div
                  className="d-flex align-items-center flex-column col-6 col-md-3"
                  style={{ width: '10rem' }}
                >
                  <div
                    className="rounded-circle shadow-sm flex-centered bg-light mb-3"
                    style={{ width: '7rem', height: '7rem' }}
                  >
                    <h1 className="text-primary-dark m-0">4</h1>
                  </div>
                  <p className="text-center">Tunggu pekerjaan kamu selesai.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Task */}
        <Row className="justify-content-center mb-5">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">Tugas baru</h3>
              <a
                href="/task/search"
                className="text-primary text-align-center"
              >
                Lihat Semua
              </a>
            </div>
            {errorNewTask && (
              <div className="flex-centered">
                <InlineRetryError
                  message={errorNewTask.message}
                  onRetry={refetchNewTask}
                />
              </div>
            )}
            <Row>
              {isLoadingNewTask && <Loader type="inline" />}
              {newTask &&
                newTask.tasks.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="col-lg-6 col-12 py-3 cursor-pointer"
                      onClick={() => {
                        history.push({
                          pathname: '/task/' + item.id,
                          state: {
                            prevPath: location.pathname,
                          },
                        });
                      }}
                    >
                      <Task
                        name={item.name}
                        description={item.description}
                        tags={item.tags}
                        dueDate={item.dueDate}
                        difficulty={item.difficulty}
                        price={item.price}
                      />
                    </div>
                  );
                })}
            </Row>
          </div>
        </Row>

        {/* New Service */}
        <Row className="justify-content-center mb-5">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">Layanan baru</h3>
              <a
                href="/service/search"
                className="text-primary text-align-center"
              >
                Lihat Semua
              </a>
            </div>
            {errorNewService && (
              <div className="flex-centered">
                <InlineRetryError
                  message={errorNewService.message}
                  onRetry={refetchNewService}
                />
              </div>
            )}
            <Row>
              {isLoadingNewService && <Loader type="inline" />}
              {newService &&
                newService.services.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="col-xl-3 col-md-6 col-12 py-3 cursor-pointer"
                      onClick={() => {
                        history.push({
                          pathname: '/service/' + item.id,
                          state: {
                            prevPath: location.pathname,
                          },
                        });
                      }}
                    >
                      <Service
                        imageUrl={item.imageUrl}
                        name={item.name}
                        freelancer={item.freelancer}
                        averageRating={item.averageRating}
                        ratingAmount={item.ratingAmount}
                        tags={item.tags}
                        price={item.price}
                        workingTime={item.workingTime}
                      />
                    </div>
                  );
                })}
            </Row>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default DashboardIndex;
