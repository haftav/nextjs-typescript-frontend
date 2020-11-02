import React, {FunctionComponent, useMemo} from 'react';
import {v4 as uuidv4} from 'uuid';
import {css} from '@emotion/core';

import {Rating} from 'models';

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

const defaultStyles = {
  width: '100%',
  height: 10,
};

interface GradientProps {
  rating: Rating;
  customStyle?: React.CSSProperties;
  fadeIn?: boolean;
  fadeOut?: boolean;
}

const Gradient: FunctionComponent<GradientProps> = ({rating, customStyle, fadeIn, fadeOut}) => {
  const id: string = useMemo(() => uuidv4(), []);
  const style = customStyle ? customStyle : defaultStyles;
  const gradient = gradients[rating];
  return (
    <svg
      data-testid="gradient-svg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      style={style}
      css={css`
        stop {
          transition: stop-color 0.3s ease-out;
        }
      `}
    >
      <defs>
        <linearGradient spreadMethod="pad" id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            data-testid="gradient-start"
            offset="0%"
            style={{
              stopColor: gradient.start,
              stopOpacity: fadeIn ? 0 : 1,
            }}
          />
          <stop
            data-testid="gradient-end"
            offset="100"
            style={{
              stopColor: gradient.end,
              stopOpacity: fadeOut ? 0 : 1,
            }}
          />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" y="0" x="0" fill={`url(#${id})`} />
    </svg>
  );
};

export default Gradient;
