import {fetchAllTablicationData} from '../utils/chrome-window-tab.utils';
import {TabInfo, TablicationData} from '../../shared/types';
import {QuantityByWindows, QuantityByWindowsList} from '../../shared/types/views.type';

export class TabsProcessorService {
  private data: TablicationData = [];

  public async requestCurrentState(): Promise<TablicationData> {
    const response = await fetchAllTablicationData();
    this.data = response;
    return response;
  }

  public getStoredState(): TablicationData {
    return this.data?.slice();
  }

  public getNumberOfWindows(): number | undefined {
    return this.data?.length;
  }

  public getNumberOfTabs(): number | undefined {
    return this.data?.reduce(
      (previous, current) => (current?.tabs?.length || 0) + previous,
      0,
    );
  }

  public getAllTabs(): Array<TabInfo> | undefined {
    return this.data?.reduce(
      (previous, current) => previous.concat(current?.tabs || []),
      [] as Array<TabInfo>,
    );
  }

  public getNumberOfAllDuplicates(): number | undefined {
    const tabs = this.getAllTabs();
    if (!tabs) return;
    return this.countDuplicatesOf(tabs);
  }

  public getNumberOfTabsByWindows(): QuantityByWindowsList | undefined {
    const filteredData = this.data?.filter(window => window.id && window.tabs);
    return filteredData?.map(window => {
      const {id, tabs} = window;
      return {
        windowId: id,
        number: tabs?.length,
      } as QuantityByWindows;
    });
  }

  public getNumberOfDuplicatesByWindows(): QuantityByWindowsList | undefined {
    const filteredData = this.data?.filter(window => window.id && window.tabs);
    return filteredData?.map(window => {
      const {id, tabs} = window;
      return {
        windowId: id,
        number: this.countDuplicatesOf(tabs || []),
      } as QuantityByWindows;
    }).filter(quantity => quantity.number > 0);
  }

  private countDuplicatesOf(tabs: Array<TabInfo>): number {
    const mapOfTabUrlsOpened = tabs.reduce((previous, current) => {
      const url = current?.url;
      if (!url) return previous;
      previous[url] = (previous[url] || 0) + 1;
      return previous;
    }, {} as Record<string, number>);

    return Object.values(mapOfTabUrlsOpened).filter((number) => number > 1)
      .length;
  }
}
