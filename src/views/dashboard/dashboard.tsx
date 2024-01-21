import { heroIllustration } from 'images';
import { DashboardInquiryNewServiceOutput, DashboardInquiryNewTaskOutput, DashboardInquiryServiceCategoryListOutput, ErrorWrapper } from 'models';
import React from 'react';

import { Image, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { DashboardService } from 'services';
import { Service, Task, Loader } from 'shared/components';

const Dashboard: React.FC = () => {
  const { data: serviceCategoryList, isLoading: isLoadingServiceCategoryList } = useQuery<DashboardInquiryServiceCategoryListOutput, ErrorWrapper>(
    ['inquiry-service-category-list'],
    async () => await DashboardService.inquiryServiceCategoryList(),
  );

  const { data: newTask, isLoading: isLoadingNewTask } = useQuery<DashboardInquiryNewTaskOutput, ErrorWrapper>(
    ['inquiry-new-task'],
    async () => await DashboardService.inquiryNewTask(),
  );

  const { data: newService, isLoading: isLoadingNewService } = useQuery<DashboardInquiryNewServiceOutput, ErrorWrapper>(
    ['inquiry-new-service'],
    async () => await DashboardService.inquiryNewService(),
  );

  return (
    <>
      {/* Hero */}
      <div className="bg-primary text-light py-3 py-md-5 mb-5 justify-content-center form-row">
        <div className="d-flex flex-row my-5 justify-content-center justify-content-md-between col-10">
          <div className="mr-md-5 align-self-center" style={{ maxWidth: '25rem' }}>
            <Image className="d-block d-md-none mb-4" src={heroIllustration} alt="hero-illustration" />
            <h2 className="mb-3">Pekerjaanmu terlalu sulit? Kita Bantu Anda!</h2>
            <h4 className="mb-4">Dapatkan bantuan terbaik disini. Tidak perlu mencari kesana kemari.</h4>
            <button className="btn btn-secondary">Pelajari Lebih Lanjut</button>
          </div>
          <Image className="d-none d-md-block" src={heroIllustration} alt="hero-illustration" />
        </div>
      </div>

      {/* Service Category */}
      <Row className="justify-content-center mb-5">
        <div className="col-10">
          <h3 className="mb-3">Cari layanan berdasarkan kategori</h3>
          <Row className="service-category-list-container">
            {isLoadingServiceCategoryList && <Loader type="inline" />}
            {serviceCategoryList && serviceCategoryList.categories.map((item) => {
              return (
                <div key={item.id} className="card-sm d-flex flex-row p-0 m-3" style={{ minWidth: "20rem" }}>
                  <div className="p-3 align-self-end w-100">
                    <p className="font-weight-semibold text-right">{item.name}</p>
                    <p className="text-right"><small>{item.serviceAmount} layanan</small></p>
                  </div>
                  <Image className="service-category-image" src={item.imageUrl} alt={item.name} />
                </div>
              );
            })}
          </Row>
        </div>
      </Row>

      {/* Tutorial */}
      <div className="bg-primary-light py-3 justify-content-center form-row mb-5">
        <div className="form-row my-5 col-10">
          <div className="align-self-center col-12 col-lg-4 mb-5 mb-lg-0 pr-3">
            <h3 className="mb-3">Tidak ada waktu untuk mencari freelancer yang cocok?</h3>
            <p className="mb-4">Tunggu mereka yang menghubungi anda terlebih dahulu.</p>
            <button className="btn btn-primary">Mulai Sekarang</button>
          </div>
          <div className="d-flex flex-row col-12 col-lg-8 justify-content-lg-end flex-wrap">
            <div className="d-flex align-items-center flex-column col-6 col-md-3 mb-3 mb-md-0" style={{ width: '10rem'}}>
              <div className="rounded-circle shadow-sm flex-centered bg-light mb-3" style={{ width: "7rem", height: "7rem"}}>
                <h1 className="text-primary-dark m-0">1</h1>
              </div>
              <p className="text-center">Posting pekerjaan anda.</p>
            </div>
            <div className="d-flex align-items-center flex-column col-6 col-md-3 mb-3 mb-md-0" style={{ width: '10rem'}}>
              <div className="rounded-circle shadow-sm flex-centered bg-light mb-3" style={{ width: "7rem", height: "7rem"}}>
                <h1 className="text-primary-dark m-0">2</h1>
              </div>
              <p className="text-center">Tunggu tawaran dari freelancer.</p>
            </div>
            <div className="d-flex align-items-center flex-column col-6 col-md-3" style={{ width: '10rem'}}>
              <div className="rounded-circle shadow-sm flex-centered bg-light mb-3" style={{ width: "7rem", height: "7rem"}}>
                <h1 className="text-primary-dark m-0">3</h1>
              </div>
              <p className="text-center">Pilih berdasarkan CV & Portfolio.</p>
            </div>
            <div className="d-flex align-items-center flex-column col-6 col-md-3" style={{ width: '10rem'}}>
              <div className="rounded-circle shadow-sm flex-centered bg-light mb-3" style={{ width: "7rem", height: "7rem"}}>
                <h1 className="text-primary-dark m-0">4</h1>
              </div>
              <p className="text-center">Tunggu pekerjaan anda selesai.</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Task */}
      <Row className="justify-content-center mb-5">
        <div className="col-10">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0">Tugas baru</h3>
            <a href="" className="text-primary text-align-center">Lihat Semua</a>
          </div>
          <Row>
            {isLoadingNewTask && <Loader type="inline" />}
            {newTask && newTask.tasks.map((item) => {
              return (
                <div key={item.id} className="col-lg-6 col-12 py-3">
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
            <a href="" className="text-primary text-align-center">Lihat Semua</a>
          </div>
          <Row>
            {isLoadingNewService && <Loader type="inline" />}
            {newService && newService.services.map((item) => {
              return (
                <div key={item.id} className="col-xl-3 col-md-6 col-12 py-3">
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
    </>
  );
};

export default Dashboard;
