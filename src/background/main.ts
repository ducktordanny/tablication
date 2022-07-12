import {isMessageFromPopup} from './utils/checkers.util';
import {TabsProcessorService} from './services/tabs-processor-service';
import {ViewAdapterService} from './services/view-adapter-service';

const tabsProcessorService = new TabsProcessorService();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!isMessageFromPopup(sender.url, sender.id)) return;

  if (message.name === 'get-tablication-data')
    sendResponse(tabsProcessorService.getStoredState());
  else if (message.name === 'get-summary-view-data')
    sendResponse(ViewAdapterService.getSummaryView(tabsProcessorService));
  else if (message.name === 'get-all-duplicates-data')
    sendResponse(ViewAdapterService.getAllDuplicates(tabsProcessorService));
  else if (message.name === 'get-grouped-duplicates-data')
    sendResponse('wip');
  else {
    const error = 'OnMessageError: Invalid message name!';
    console.error(error);
    sendResponse({error});
  }
});

chrome.tabs.onCreated.addListener(() =>
  tabsProcessorService
    .requestCurrentState()
    .catch((err) => console.error(`tabs.onCreated: ${err}`)),
);

chrome.tabs.onRemoved.addListener(() =>
  tabsProcessorService
    .requestCurrentState()
    .catch((err) => console.error(`tabs.onRemoved: ${err}`)),
);

chrome.windows.onCreated.addListener(() =>
  tabsProcessorService
    .requestCurrentState()
    .catch((err) => console.error(`windows.onCreated: ${err}`)),
);

chrome.windows.onRemoved.addListener(() =>
  tabsProcessorService
    .requestCurrentState()
    .catch((err) => console.error(`windows.onRemoved: ${err}`)),
);

tabsProcessorService
  .requestCurrentState()
  .catch((err) => console.error(`Initialization: ${err}`));
