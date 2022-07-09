export type QuantityByWindows = {windowId: number; number: number};
export type QuantityByWindowsList = Array<QuantityByWindows>;

export interface SummaryView {
  tabs: number | undefined;
  windows: number | undefined;
  duplicates: number | undefined;
  tabsByWindows: QuantityByWindowsList;
  duplicatesByWindows: QuantityByWindowsList;
}

// todo implement the other view's interfaces
