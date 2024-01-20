import { IconClock } from 'images';
import React from 'react';

const Task: React.FC = () => {
    return (
       <div className="card-sm">
          <p className="font-weight-semibold">Frontend Developer Handal dalam Bootstrap</p>
          <p>Saya mencari seorang frontend developer dengan keahlian dalam HTML, CSS & JavaScript. Saya juga membutuhkan pemrograman kustom dan penggunaan Bootstrap...</p>
          <div className="chip chip-primary">Frontend Developer</div>
          <div className="chip chip-primary">HTML</div>
          <div className="chip chip-primary">Bootstrap</div>
          <div className="chip chip-primary">CSS</div>
          <div className="text-primary-dark"><IconClock /></div>
          <p><small>Deadline 20 Oktober 2023</small></p>
          <p><small>Tingkat Kesulitan</small></p>
          <h3 className="text-primary-dark">Expert</h3>
          <h3 className="text-primary-dark">Rp 1,800,000</h3>
       </div>
    );
};

export default Task;