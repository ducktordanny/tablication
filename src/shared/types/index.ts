export interface TabInfo {
  id?: number;
  active: boolean;
  title?: string;
  url?: string;
  index: number;
}

export interface WindowInfo {
  id?: number;
  focused: boolean;
  tabs?: Array<TabInfo>;
}

export type TablicationData = Array<WindowInfo> | undefined;
