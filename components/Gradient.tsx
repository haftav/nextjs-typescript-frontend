import React, {FunctionComponent, useMemo} from 'react';
import {v4 as uuidv4} from 'uuid';

export type GradientEntity = {
  start: string;
  end: string;
};

interface GradientList {
  1: GradientEntity;
  2: GradientEntity;
  3: GradientEntity;
  4: GradientEntity;
}

const gradients: GradientList = {
  1: {
    start: '#7EABFF',
    end: '#5F78FF',
  },
  2: {
    start: '#8B60FF',
    end: '#D95CFF',
  },
  3: {
    start: '#DF5CFE',
    end: '#FA5252',
  },
  4: {
    start: '#FA5253',
    end: '#FFA700',
  },
};

interface GradientProps {
  rating: number;
}

const Gradient: FunctionComponent<GradientProps> = ({rating}) => {
  const id: string = useMemo(() => uuidv4(), []);
  const gradient = gradients[rating];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{width: '100%', height: 25}}>
      <defs>
        <linearGradient spreadMethod="pad" id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            style={{
              stopColor: gradient.start,
              stopOpacity: 1,
            }}
          />
          <stop
            offset="100"
            style={{
              stopColor: gradient.end,
              stopOpacity: 1,
            }}
          />
        </linearGradient>
      </defs>
      <rect width="100%" y="0" x="0" fill={`url(#${id})`} />
    </svg>
  );
};

export default Gradient;