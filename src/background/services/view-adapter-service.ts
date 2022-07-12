import {TabsProcessorService} from './tabs-processor-service';
import {Duplicates, SummaryView} from '../../shared/types/views.type';

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

  public static getAllDuplicates(tabsService: TabsProcessorService): Duplicates {
    return tabsService.getAllDuplicatesOfTabs();
  }

  public static getGroupedDuplicates() {
    // ...
  }
}
