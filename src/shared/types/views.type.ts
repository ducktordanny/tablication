import {TabInfo} from './index';

export type QuantityByWindows = {windowId?: number; number: number};
export type QuantityByWindowsList = Array<QuantityByWindows>;

export interface SummaryView {
  tabs: number | undefined;
  windows: number | undefined;
  duplicates: number | undefined;
  tabsByWindows: QuantityByWindowsList;
  duplicatesByWindows: QuantityByWindowsList;
}

export interface ExtendedTabInfo extends TabInfo {
  windowId: number;
}

export type TabGroup = Array<ExtendedTabInfo>;

export type Duplicates = Array<TabGroup>;
