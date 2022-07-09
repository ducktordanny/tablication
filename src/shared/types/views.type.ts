export type QuantityByWindows = {[windowId: number]: number};

export interface SummaryView {
  tabs: number | undefined;
  windows: number | undefined;
  duplicates: number | undefined;
  tabsByWindows: QuantityByWindows;
  duplicatesByWindows: QuantityByWindows;
}

// todo implement the other view's interfaces
