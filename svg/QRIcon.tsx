import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
const QRIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    height={24}
    width={24}
    {...props}>
    <G fill={props.selected ? '#FFFFFF' : '#0F1729'}>
      <Path d="M23 4a3 3 0 0 0-3-3h-4a1 1 0 1 0 0 2h4a1 1 0 0 1 1 1v4a1 1 0 1 0 2 0V4ZM23 16a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1h-4a1 1 0 1 0 0 2h4a3 3 0 0 0 3-3v-4ZM4 21a1 1 0 0 1-1-1v-4a1 1 0 1 0-2 0v4a3 3 0 0 0 3 3h4a1 1 0 1 0 0-2H4ZM1 8a1 1 0 0 0 2 0V4a1 1 0 0 1 1-1h4a1 1 0 0 0 0-2H4a3 3 0 0 0-3 3v4Z" />
      <Path
        fillRule="evenodd"
        d="M11 6a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6ZM9 7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1ZM18 13a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4Zm-3 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Z"
        clipRule="evenodd"
      />
      <Path d="M14 5a1 1 0 1 0 0 2h2.5a.5.5 0 0 1 .5.5V10a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1h-4Z" />
      <Path d="M14 8a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1ZM6 13a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-.5a.5.5 0 0 1 .5-.5H10a1 1 0 1 0 0-2H6ZM10 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    </G>
  </Svg>
);
export default QRIcon;
