declare module "intel-hex" {
  export interface IntelHexResult {
    data: number[];
    adress: number;
  }

  export function parse(hex: string): IntelHexResult;
}
