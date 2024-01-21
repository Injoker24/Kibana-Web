import { IconArrowDown, IconBurgerMenu, logoLight } from 'images';
import React from 'react';

import { Image } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <div className="py-4 px-3 px-md-5 d-flex justify-content-between bg-primary text-light">
      <div className="d-md-none d-flex flex-centered"><IconBurgerMenu /></div>
      <Image className="flex-centered" src={logoLight} alt="logo" />
      <div className="d-flex align-items-center">
        <div className="d-md-flex mr-3 d-none">
          <p className="mr-1">Tugas</p>
          <IconArrowDown />
        </div>
        <div className="d-md-flex mr-3 d-none">
          <p className="mr-1">Layanan</p>
          <IconArrowDown />
        </div>
        <button className="btn btn-outline-white mr-3 d-md-block d-none">Masuk</button>
        <button className="btn btn-secondary">Daftar</button>
      </div>
    </div>
  );
};

export default Header;