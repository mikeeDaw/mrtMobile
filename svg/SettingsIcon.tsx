import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SettingsIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    {...props}>
    <Path
      stroke={props.selected ? '#FFFFFF' : '#0F1729'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8h12m0 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm-6 8h12M9 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </Svg>
);
export default SettingsIcon;
