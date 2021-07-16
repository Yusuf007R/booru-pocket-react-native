import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    main: string;
    background: string;
    secBackground: string;
    textColor: string;
    iconColor: string;
  }
}
