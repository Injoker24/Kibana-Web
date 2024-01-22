import { IconArrowDown, IconBurgerMenu, IconClose, logoLight } from 'images';
import React, { useState } from 'react';

import { Image } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Popup from 'reactjs-popup';

const Header: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="py-4 px-3 px-md-5 d-flex justify-content-between bg-primary text-light">
      <div className="d-md-none d-flex flex-centered" onClick={() => setOpenSidebar(x => !x)}><IconBurgerMenu /></div>

      <Popup 
        open={openSidebar} 
        closeOnDocumentClick={true}
        className="sidebar"
      >
        <div className="text-light p-3">
          <div className="flex-centered justify-content-between mb-4">
            <div className="cursor-pointer" onClick={() => setOpenSidebar(false)}><IconClose/></div>
            <h4 className="mb-0 font-weight-bold">Menu</h4>
          </div>
          <div className="d-flex flex-column">
            <h4 className="mb-3 font-weight-bold">Tugas</h4>
            <a className="text-light mb-3" href="">Cari Tugas</a>
            <a className="text-light mb-3" href="">Kategori Tugas</a>
          </div>
          <hr/>
          <div className="d-flex flex-column mb-4">
            <h4 className="mb-3 font-weight-bold">Layanan</h4>
            <a className="text-light mb-3" href="">Cari Layanan</a>
            <a className="text-light mb-3" href="">Kategori Layanan</a>
          </div>
          <Link to="/login" className="btn btn-outline-white w-100">Masuk</Link>
        </div>
      </Popup>

      <a href="/"><Image className="flex-centered cursor-pointer" src={logoLight} alt="logo" /></a>
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
        >
          <div className="header-tooltip d-flex flex-column">
            <a href="/task" className="mb-3 text-dark">Cari Tugas</a>
            <a href="/task/category" className="text-dark">Kategori Tugas</a>
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
        >
          <div className="header-tooltip d-flex flex-column">
            <a href="/service" className="mb-3 text-dark">Cari Layanan</a>
            <a href="/service/category" className="text-dark">Kategori Layanan</a>
          </div>
        </Popup>
        <Link to="/login" className="btn btn-outline-white mr-3 d-md-block d-none">Masuk</Link>
        <button className="btn btn-secondary">Daftar</button>
      </div>
    </div>
  );
};

export default withRouter(Header);