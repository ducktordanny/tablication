import {TabInfo, TablicationData} from '../../shared/types';
import {fetchAllTablicationData} from '../utils/chrome-window-tab.utils';
import {QuantityByWindows} from '../../shared/types/views.type';

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

  public getNumberOfTabsByWindows(): QuantityByWindows | undefined {
    return this.data?.reduce((previous, current) => {
      const {id, tabs} = current || {};
      if (!id || !tabs) return previous;
      previous[id] = tabs.length;
      return previous;
    }, {} as QuantityByWindows);
  }

  public getNumberOfDuplicatesByWindows(): QuantityByWindows | undefined {
    this.data?.reduce((previous, current) => {
      const {id, tabs} = current || {};
      if (!id || !tabs) return previous;
      previous[id] = this.countDuplicatesOf(tabs);
      return previous;
    }, {} as QuantityByWindows);
    return {};
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
