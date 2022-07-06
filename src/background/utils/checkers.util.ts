export const isMessageFromPopup = (url: string | undefined, id: string | undefined): boolean =>
  url === `chrome-extension://${id}/popup.html`;
