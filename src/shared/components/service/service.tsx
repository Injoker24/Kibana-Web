import { IconStar } from 'images';
import React from 'react';

import { Image } from 'react-bootstrap';

interface Props {
  imageUrl: string;
  name: string;
  freelancer: {
    profileImageUrl: string;
    name: string;
  };
  averageRating: number;
  ratingAmount: number;
  tags: string[];
  price: string;
  workingTime: number;
}

const Service: React.FC<Props> = ({
  imageUrl,
  name,
  freelancer,
  averageRating,
  ratingAmount,
  tags,
  price,
  workingTime,
 }) => {
  return (
    <div className="card-sm p-0">
      <Image className="service-list-image mb-3" src={imageUrl} alt={name} />
      <div className="px-4 pb-4">
        <p className="font-weight-semibold mb-3">{name}</p>
        <div className="d-flex flex-row align-items-center justify-content-between mb-4">
          <div className="d-flex flex-row align-items-center">
            <Image className="freelancer-profile-image mr-2" src={freelancer.profileImageUrl} alt={freelancer.name} />
            <p className="text-grey"><small>{freelancer.name}</small></p>
          </div>
          <div className="d-flex flex-row">
            <div className="text-warning mr-1"><IconStar /></div>
            <p className="text-grey mr-1"><small><b>{averageRating}/5</b></small></p>
            <p className="text-muted"><small>({ratingAmount})</small></p>
          </div>
        </div>
        <div className="d-flex flex-row flex-wrap mb-2">
          {tags && tags.map((tag) => {
              return (
                <div className="chip chip-primary mr-2 mb-3">{tag}</div>
              )
          })}
        </div>
        <h3 className="text-primary-dark mb-1">Rp {price}</h3>
        <p className="text-grey"><small>Pengerjaan dalam waktu {workingTime} hari.</small></p>
      </div>
    </div>
  );
};

export default Service;