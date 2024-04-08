import { ErrorWrapper, TaskInquiryDetailSubCategoryOutput, TaskInquiryNewTaskOutput } from 'models';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { TaskService } from 'services';
import { Image, Row } from 'react-bootstrap';

import {
  Footer,
  Header,
  InfoBox,
  InlineRetryError,
  Loader,
  Task,
  TitleBanner,
} from 'shared/components';
import { IconChevronLeft, IconNextCircle } from 'images';
import { useHistory, useLocation } from 'react-router-dom';

const TaskCategoryDetail = ({ title, id, onBack }: any) => {
  const history = useHistory();
  const location = useLocation();
  const {
    data: newTask,
    isLoading: isLoadingNewTask,
    refetch: refetchNewTask,
    error: errorNewTask,
  } = useQuery<TaskInquiryNewTaskOutput, ErrorWrapper>(
    ['inquiry-new-task-category', id],
    async () => await TaskService.inquiryNewTask(id),
  );

  const {
    data: subCategoryDetail,
    isLoading: isLoadingSubCategoryDetail,
    refetch: refetchSubCategoryDetail,
    error: errorSubCategoryDetail,
  } = useQuery<TaskInquiryDetailSubCategoryOutput, ErrorWrapper>(
    ['inquiry-task-sub-category-detail', id],
    async () => await TaskService.inquiryDetailSubCategory(id),
  );

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  const openTaskList = () => {
    const idArray = subCategoryDetail?.subCategories.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });

    history.push({
      pathname: '/task/search',
      state: {
        stateCategories: idArray,
      },
    });
  };

  const openTaskListDetail = (id: string, name: string) => {
    history.push({
      pathname: '/task/search',
      state: {
        stateCategories: [
          {
            id: id,
            name: name,
          },
        ],
      },
    });
  };

  return (
    <>
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={title} />
        <Row className="justify-content-center mb-4">
          <div
            className="col-10 text-primary-dark flex-centered justify-content-start cursor-pointer"
            onClick={onBack}
          >
            <div className="mr-3">
              <IconChevronLeft />
            </div>
            <p className="cursor-pointer">Kembali</p>
          </div>
        </Row>
        <Row className="justify-content-center mb-5">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">Tugas {title.toLowerCase()} baru</h3>
              <div
                onClick={() => openTaskList()}
                className="text-primary-dark text-align-center text-nowrap cursor-pointer"
              >
                Lihat Semua
              </div>
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
                      className="col-md-6 col-12 py-3 cursor-pointer"
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
              {newTask?.tasks.length === 0 && (
                <div className="col-12">
                  <InfoBox message="Belum ada tugas di kategori ini!" />
                </div>
              )}
            </Row>
          </div>
        </Row>
        <Row className="justify-content-center mb-5">
          <div className="col-10">
            <h3 className="mb-3">Jenis tugas yang tersedia</h3>
            {errorSubCategoryDetail && (
              <div className="flex-centered">
                <InlineRetryError
                  message={errorSubCategoryDetail.message}
                  onRetry={refetchSubCategoryDetail}
                />
              </div>
            )}
            <Row className="justify-content-center">
              {isLoadingSubCategoryDetail && <Loader type="inline" />}
              {subCategoryDetail &&
                subCategoryDetail.subCategories.map((item) => {
                  return (
                    <Row
                      key={item.id}
                      className="col-12"
                    >
                      <div
                        className="cursor-pointer card-sm d-flex flex-row flex-wrap align-items-center p-2 mb-3"
                        onClick={() => openTaskListDetail(item.id, item.name)}
                      >
                        <Image
                          className="rounded col-12 col-md-4 py-3"
                          src={item.imageUrl}
                        />
                        <div className="d-flex flex-column col-12 col-md-6 py-0 py-md-4 mb-3 mb-md-0">
                          <h4 className="cursor-pointer font-weight-semibold">{item.name}</h4>
                          <p className="cursor-pointer">{item.desc}</p>
                        </div>
                        <div className="text-primary-dark col-12 col-md-2 mb-3 mb-md-0 flex-centered justify-content-end justify-content-md-center">
                          <IconNextCircle />
                        </div>
                      </div>
                    </Row>
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

export default TaskCategoryDetail;
