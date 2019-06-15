import { ReactChild, ReactElement, ReactNode} from 'react';

declare module 'react-children-utilities' {

  export interface GroupedChildren {
    [name: string]: ReactNode;
  }

  export interface ForEachFn {
    (child: ReactChild, index?: number, children?: ReactNode): void;
  }

  export interface FilterFn {
    (child: ReactChild, index?: number, children?: ReactNode): boolean;
  }

  export interface FindFn {
    (child: ReactChild, index?: number, children?: ReactNode): boolean;
  }

  export interface MapFn {
    (child: ReactChild, index?: number, children?: ReactNode): void;
  }

  export function filter(children: ReactNode, filterFn: FilterFn): ReactNode

  export function deepFilter(children: ReactNode, deepFilterFn: FilterFn): ReactNode

  export function groupByType(children: ReactNode, types: string[], rest?: string): GroupedChildren

  export function deepMap(children: ReactNode, deepMapFn: MapFn): ReactNode

  export function deepForEach(children: ReactNode, deepForEachFn: ForEachFn): void

  export function deepFind(children: ReactNode, deepFindFn: FindFn): ReactElement<any>

  export function onlyText(children: ReactNode): string

  export function hasChildren(child: ReactElement<any>): boolean

  export function hasComplexChildren(child: ReactElement<any>): boolean
}
