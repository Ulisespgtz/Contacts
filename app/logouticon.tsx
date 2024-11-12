// icon:bx-log-in | Boxicons https://boxicons.com/ | Atisa
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconBxLogIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <Path d="M13 16l5-4-5-4v3H4v2h9z" />
      <Path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" />
    </Svg>
  );
}

export default IconBxLogIn;
