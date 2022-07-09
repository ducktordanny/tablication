import {TabsProcessorService} from './tabs-processor-service';
import {SummaryView} from '../../shared/types/views.type';

export class ViewAdapterService {
  public static getSummaryView(tabsService: TabsProcessorService): SummaryView {
    return {
      tabs: tabsService.getNumberOfTabs(),
      windows: tabsService.getNumberOfWindows(),
      duplicates: tabsService.getNumberOfAllDuplicates(),
      tabsByWindows: tabsService.getNumberOfTabsByWindows(),
      duplicatesByWindows: tabsService.getNumberOfDuplicatesByWindows(),
    } as SummaryView;
  }

  // todo
  public static getAllTabsView(tabsService: TabsProcessorService) {
    return undefined;
  }

  public static getTabsGroupedView(tabsService: TabsProcessorService) {
    return undefined;
  }

  public static getWindowsView(tabsService: TabsProcessorService) {
    return undefined;
  }
}
