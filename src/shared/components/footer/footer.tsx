import { logoFacebook, logoInstagram, logoLight, logoLinkedIn, logoWhatsapp } from 'images';
import React from 'react';

import { Image } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <div className="pt-5 pb-3 bg-primary text-light">
      <div className="d-flex flex-row flex-centered">
        <div className="col-10 p-0">
          <div className="d-flex flex-row mb-5 flex-wrap">
            <div className="align-self-center col-12 col-lg-5 mb-5">
              <Image className="flex-centered mb-3" src={logoLight} alt="logo" />
              <h4 className="mb-3">Kita Bantu Anda!</h4>
              <p>Solusi nomor satu atas kebutuhan anda.</p>
            </div>
            <div className="d-flex flex-row col-12 col-lg-7 flex-wrap">
              <div className="d-flex justify-content-lg-end col-6 col-sm-4 pl-0 mb-5 mb-sm-0">
                <div className="d-flex flex-column">
                  <p className="mb-3"><b>Hubungi Kami</b></p>
                  <div className="d-flex flex-row align-items-center mb-3">
                    <Image className="footer-contact-image mr-2" src={logoFacebook} alt="lologoFacebook" />
                    <a className="text-light" href="">Facebook</a>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-3">
                    <Image className="footer-contact-image mr-2" src={logoInstagram} alt="logoInstagram" />
                    <a className="text-light" href="">Instagram</a>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-3">
                    <Image className="footer-contact-image mr-2" src={logoLinkedIn} alt="logoLinkedIn" />
                    <a className="text-light" href="">LinkedIn</a>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <Image className="footer-contact-image mr-2" src={logoWhatsapp} alt="logoWhatsapp" />
                    <a className="text-light" href="">Whatsapp</a>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-lg-end col-6 col-sm-4">
                <div className="d-flex flex-column">
                  <p className="mb-3"><b>Tentang Kami</b></p>
                  <a className="mb-3 text-light" href="">Kerjasama</a>
                  <a className="mb-3 text-light" href="">Syarat Layanan</a>
                  <a className="mb-3 text-light" href="">Kebijakan Privasi</a>
                  <a className="mb-3 text-light" href="">Perusahaan Kami</a>
                </div>
              </div>
              <div className="d-flex justify-content-lg-end col-12 col-sm-4 pl-0 pl-sm-3 pr-0">
                <div className="d-flex flex-column">
                  <p className="mb-3"><b>Pelajari</b></p>
                  <a className="mb-3 text-light" href="">Cara Kerja</a>
                  <a className="mb-3 text-light" href="">Cara Menjadi Freelancer</a>
                  <a className="mb-3 text-light" href="">Cara Menjadi Penugas</a>
                  <a className="mb-3 text-light" href="">Aturan Main</a>
                  <a className="mb-3 text-light" href="">Pembayaran</a>
                  <a className="mb-3 text-light" href="">Pencairan Uang</a>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-lg-right"><small>Developed by Michael Christian Lee, Rafaelle Richel Pearl, Anthony | Kita Bantu Anda © 2023</small></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;