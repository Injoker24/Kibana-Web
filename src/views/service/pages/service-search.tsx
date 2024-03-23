import {
  ErrorWrapper,
  ServiceInquiryCategoryOutput,
  ServiceInquiryServiceListOutput,
} from 'models';
import React, { useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { ServiceService } from 'services';
import { Form, Image, Row } from 'react-bootstrap';

import { Footer, FormInput, Header, InlineRetryError, Loader, Service } from 'shared/components';
import { useForm } from 'react-hook-form';
import { IconChevronRight, IconClose, IconSearch, searchIllustration } from 'images';
import Popup from 'reactjs-popup';
import { useHistory, useLocation } from 'react-router-dom';

interface SubCategoryWrapper {
  id: string;
  name: string;
}

interface BudgetWrapper {
  budgetStart: number;
  budgetEnd?: number;
  name: string;
  id: string;
}

interface WorkingTimeWrapper {
  workingTimeStart: number;
  workingTimeEnd?: number;
  name: string;
  id: string;
}

const ServiceSearch: React.FC = ({ stateCategories }: any) => {
  const [searchText, setSearchText] = useState();
  const [subCategory, setSubCategory] = useState<SubCategoryWrapper[]>();
  const [budget, setBudget] = useState<BudgetWrapper[]>();
  const [workingTime, setWorkingTime] = useState<WorkingTimeWrapper[]>();
  const [openFilter, setOpenFilter] = useState(false);
  const [showSubCategoryFloating, setShowSubCategoryFloating] = useState(false);
  const [showBudgetFloating, setShowBudgetFloating] = useState(false);
  const [showWorkingTimeFloating, setShowWorkingTimeFloating] = useState(false);
  const history = useHistory();
  const location = useLocation();

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
    data: serviceList,
    isLoading: isLoadingServiceList,
    isFetchingNextPage,
    error: errorServiceList,
    isRefetchError: isErrorRefetch,
    refetch: refetchServiceList,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<ServiceInquiryServiceListOutput, ErrorWrapper>(
    ['inquiry-service-list', searchText, subCategory, budget, workingTime],
    async ({ pageParam }) =>
      await ServiceService.inquiryServiceList({
        searchText: searchText,
        subCategory: subCategory?.map((t) => t.id),
        budget: budget,
        workingTime: workingTime,
        lastId: pageParam,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNextPage) {
          return lastPage.lastId;
        } else {
          return undefined;
        }
      },
    },
  );

  const { register: registerSearch, handleSubmit: handleSubmitSearch } = useForm({
    mode: 'onChange',
  });

  const { register: registerSubCategory, handleSubmit: handleSubmitSubCategory } = useForm({
    mode: 'onChange',
  });

  const { register: registerBudget, handleSubmit: handleSubmitBudget } = useForm({
    mode: 'onChange',
  });

  const { register: registerWorkingTime, handleSubmit: handleSubmitWorkingTime } = useForm({
    mode: 'onChange',
  });

  const { register: registerFloatingButton, handleSubmit: handleSubmitFloatingButton } = useForm({
    mode: 'onChange',
  });

  const submitSearch = (formData: any) => {
    setSearchText(formData.searchText);
    refetchServiceList();
  };

  const submitSubCategoryFilter = (formData: any) => {
    const subArray = serviceCategory?.categories.flatMap((item) => {
      const subArray = item.subCategories.map((sub) => {
        return sub;
      });
      return subArray;
    });

    const subCategoryArray = formData.subCategory.map((item: string) => {
      const foundItem = subArray?.find((sub) => sub.id === item);
      return {
        id: item,
        name: foundItem?.name,
      };
    });
    setSubCategory(subCategoryArray);
  };

  const submitBudgetFilter = (formData: any) => {
    const budgetArray = formData.budget.map((budget: string) => {
      if (budget === 'budget1') {
        return {
          budgetStart: 0,
          budgetEnd: 100000,
          id: '1',
          name: '< Rp 100.000',
        };
      }
      if (budget === 'budget2') {
        return {
          budgetStart: 100000,
          budgetEnd: 300000,
          id: '2',
          name: 'Rp 100.000 - Rp 300.000',
        };
      }
      if (budget === 'budget3') {
        return {
          budgetStart: 300000,
          budgetEnd: 700000,
          id: '3',
          name: 'Rp 300.000 - Rp 700.000',
        };
      }
      if (budget === 'budget4') {
        return {
          budgetStart: 700000,
          budgetEnd: 1500000,
          id: '4',
          name: 'Rp 700.000 - Rp 1.500.000',
        };
      }
      if (budget === 'budget5') {
        return {
          budgetStart: 1500000,
          id: '5',
          name: '> Rp 1.500.000',
        };
      }
      return undefined;
    });
    setBudget(budgetArray);
  };

  const submitWorkingTimeFilter = (formData: any) => {
    const workingTimeArray = formData.workingTime.map((time: string) => {
      if (time === 'workingTime1') {
        return {
          workingTimeStart: 0,
          workingTimeEnd: 1,
          id: '1',
          name: '< 1 hari',
        };
      }
      if (time === 'workingTime2') {
        return {
          workingTimeStart: 1,
          workingTimeEnd: 3,
          id: '2',
          name: '1 hari - 3 hari',
        };
      }
      if (time === 'workingTime3') {
        return {
          workingTimeStart: 3,
          workingTimeEnd: 7,
          id: '3',
          name: '3 hari - 1 minggu',
        };
      }
      if (time === 'workingTime4') {
        return {
          workingTimeStart: 7,
          workingTimeEnd: 31,
          id: '4',
          name: '1 minggu - 1 bulan',
        };
      }
      if (time === 'workingTime5') {
        return {
          workingTimeStart: 31,
          id: '5',
          name: '> 1 bulan',
        };
      }
      return undefined;
    });
    setWorkingTime(workingTimeArray);
  };

  const submitFloatingButton = (formData: any) => {
    if (formData.subCategory) {
      submitSubCategoryFilter(formData);
    }
    if (formData.budget) {
      submitBudgetFilter(formData);
    }
    if (formData.workingTime) {
      submitWorkingTimeFilter(formData);
    }
    setOpenFilter(false);
  };

  useEffect(() => {
    if (stateCategories) {
      setSubCategory(stateCategories);
    }
    document.body.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="min-layout-height">
        <Row className="justify-content-center">
          <div className="col-10">
            <div className="bg-primary-dark rounded d-flex flex-row flex-wrap px-2 px-lg-4 py-2 my-5">
              <form
                onSubmit={handleSubmitSearch(submitSearch)}
                className="col-12 col-lg-8"
              >
                <div className="position-relative my-4">
                  <FormInput>
                    <Form.Control
                      type="text"
                      id="searchText"
                      name="searchText"
                      autoComplete="off"
                      placeholder="Layanan apa yang kamu butuhkan?"
                      className="pr-5"
                      ref={registerSearch() as string & ((ref: Element | null) => void)}
                    />
                  </FormInput>
                  <button
                    className="text-primary cursor-pointer border-0 bg-white"
                    type="submit"
                    style={{ position: 'absolute', right: '1rem', bottom: '0.75rem' }}
                  >
                    <IconSearch />
                  </button>
                </div>
              </form>
              <div className="position-relative search-illustration-container order-first order-lg-last">
                <Image src={searchIllustration} />
              </div>
            </div>

            <h3 className="mb-4">
              {searchText ? 'Hasil pencarian untuk "' + searchText + '"' : 'Semua layanan'}
            </h3>

            {isLoadingServiceList && <Loader type="inline" />}

            {!serviceList && errorServiceList && (
              <div className="flex-centered">
                <InlineRetryError
                  message={errorServiceList.message}
                  onRetry={refetchServiceList}
                />
              </div>
            )}

            {serviceList && (
              <>
                <div className="d-none d-lg-flex flex-row mb-4">
                  <Popup
                    trigger={
                      <div className="d-flex mr-3 cursor-pointer dropdown">
                        <p className="mr-4 cursor-pointer">Kategori / Sub Kategori</p>
                        <div className="rotate-icon-down">
                          <IconChevronRight />
                        </div>
                      </div>
                    }
                    position="bottom left"
                    on="click"
                    closeOnDocumentClick
                    className="filter-tooltip"
                  >
                    <div className="filter-tooltip d-flex flex-column">
                      {errorServiceCategory && (
                        <div className="flex-centered">
                          <InlineRetryError
                            message={errorServiceCategory.message}
                            onRetry={refetchServiceCategory}
                          />
                        </div>
                      )}
                      {isLoadingServiceCategory && <Loader type="inline" />}
                      {serviceCategory && (
                        <form onSubmit={handleSubmitSubCategory(submitSubCategoryFilter)}>
                          <FormInput>
                            <div className="d-flex flex-row flex-wrap">
                              {serviceCategory.categories.map((item) => {
                                return (
                                  <div
                                    key={item.id}
                                    className="col-3 mb-3"
                                  >
                                    <h4 className="font-weight-bold mb-3">{item.name}</h4>
                                    {item.subCategories.map((subCat) => {
                                      return (
                                        <Form.Check
                                          key={subCat.id}
                                          type="checkbox"
                                          name="subCategory"
                                          id={subCat.id}
                                          value={subCat.id}
                                          label={subCat.name}
                                          className="mb-3"
                                          defaultChecked={subCategory?.some(
                                            (e) => e.id === subCat.id,
                                          )}
                                          ref={
                                            registerSubCategory() as string &
                                              ((ref: Element | null) => void)
                                          }
                                        />
                                      );
                                    })}
                                  </div>
                                );
                              })}
                            </div>
                          </FormInput>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-primary align-self-end"
                              type="submit"
                            >
                              Terapkan Filter
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </Popup>
                  <Popup
                    trigger={
                      <div className="d-flex mr-3 cursor-pointer dropdown">
                        <p className="mr-4 cursor-pointer">Budget</p>
                        <div className="rotate-icon-down">
                          <IconChevronRight />
                        </div>
                      </div>
                    }
                    position="bottom left"
                    on="click"
                    closeOnDocumentClick
                    className="filter-tooltip"
                  >
                    <div className="filter-tooltip d-flex flex-column">
                      <form onSubmit={handleSubmitBudget(submitBudgetFilter)}>
                        <FormInput>
                          <Form.Check
                            type="checkbox"
                            name="budget"
                            id="budget1"
                            value="budget1"
                            label="< Rp 100.000"
                            className="mb-3"
                            defaultChecked={budget?.some((e) => e.id === '1')}
                            ref={registerBudget() as string & ((ref: Element | null) => void)}
                          />

                          <Form.Check
                            type="checkbox"
                            name="budget"
                            id="budget2"
                            value="budget2"
                            label="Rp 100.000 - Rp 300.000"
                            className="mb-3"
                            defaultChecked={budget?.some((e) => e.id === '2')}
                            ref={registerBudget() as string & ((ref: Element | null) => void)}
                          />

                          <Form.Check
                            type="checkbox"
                            name="budget"
                            id="budget3"
                            value="budget3"
                            label="Rp 300.000 - Rp 700.000"
                            className="mb-3"
                            defaultChecked={budget?.some((e) => e.id === '3')}
                            ref={registerBudget() as string & ((ref: Element | null) => void)}
                          />

                          <Form.Check
                            type="checkbox"
                            name="budget"
                            id="budget4"
                            value="budget4"
                            label="Rp 700.000 - Rp 1.500.000"
                            className="mb-3"
                            defaultChecked={budget?.some((e) => e.id === '4')}
                            ref={registerBudget() as string & ((ref: Element | null) => void)}
                          />

                          <Form.Check
                            type="checkbox"
                            name="budget"
                            id="budget5"
                            value="budget5"
                            label="> Rp 1.500.000"
                            className="mb-3"
                            defaultChecked={budget?.some((e) => e.id === '5')}
                            ref={registerBudget() as string & ((ref: Element | null) => void)}
                          />
                        </FormInput>
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-primary align-self-end"
                            type="submit"
                          >
                            Terapkan Filter
                          </button>
                        </div>
                      </form>
                    </div>
                  </Popup>
                  <Popup
                    trigger={
                      <div className="d-flex mr-3 cursor-pointer dropdown">
                        <p className="mr-4 cursor-pointer">Waktu Pengerjaan</p>
                        <div className="rotate-icon-down">
                          <IconChevronRight />
                        </div>
                      </div>
                    }
                    position="bottom left"
                    on="click"
                    closeOnDocumentClick
                    className="filter-tooltip"
                  >
                    <div className="filter-tooltip d-flex flex-column">
                      <form onSubmit={handleSubmitWorkingTime(submitWorkingTimeFilter)}>
                        <FormInput>
                          <Form.Check
                            type="checkbox"
                            name="workingTime"
                            id="workingTime1"
                            value="workingTime1"
                            label="< 1 hari"
                            className="mb-3"
                            defaultChecked={workingTime?.some((e) => e.id === '1')}
                            ref={registerWorkingTime() as string & ((ref: Element | null) => void)}
                          />

                          <Form.Check
                            type="checkbox"
                            name="workingTime"
                            id="workingTime2"
                            value="workingTime2"
                            label="1 hari - 3 hari"
                            className="mb-3"
                            defaultChecked={workingTime?.some((e) => e.id === '2')}
                            ref={registerWorkingTime() as string & ((ref: Element | null) => void)}
                          />

                          <Form.Check
                            type="checkbox"
                            name="workingTime"
                            id="workingTime3"
                            value="workingTime3"
                            label="3 hari - 1 minggu"
                            className="mb-3"
                            defaultChecked={workingTime?.some((e) => e.id === '3')}
                            ref={registerWorkingTime() as string & ((ref: Element | null) => void)}
                          />

                          <Form.Check
                            type="checkbox"
                            name="workingTime"
                            id="workingTime4"
                            value="workingTime4"
                            label="1 minggu - 1 bulan"
                            className="mb-3"
                            defaultChecked={workingTime?.some((e) => e.id === '4')}
                            ref={registerWorkingTime() as string & ((ref: Element | null) => void)}
                          />

                          <Form.Check
                            type="checkbox"
                            name="workingTime"
                            id="workingTime5"
                            value="workingTime5"
                            label="> 1 bulan"
                            className="mb-3"
                            defaultChecked={workingTime?.some((e) => e.id === '5')}
                            ref={registerWorkingTime() as string & ((ref: Element | null) => void)}
                          />
                        </FormInput>
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-primary align-self-end"
                            type="submit"
                          >
                            Terapkan Filter
                          </button>
                        </div>
                      </form>
                    </div>
                  </Popup>
                </div>

                <div className="d-block d-lg-none px-3 py-4 filter-floating-button shadow-lg">
                  <div
                    className="btn btn-outline-primary"
                    onClick={() => setOpenFilter((x) => !x)}
                  >
                    Filter
                  </div>
                  <Popup
                    open={openFilter}
                    closeOnDocumentClick={false}
                    className={'filter-bottom-sheet'}
                  >
                    <div className="d-flex justify-content-between mb-4">
                      <h4 className="font-weight-semibold text-primary-dark">Filter</h4>
                      <div
                        className="cursor-pointer text-dark"
                        onClick={() => setOpenFilter(false)}
                      >
                        <IconClose />
                      </div>
                    </div>
                    {errorServiceCategory && (
                      <div className="flex-centered">
                        <InlineRetryError
                          message={errorServiceCategory.message}
                          onRetry={refetchServiceCategory}
                        />
                      </div>
                    )}
                    {isLoadingServiceCategory && <Loader type="inline" />}
                    {serviceCategory && (
                      <>
                        <form
                          onSubmit={handleSubmitFloatingButton(submitFloatingButton)}
                          className="h-100"
                        >
                          <div
                            style={{ height: '80%' }}
                            className="mb-4 overflow-auto"
                          >
                            <div
                              className={
                                'd-flex cursor-pointer dropdown justify-content-between ' +
                                (showSubCategoryFloating ? 'mb-2' : 'mb-4')
                              }
                              onClick={() => setShowSubCategoryFloating((x) => !x)}
                            >
                              <p className="mr-4 cursor-pointer">Kategori / Sub Kategori</p>
                              <div className="rotate-icon-down">
                                <IconChevronRight />
                              </div>
                            </div>

                            <div className={showSubCategoryFloating ? 'd-block' : 'd-none'}>
                              <FormInput>
                                <div className="d-flex flex-column">
                                  {serviceCategory.categories.map((item) => {
                                    return (
                                      <div
                                        key={item.id}
                                        className="mb-3"
                                      >
                                        <h4 className="font-weight-bold mb-3">{item.name}</h4>
                                        {item.subCategories.map((subCat) => {
                                          return (
                                            <Form.Check
                                              key={subCat.id}
                                              type="checkbox"
                                              name="subCategory"
                                              id={subCat.id}
                                              value={subCat.id}
                                              label={subCat.name}
                                              className="mb-3"
                                              defaultChecked={subCategory?.some(
                                                (e) => e.id === subCat.id,
                                              )}
                                              ref={
                                                registerFloatingButton() as string &
                                                  ((ref: Element | null) => void)
                                              }
                                            />
                                          );
                                        })}
                                      </div>
                                    );
                                  })}
                                </div>
                              </FormInput>
                            </div>

                            <div
                              className={
                                'd-flex cursor-pointer dropdown justify-content-between ' +
                                (showBudgetFloating ? 'mb-2' : 'mb-4')
                              }
                              onClick={() => setShowBudgetFloating((x) => !x)}
                            >
                              <p className="mr-4 cursor-pointer">Budget</p>
                              <div className="rotate-icon-down">
                                <IconChevronRight />
                              </div>
                            </div>

                            <div className={showBudgetFloating ? 'd-block' : 'd-none'}>
                              <div className="d-flex flex-column">
                                <FormInput>
                                  <Form.Check
                                    type="checkbox"
                                    name="budget"
                                    id="budget1"
                                    value="budget1"
                                    label="< Rp 100.000"
                                    className="mb-3"
                                    defaultChecked={budget?.some((e) => e.id === '1')}
                                    ref={
                                      registerFloatingButton() as string &
                                        ((ref: Element | null) => void)
                                    }
                                  />

                                  <Form.Check
                                    type="checkbox"
                                    name="budget"
                                    id="budget2"
                                    value="budget2"
                                    label="Rp 100.000 - Rp 300.000"
                                    className="mb-3"
                                    defaultChecked={budget?.some((e) => e.id === '2')}
                                    ref={
                                      registerFloatingButton() as string &
                                        ((ref: Element | null) => void)
                                    }
                                  />

                                  <Form.Check
                                    type="checkbox"
                                    name="budget"
                                    id="budget3"
                                    value="budget3"
                                    label="Rp 300.000 - Rp 700.000"
                                    className="mb-3"
                                    defaultChecked={budget?.some((e) => e.id === '3')}
                                    ref={
                                      registerFloatingButton() as string &
                                        ((ref: Element | null) => void)
                                    }
                                  />

                                  <Form.Check
                                    type="checkbox"
                                    name="budget"
                                    id="budget4"
                                    value="budget4"
                                    label="Rp 700.000 - Rp 1.500.000"
                                    className="mb-3"
                                    defaultChecked={budget?.some((e) => e.id === '4')}
                                    ref={
                                      registerFloatingButton() as string &
                                        ((ref: Element | null) => void)
                                    }
                                  />

                                  <Form.Check
                                    type="checkbox"
                                    name="budget"
                                    id="budget5"
                                    value="budget5"
                                    label="> Rp 1.500.000"
                                    className="mb-3"
                                    defaultChecked={budget?.some((e) => e.id === '5')}
                                    ref={
                                      registerFloatingButton() as string &
                                        ((ref: Element | null) => void)
                                    }
                                  />
                                </FormInput>
                              </div>
                            </div>

                            <div
                              className={
                                'd-flex cursor-pointer dropdown justify-content-between ' +
                                (showWorkingTimeFloating ? 'mb-2' : 'mb-4')
                              }
                              onClick={() => setShowWorkingTimeFloating((x) => !x)}
                            >
                              <p className="mr-4 cursor-pointer">Waktu Pengerjaan</p>
                              <div className="rotate-icon-down">
                                <IconChevronRight />
                              </div>
                            </div>

                            <div className={showWorkingTimeFloating ? 'd-block' : 'd-none'}>
                              <div className="d-flex flex-column">
                                <FormInput>
                                  <Form.Check
                                    type="checkbox"
                                    name="workingTime"
                                    id="workingTime1"
                                    value="workingTime1"
                                    label="< 1 hari"
                                    className="mb-3"
                                    defaultChecked={workingTime?.some((e) => e.id === '1')}
                                    ref={
                                      registerFloatingButton() as string &
                                        ((ref: Element | null) => void)
                                    }
                                  />

                                  <Form.Check
                                    type="checkbox"
                                    name="workingTime"
                                    id="workingTime2"
                                    value="workingTime2"
                                    label="1 hari - 3 hari"
                                    className="mb-3"
                                    defaultChecked={workingTime?.some((e) => e.id === '2')}
                                    ref={
                                      registerFloatingButton() as string &
                                        ((ref: Element | null) => void)
                                    }
                                  />

                                  <Form.Check
                                    type="checkbox"
                                    name="workingTime"
                                    id="workingTime3"
                                    value="workingTime3"
                                    label="3 hari - 1 minggu"
                                    className="mb-3"
                                    defaultChecked={workingTime?.some((e) => e.id === '3')}
                                    ref={
                                      registerFloatingButton() as string &
                                        ((ref: Element | null) => void)
                                    }
                                  />

                                  <Form.Check
                                    type="checkbox"
                                    name="workingTime"
                                    id="workingTime4"
                                    value="workingTime4"
                                    label="1 minggu - 1 bulan"
                                    className="mb-3"
                                    defaultChecked={workingTime?.some((e) => e.id === '4')}
                                    ref={
                                      registerFloatingButton() as string &
                                        ((ref: Element | null) => void)
                                    }
                                  />

                                  <Form.Check
                                    type="checkbox"
                                    name="workingTime"
                                    id="workingTime5"
                                    value="workingTime5"
                                    label="> 1 bulan"
                                    className="mb-3"
                                    defaultChecked={workingTime?.some((e) => e.id === '5')}
                                    ref={
                                      registerFloatingButton() as string &
                                        ((ref: Element | null) => void)
                                    }
                                  />
                                </FormInput>
                              </div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            Terapkan Filter
                          </button>
                        </form>
                      </>
                    )}
                  </Popup>
                </div>

                {(budget || workingTime || subCategory) && (
                  <div className="d-flex flex-row flex-wrap">
                    {subCategory &&
                      subCategory.map((subCategory) => {
                        return (
                          <div
                            key={subCategory.id}
                            className="chip chip-primary mr-2 mb-3"
                          >
                            {subCategory.name}
                          </div>
                        );
                      })}
                    {budget &&
                      budget.map((budget) => {
                        return (
                          <div
                            key={budget.id}
                            className="chip chip-primary mr-2 mb-3"
                          >
                            {budget.name}
                          </div>
                        );
                      })}
                    {workingTime &&
                      workingTime.map((work) => {
                        return (
                          <div
                            key={work.id}
                            className="chip chip-primary mr-2 mb-3"
                          >
                            {work.name}
                          </div>
                        );
                      })}
                  </div>
                )}

                <p className="text-primary-dark mt-3">
                  {serviceList.pages[0].totalAmount} layanan tersedia
                </p>

                <Row>
                  {serviceList.pages.map((data) => {
                    return (
                      <>
                        {data.services.map((item) => {
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
                      </>
                    );
                  })}
                </Row>

                <Row className="justify-content-center mb-4">
                  {isErrorRefetch && errorServiceList && !isFetchingNextPage && (
                    <div className="flex-centered my-4">
                      <InlineRetryError
                        message={errorServiceList.message}
                        onRetry={fetchNextPage}
                      />
                    </div>
                  )}
                  {isFetchingNextPage && (
                    <div className="my-4">
                      <Loader type="inline" />
                    </div>
                  )}
                  {hasNextPage && !isFetchingNextPage && !isErrorRefetch && (
                    <button
                      className="btn btn-outline-primary my-4"
                      onClick={() => fetchNextPage()}
                    >
                      Muat Lebih
                    </button>
                  )}
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

export default ServiceSearch;
