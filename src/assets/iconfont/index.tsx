/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import Iconerji from './Iconerji';
import Iconshengyin from './Iconshengyin';
import Iconhuanyipi from './Iconhuanyipi';
import Icongengduo from './Icongengduo';
import Iconxihuan from './Iconxihuan';
import Iconfind from './Iconfind';
import IconmyS from './IconmyS';
import Iconwoting from './Iconwoting';
import Iconshouye from './Iconshouye';

export type IconNames = 'iconerji' | 'iconshengyin' | 'iconhuanyipi' | 'icongengduo' | 'iconxihuan' | 'iconfind' | 'iconmy_s' | 'iconwoting' | 'iconshouye';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'iconerji':
      return <Iconerji {...rest} />;
    case 'iconshengyin':
      return <Iconshengyin {...rest} />;
    case 'iconhuanyipi':
      return <Iconhuanyipi {...rest} />;
    case 'icongengduo':
      return <Icongengduo {...rest} />;
    case 'iconxihuan':
      return <Iconxihuan {...rest} />;
    case 'iconfind':
      return <Iconfind {...rest} />;
    case 'iconmy_s':
      return <IconmyS {...rest} />;
    case 'iconwoting':
      return <Iconwoting {...rest} />;
    case 'iconshouye':
      return <Iconshouye {...rest} />;
  }

  return null;
};

export default IconFont;
