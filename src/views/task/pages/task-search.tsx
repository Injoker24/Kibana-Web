import { ErrorWrapper, TaskInquiryCategoryOutput, TaskInquiryTaskListOutput } from 'models';
import React, { useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { TaskService } from 'services';
import { Form, Image, Row } from 'react-bootstrap';

import { Footer, FormInput, Header, InlineRetryError, Loader, Task } from 'shared/components';
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

const TaskSearch: React.FC = ({ stateCategories }: any) => {
  const [searchText, setSearchText] = useState();
  const [subCategory, setSubCategory] = useState<SubCategoryWrapper[]>();
  const [budget, setBudget] = useState<BudgetWrapper[]>();
  const [difficulty, setDifficulty] = useState<string[]>();
  const [openFilter, setOpenFilter] = useState(false);
  const [showSubCategoryFloating, setShowSubCategoryFloating] = useState(false);
  const [showBudgetFloating, setShowBudgetFloating] = useState(false);
  const [showDifficultyFloating, setShowDifficultyFloating] = useState(false);
  const history = useHistory();
  const location = useLocation();

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
    data: taskList,
    isLoading: isLoadingTaskList,
    isFetchingNextPage,
    error: errorTaskList,
    isRefetchError: isErrorRefetch,
    refetch: refetchTaskList,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<TaskInquiryTaskListOutput, ErrorWrapper>(
    ['inquiry-task-list', searchText, subCategory, budget, difficulty],
    async ({ pageParam }) =>
      await TaskService.inquiryTaskList({
        searchText: searchText,
        subCategory: subCategory?.map((t) => t.id),
        budget: budget,
        difficulty: difficulty,
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

  const { register: registerDifficulty, handleSubmit: handleSubmitDifficulty } = useForm({
    mode: 'onChange',
  });

  const { register: registerFloatingButton, handleSubmit: handleSubmitFloatingButton } = useForm({
    mode: 'onChange',
  });

  const submitSearch = (formData: any) => {
    setSearchText(formData.searchText);
    refetchTaskList();
  };

  const submitSubCategoryFilter = (formData: any) => {
    const subArray = taskCategory?.categories.flatMap((item) => {
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

  const submitDifficultyFilter = (formData: any) => {
    setDifficulty(formData.difficulty);
  };

  const submitFloatingButton = (formData: any) => {
    console.log(formData);
    if (formData.subCategory) {
      submitSubCategoryFilter(formData);
    }
    if (formData.budget) {
      submitBudgetFilter(formData);
    }
    if (formData.difficulty) {
      submitDifficultyFilter(formData);
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
                      placeholder="Tugas apa yang anda butuhkan?"
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
              {searchText ? 'Hasil pencarian untuk "' + searchText + '"' : 'Semua tugas'}
            </h3>

            {isLoadingTaskList && <Loader type="inline" />}

            {!taskList && errorTaskList && (
              <div className="flex-centered">
                <InlineRetryError
                  message={errorTaskList.message}
                  onRetry={refetchTaskList}
                />
              </div>
            )}

            {taskList && (
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
                      {errorTaskCategory && (
                        <div className="flex-centered">
                          <InlineRetryError
                            message={errorTaskCategory.message}
                            onRetry={refetchTaskCategory}
                          />
                        </div>
                      )}
                      {isLoadingTaskCategory && <Loader type="inline" />}
                      {taskCategory && (
                        <form onSubmit={handleSubmitSubCategory(submitSubCategoryFilter)}>
                          <FormInput>
                            <div className="d-flex flex-row flex-wrap">
                              {taskCategory.categories.map((item) => {
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
                        <p className="mr-4 cursor-pointer">Tingkat Kesulitan</p>
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
                      <form onSubmit={handleSubmitDifficulty(submitDifficultyFilter)}>
                        <FormInput>
                          <Form.Check
                            type="checkbox"
                            name="difficulty"
                            id="Pemula"
                            value="Pemula"
                            label="Pemula"
                            className="mb-3"
                            defaultChecked={difficulty?.some((e) => e === 'Pemula')}
                            ref={registerDifficulty() as string & ((ref: Element | null) => void)}
                          />

                          <Form.Check
                            type="checkbox"
                            name="difficulty"
                            id="Menengah"
                            value="Menengah"
                            label="Menengah"
                            className="mb-3"
                            defaultChecked={difficulty?.some((e) => e === 'Menengah')}
                            ref={registerDifficulty() as string & ((ref: Element | null) => void)}
                          />

                          <Form.Check
                            type="checkbox"
                            name="difficulty"
                            id="Expert"
                            value="Expert"
                            label="Expert"
                            className="mb-3"
                            defaultChecked={difficulty?.some((e) => e === 'Expert')}
                            ref={registerDifficulty() as string & ((ref: Element | null) => void)}
                          />

                          <Form.Check
                            type="checkbox"
                            name="difficulty"
                            id="Profesional"
                            value="Profesional"
                            label="Profesional"
                            className="mb-3"
                            defaultChecked={difficulty?.some((e) => e === 'Profesional')}
                            ref={registerDifficulty() as string & ((ref: Element | null) => void)}
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
                    {errorTaskCategory && (
                      <div className="flex-centered">
                        <InlineRetryError
                          message={errorTaskCategory.message}
                          onRetry={refetchTaskCategory}
                        />
                      </div>
                    )}
                    {isLoadingTaskCategory && <Loader type="inline" />}
                    {taskCategory && (
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
                                  {taskCategory.categories.map((item) => {
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
                                (showDifficultyFloating ? 'mb-2' : 'mb-4')
                              }
                              onClick={() => setShowDifficultyFloating((x) => !x)}
                            >
                              <p className="mr-4 cursor-pointer">Tingkat Kesulitan</p>
                              <div className="rotate-icon-down">
                                <IconChevronRight />
                              </div>
                            </div>

                            <div className={showDifficultyFloating ? 'd-block' : 'd-none'}>
                              <div className="d-flex flex-column">
                                <FormInput>
                                  <Form.Check
                                    type="checkbox"
                                    name="difficulty"
                                    id="Pemula"
                                    value="Pemula"
                                    label="Pemula"
                                    className="mb-3"
                                    defaultChecked={difficulty?.some((e) => e === 'Pemula')}
                                    ref={
                                      registerFloatingButton() as string &
                                        ((ref: Element | null) => void)
                                    }
                                  />

                                  <Form.Check
                                    type="checkbox"
                                    name="difficulty"
                                    id="Menengah"
                                    value="Menengah"
                                    label="Menengah"
                                    className="mb-3"
                                    defaultChecked={difficulty?.some((e) => e === 'Menengah')}
                                    ref={
                                      registerFloatingButton() as string &
                                        ((ref: Element | null) => void)
                                    }
                                  />

                                  <Form.Check
                                    type="checkbox"
                                    name="difficulty"
                                    id="Expert"
                                    value="Expert"
                                    label="Expert"
                                    className="mb-3"
                                    defaultChecked={difficulty?.some((e) => e === 'Expert')}
                                    ref={
                                      registerFloatingButton() as string &
                                        ((ref: Element | null) => void)
                                    }
                                  />

                                  <Form.Check
                                    type="checkbox"
                                    name="difficulty"
                                    id="Profesional"
                                    value="Profesional"
                                    label="Profesional"
                                    className="mb-3"
                                    defaultChecked={difficulty?.some((e) => e === 'Profesional')}
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

                {(budget || difficulty || subCategory) && (
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
                    {difficulty &&
                      difficulty.map((dif) => {
                        return (
                          <div
                            key={dif}
                            className="chip chip-primary mr-2 mb-3"
                          >
                            {dif}
                          </div>
                        );
                      })}
                  </div>
                )}

                <p className="text-primary-dark mt-3">
                  {taskList.pages[0].totalAmount} tugas tersedia
                </p>

                <Row className="d-flex flex-row flex-wrap mb-4 justify-content-center">
                  {taskList.pages.map((data) => {
                    return (
                      <>
                        {data.tasks.map((item) => {
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
                      </>
                    );
                  })}
                  {isErrorRefetch && errorTaskList && !isFetchingNextPage && (
                    <div className="flex-centered my-4">
                      <InlineRetryError
                        message={errorTaskList.message}
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

export default TaskSearch;
