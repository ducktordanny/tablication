import {fetchAllTablicationData} from './utils/chrome-window-tab.utils';
import {isMessageFromPopup} from './utils/checkers.util';

import {TablicationData} from '../shared/types';

let tablicationData: TablicationData = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!isMessageFromPopup(sender.url, sender.id)) return;
  if (message.name === 'get-tablication-data') sendResponse(tablicationData);
});

fetchAllTablicationData()
  .then(response => {
    console.log(response);
    return response;
  })
  .then(response => tablicationData = response);
