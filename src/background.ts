import {TabInfo, TablicationData, WindowInfo} from './types';

import Tab = chrome.tabs.Tab;
import Window = chrome.windows.Window;

let tablicationData: TablicationData = [];

async function fetchAllTablicationData(): Promise<TablicationData> {
  const chromeWindows = await chrome.windows.getAll();
  return mapChromeWindows(chromeWindows);
}

async function mapChromeWindows(windows: Array<Window>): Promise<TablicationData> {
  const tablicationData = windows.map((window: Window) => {
    const {id, focused} = window;
    return {id, focused} as WindowInfo;
  });
  for (const window of tablicationData) window.tabs = await fetchChromeTabsOf(window.id);
  return tablicationData;
}

async function fetchChromeTabsOf(windowId: number | undefined): Promise<Array<TabInfo>> {
  const chromeTabs = await chrome.tabs.query({windowId});
  return chromeTabs.map((chromeTab: Tab) => {
    const {id, active, title, url, index} = chromeTab;
    return {id, active, title, url, index} as TabInfo;
  });
}

fetchAllTablicationData()
  .then(response => {
    console.log(response);
    return response;
  })
  .then(response => tablicationData = response);
