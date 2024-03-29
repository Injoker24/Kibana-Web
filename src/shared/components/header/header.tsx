import { IconArrowDown, IconBurgerMenu, IconClose, IconLogOut, logoLight } from 'images';
import React, { useEffect, useState } from 'react';

import { Image } from 'react-bootstrap';
import { Link, useHistory, withRouter } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from 'utils';
import Loader from '../loader';
import { AuthService } from 'services';
import { useMutation } from 'react-query';
import { ErrorWrapper } from 'models';

const Header: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const [isFreelancer, setIsFreelancer] = useState<Boolean>();
  const [status, setStatus] = useState();

  const history = useHistory();

  const [isLoadingSwitch, setIsLoadingSwitch] = useState(false);

  useEffect(() => {
    setIsFreelancer(getLocalStorage('isFreelancer') === 'true' ? true : false);
    setStatus(getLocalStorage('status'));
  }, []);

  const { isLoading: isLoadingLogout, mutate: mutateLogout } = useMutation<{}, ErrorWrapper>(
    ['logout'],
    async () => await AuthService.logout(),
    {
      onSuccess: () => {
        clearLocalStorage();
        window.location.href = '/dashboard';
      },
    },
  );

  const switchToFreelancer = () => {
    setLocalStorage('status', 'freelancer');
    setIsLoadingSwitch(true);
    setTimeout(() => {
      setIsLoadingSwitch(false);
      history.push({
        pathname: '/dashboard',
      });
    }, 1000);
  };

  const switchToClient = () => {
    setLocalStorage('status', 'client');
    setIsLoadingSwitch(true);
    setTimeout(() => {
      setIsLoadingSwitch(false);
      history.push({
        pathname: '/dashboard',
      });
    }, 1000);
  };

  return (
    <div
      className={
        'py-4 px-3 px-md-5 d-flex justify-content-between text-light ' +
        (status === 'freelancer' ? 'bg-secondary-dark' : 'bg-primary')
      }
    >
      {isLoadingSwitch && <Loader type="fixed" />}
      {isLoadingLogout && <Loader type="fixed" />}
      <div
        className="d-md-none d-flex flex-centered"
        onClick={() => setOpenSidebar((x) => !x)}
      >
        <IconBurgerMenu />
      </div>
      <Popup
        open={openSidebar}
        closeOnDocumentClick={false}
        className={'sidebar ' + (status === 'freelancer' ? 'bg-secondary-dark' : 'bg-primary')}
      >
        <div className="text-light p-3">
          <div className="flex-centered justify-content-end mb-4">
            <div
              className="cursor-pointer"
              onClick={() => setOpenSidebar(false)}
            >
              <IconClose />
            </div>
          </div>
          <div className="d-flex flex-column">
            <h4 className="mb-3 font-weight-bold">Tugas</h4>
            <a
              className="text-light mb-3"
              href="/task/search"
            >
              Cari Tugas
            </a>
            <a
              className="text-light mb-3"
              href="/task/category"
            >
              Kategori Tugas
            </a>
            {status === 'freelancer' && (
              <a
                href="/task/history"
                className="text-light mb-3"
              >
                Riwayat Tugas
              </a>
            )}
            {status === 'client' && (
              <a
                href="/task/create"
                className="text-light mb-3"
              >
                Buat Tugas
              </a>
            )}
            {status === 'client' && (
              <a
                href="/task/owned"
                className="text-light mb-3"
              >
                Tugas Saya
              </a>
            )}
          </div>
          <hr />
          <div className="d-flex flex-column mb-4">
            <h4 className="mb-3 font-weight-bold">Layanan</h4>
            <a
              className="text-light mb-3"
              href="/service/search"
            >
              Cari Layanan
            </a>
            <a
              className="text-light mb-3"
              href="/service/category"
            >
              Kategori Layanan
            </a>
            {status === 'freelancer' && (
              <a
                href="/service/create"
                className="text-light mb-3"
              >
                Buat Layanan
              </a>
            )}
            {status === 'freelancer' && (
              <a
                href="/service/owned"
                className="text-light mb-3"
              >
                Layanan Saya
              </a>
            )}
            {status === 'client' && (
              <a
                href="/service/history"
                className="text-light mb-3"
              >
                Riwayat Layanan
              </a>
            )}
          </div>
          {!status && (
            <Link
              to="/auth/login"
              className="btn btn-outline-white w-100"
            >
              Masuk
            </Link>
          )}
          {status === 'freelancer' && (
            <div
              className="btn btn-outline-white w-100"
              onClick={() => switchToClient()}
            >
              Jadi Klien
            </div>
          )}
          {status === 'client' && !isFreelancer && (
            <Link
              to="/auth/register/freelancer"
              className="btn btn-outline-white w-100"
            >
              Daftar Freelancer
            </Link>
          )}
          {status === 'client' && isFreelancer && (
            <div
              className="btn btn-outline-white w-100"
              onClick={() => switchToFreelancer()}
            >
              Jadi Freelancer
            </div>
          )}
        </div>
      </Popup>

      <a href="/">
        <Image
          className="flex-centered cursor-pointer"
          src={logoLight}
          alt="logo"
        />
      </a>
      <div className="d-flex align-items-center">
        <Popup
          trigger={
            <div className="d-md-flex mr-3 d-none cursor-pointer">
              <p className="mr-1 cursor-pointer">Tugas</p>
              <IconArrowDown />
            </div>
          }
          position="bottom center"
          on="hover"
          closeOnDocumentClick
          className="header-tooltip"
        >
          <div className="d-flex flex-column">
            <a
              href="/task/search"
              className="my-3 text-dark"
            >
              Cari Tugas
            </a>
            <a
              href="/task/category"
              className="mb-3 text-dark"
            >
              Kategori Tugas
            </a>
            {status === 'freelancer' && (
              <a
                href="/task/history"
                className="mb-3 text-dark"
              >
                Riwayat Tugas
              </a>
            )}
            {status === 'client' && (
              <a
                href="/task/create"
                className="mb-3 text-dark"
              >
                Buat Tugas
              </a>
            )}
            {status === 'client' && (
              <a
                href="/task/owned"
                className="mb-3 text-dark"
              >
                Tugas Saya
              </a>
            )}
          </div>
        </Popup>
        <Popup
          trigger={
            <div className="d-md-flex mr-3 d-none cursor-pointer">
              <p className="mr-1 cursor-pointer">Layanan</p>
              <IconArrowDown />
            </div>
          }
          position="bottom center"
          on="hover"
          closeOnDocumentClick
          className="header-tooltip"
        >
          <div className="d-flex flex-column">
            <a
              href="/service/search"
              className="my-3 text-dark"
            >
              Cari Layanan
            </a>
            <a
              href="/service/category"
              className="mb-3 text-dark"
            >
              Kategori Layanan
            </a>
            {status === 'freelancer' && (
              <a
                href="/service/create"
                className="mb-3 text-dark"
              >
                Buat Layanan
              </a>
            )}
            {status === 'freelancer' && (
              <a
                href="/service/owned"
                className="mb-3 text-dark"
              >
                Layanan Saya
              </a>
            )}
            {status === 'client' && (
              <a
                href="/service/history"
                className="mb-3 text-dark"
              >
                Riwayat Layanan
              </a>
            )}
          </div>
        </Popup>
        {!status && (
          <>
            <Link
              to="/auth/login"
              className="btn btn-outline-white mr-3 d-md-block d-none"
            >
              Masuk
            </Link>
            <Link
              to="/auth/register"
              className="btn btn-secondary"
            >
              Daftar
            </Link>
          </>
        )}
        {isFreelancer && status === 'client' && (
          <div
            className="btn btn-outline-white mr-4 d-md-block d-none"
            onClick={() => switchToFreelancer()}
          >
            Jadi Freelancer
          </div>
        )}
        {!isFreelancer && status === 'client' && (
          <div
            className="btn btn-outline-white mr-4 d-md-block d-none"
            onClick={() =>
              history.push({
                pathname: '/auth/register/freelancer',
              })
            }
          >
            Daftar Freelancer
          </div>
        )}
        {status === 'freelancer' && (
          <div
            className="btn btn-outline-white mr-4 d-md-block d-none"
            onClick={() => switchToClient()}
          >
            Jadi Klien
          </div>
        )}
        {status && (
          <div
            className="cursor-pointer"
            onClick={() => mutateLogout()}
          >
            <IconLogOut />
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
