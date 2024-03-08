import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Check = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      stroke="#FFFFFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M4 12.611 8.923 17.5 20 6.5"
    />
  </Svg>
);
export default Check;
