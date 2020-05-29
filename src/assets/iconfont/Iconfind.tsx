/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const Iconfind: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M870.057 358.26c-19.628-46.406-47.727-88.084-83.516-123.873-35.787-35.787-77.462-63.886-123.871-83.515-48.049-20.322-99.086-30.626-151.693-30.626-52.608 0-103.646 10.304-151.694 30.626C312.876 170.5 271.2 198.6 235.412 234.387c-35.79 35.79-63.888 77.466-83.515 123.873-20.322 48.048-30.627 99.084-30.627 151.693s10.305 103.647 30.627 151.695c19.628 46.406 47.725 88.082 83.515 123.873 35.789 35.789 77.465 63.887 123.87 83.514 48.05 20.322 99.087 30.627 151.695 30.627 52.609 0 103.646-10.304 151.694-30.627 46.407-19.628 88.082-47.726 123.872-83.514 35.789-35.79 63.887-77.466 83.514-123.873 20.323-48.048 30.627-99.085 30.627-151.695S890.38 406.307 870.057 358.26z m-136.13-43.04L591.66 582.042a20.773 20.773 0 0 1-8.593 8.592l-266.823 142.27a20.925 20.925 0 0 1-9.808 2.451 20.725 20.725 0 0 1-14.754-6.108c-6.536-6.537-8.005-16.408-3.655-24.564L430.29 437.858a20.782 20.782 0 0 1 8.592-8.592l266.823-142.264a20.93 20.93 0 0 1 9.808-2.453c5.572 0 10.812 2.17 14.754 6.107 6.535 6.536 8.006 16.407 3.66 24.563z"
        fill={getIconColor(color, 0, '#33A3F4')}
      />
      <Path
        d="M510.977 547.58c-9.904 0-19.6-4.016-26.606-11.02-7.005-7.006-11.021-16.704-11.021-26.607s4.016-19.6 11.02-26.606c7.005-7.004 16.703-11.02 26.607-11.02 9.905 0 19.602 4.016 26.606 11.02 7.004 7.004 11.02 16.702 11.02 26.606s-4.016 19.603-11.02 26.606c-7.004 7.005-16.702 11.021-26.606 11.021z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

Iconfind.defaultProps = {
  size: 18,
};

export default Iconfind;
