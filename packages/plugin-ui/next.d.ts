/* eslint-disable @typescript-eslint/no-empty-interface */

interface BaseTheme {}

declare module "@emotion/react" {
  export interface Theme extends BaseTheme {}
}
