import { IconClock } from 'images';
import React from 'react';

interface Props {
  name: string;
  description: string;
  tags: string[];
  dueDate: string;
  difficulty: string;
  price: string;
}

const Task: React.FC<Props> = ({ name, description, tags, dueDate, difficulty, price }) => {
  return (
    <div className="card-sm">
      <p
        className="font-weight-semibold mb-3 text-line-clamp line-2"
        style={{ height: '3em' }}
      >
        {name}
      </p>
      <p
        className="mb-3 text-grey text-line-clamp line-4"
        style={{ height: '6em' }}
      >
        {description}
      </p>
      <div className="d-flex flex-row flex-wrap">
        {tags &&
          tags.map((tag) => {
            return (
              <div
                key={tag}
                className="chip chip-primary mr-2 mb-3"
              >
                {tag}
              </div>
            );
          })}
      </div>
      <div className="d-flex flex-row mb-3">
        <div className="text-primary-dark mr-2">
          <IconClock />
        </div>
        <p className="text-grey">
          <small>Deadline {dueDate}</small>
        </p>
      </div>
      <div className="d-flex flex-row">
        <p className="text-grey">
          <small>Tingkat Kesulitan</small>
        </p>
      </div>
      <div className="d-flex flex-row flex-wrap">
        <h3 className="text-primary-dark mb-0 col-12 col-sm-6 p-0 mb-3 mb-sm-0">{difficulty}</h3>
        <h3 className="text-primary-dark mb-0 col-12 col-sm-6 p-0 text-sm-right">Rp {price}</h3>
      </div>
    </div>
  );
};

export default Task;
