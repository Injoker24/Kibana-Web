import { heroIllustration } from 'images';
import React from 'react';

import { Image } from 'react-bootstrap';

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="hero-background py-3 py-md-5 justify-content-center form-row">
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
    </>
  );
};

export default Dashboard;
