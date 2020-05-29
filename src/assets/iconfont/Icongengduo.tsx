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

const Icongengduo: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M141.003 94.607l418.25 418.25-76.933 76.932-418.25-418.25z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M64.064 854.654l418.25-418.25 76.932 76.932-418.25 418.25z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M542.108 94.584l418.25 418.25-76.933 76.932-418.25-418.25z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M465.17 854.677l418.25-418.25 76.932 76.932-418.25 418.25z"
        fill={getIconColor(color, 3, '#333333')}
      />
    </Svg>
  );
};

Icongengduo.defaultProps = {
  size: 18,
};

export default Icongengduo;
