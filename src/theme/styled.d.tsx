import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    main: string;
    background: string;
    thirdBackground: string;
    secBackground: string;
    textColor: string;
    iconColor: string;
    lightIconColor: string;
    iconBarColor: string;
  }
}
