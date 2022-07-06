import {TabInfo, TablicationData, WindowInfo} from '../../shared/types';

import Tab = chrome.tabs.Tab;
import Window = chrome.windows.Window;

export async function fetchAllTablicationData(): Promise<TablicationData> {
  const chromeWindows = await chrome.windows.getAll();
  return mapChromeWindows(chromeWindows);
}

export async function mapChromeWindows(windows: Array<Window>): Promise<TablicationData> {
  const tablicationData = windows.map((window: Window) => {
    const {id, focused} = window;
    return {id, focused} as WindowInfo;
  });
  for (const window of tablicationData) window.tabs = await fetchChromeTabsOf(window.id);
  return tablicationData;
}

export async function fetchChromeTabsOf(windowId: number | undefined): Promise<Array<TabInfo>> {
  const chromeTabs = await chrome.tabs.query({windowId});
  return chromeTabs.map((chromeTab: Tab) => {
    const {id, active, title, url, index} = chromeTab;
    return {id, active, title, url, index} as TabInfo;
  });
}
