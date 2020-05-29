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

const Iconshouye: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M737.2 869.2H595c-22.3 0-40.4-18.1-40.4-40.4V613.9h-85.1v214.9c0 22.3-18.1 40.4-40.4 40.4H286.8c-22.3 0-40.4-18.1-40.4-40.4v-296h-78c-16.4 0-31.1-9.8-37.3-24.9-6.3-15.2-2.8-32.4 8.8-44l1.4-1.3 343-296.7c7.5-7.1 17.3-11 27.7-11s20.2 3.9 27.7 11l343.7 297.3 0.7 0.7c11.6 11.6 15 28.9 8.8 44-6.3 15.2-20.9 24.9-37.3 24.9h-78v296c0 22.3-18.1 40.4-40.4 40.4z m-131.1-51.6H726v-296c0-22.3 18.1-40.4 40.4-40.4h59.1L512 210 198.5 481.2h59.1c22.3 0 40.4 18.1 40.4 40.4v296h119.9V602.7c0-22.3 18.1-40.4 40.4-40.4h107.4c22.3 0 40.4 18.1 40.4 40.4v214.9z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconshouye.defaultProps = {
  size: 18,
};

export default Iconshouye;
