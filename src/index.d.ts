import { ReactElement, ReactNode} from 'react';

declare module 'react-children-utilities' {

  export interface IKeyChildren {
    [name: string]: ReactNode;
  }

  export interface ICallback {
    (child: ReactElement<any>, index?: number): any
  }

  export function filter(children: ReactNode, filterFn: ICallback): ReactNode

  export function deepFilter(children: ReactNode, deepFilterFn: ICallback): ReactNode

  export function groupByType(children: ReactNode, types: string[], rest?: string): IKeyChildren

  export function deepMap(children: ReactNode, deepMapFn: ICallback): ReactNode

  export function deepForEach(children: ReactNode, deepForEachFn: ICallback): void

  export function deepFind(children: ReactNode, deepFindFn: ICallback): ReactElement<any>

  export function onlyText(children: ReactNode): string
}
