import { ErrorWrapper, TaskInquiryCategoryOutput } from 'models';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { TaskService } from 'services';
import { Image, Row } from 'react-bootstrap';

import { Footer, Header, InlineRetryError, Loader, TitleBanner } from 'shared/components';
import { IconChevronRight } from 'images';
import TaskCategoryDetail from '../components/task-category-detail';
import { Redirect } from 'react-router-dom';

const ServiceCategoryList: React.FC = ({ stateId, stateName }: any) => {
  const {
    data: category,
    isLoading: isLoadingCategory,
    refetch: refetchCategory,
    error: errorCategory,
  } = useQuery<TaskInquiryCategoryOutput, ErrorWrapper>(
    ['inquiry-task-category'],
    async () => await TaskService.inquiryCategory(),
  );

  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [hasRedirected, setHasRedirected] = useState(false);
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>();

  const openDetailCategory = (id: string, name: string) => {
    setCategoryId(id);
    setCategoryName(name);
    setStep(1);
    document.body.scrollTo(0, 0);
  };

  const back = () => {
    setStep(0);
    document.body.scrollTo(0, 0);
  };

  if (step === 1) {
    return (
      <TaskCategoryDetail
        title={categoryName}
        id={categoryId}
        onBack={back}
      />
    );
  }

  if (stateId && stateName && !hasRedirected) {
    setHasRedirected(true);
    openDetailCategory(stateId, stateName);
  }

  const openTaskListDetail = (id: string, name: string) => {
    setCategories([
      {
        id: id,
        name: name,
      },
    ]);
  };

  if (categories) {
    return (
      <Redirect
        to={{
          pathname: `/task/search`,
          state: {
            stateCategories: categories,
          },
        }}
      />
    );
  }

  return (
    <>
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Kategori Tugas'} />
        <Row className="justify-content-center">
          <div className="col-10">
            {errorCategory && (
              <div className="flex-centered">
                <InlineRetryError
                  message={errorCategory.message}
                  onRetry={refetchCategory}
                />
              </div>
            )}
            <Row>
              {isLoadingCategory && <Loader type="inline" />}
              {category &&
                category.categories.map((category) => {
                  return (
                    <div
                      key={category.id}
                      className="col-12 col-md-6 col-lg-4 d-flex flex-column mb-5 px-md-3 px-lg-5"
                    >
                      <Image
                        className="mb-3 cursor-pointer"
                        style={{ borderRadius: '1.5rem' }}
                        src={category.imageUrl}
                        onClick={() => openDetailCategory(category.id, category.name)}
                      />
                      <div className="flex-centered justify-content-between mb-2">
                        <h3 className="mb-0">{category.name}</h3>
                        <div
                          className="text-primary-dark cursor-pointer"
                          onClick={() => openDetailCategory(category.id, category.name)}
                        >
                          <IconChevronRight />
                        </div>
                      </div>
                      {category.subCategories.map((subCategory) => {
                        return (
                          <div
                            key={subCategory.id}
                            onClick={() => openTaskListDetail(subCategory.id, subCategory.name)}
                            className="text-primary-dark mb-2 cursor-pointer"
                          >
                            {subCategory.name}
                          </div>
                        );
                      })}
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

export default ServiceCategoryList;
