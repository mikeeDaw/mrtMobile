import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const RArrow = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={props.width}
    height={props.height}
    {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m10 7 5 5-5 5"
    />
  </Svg>
);
export default RArrow;
