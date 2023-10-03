chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({ title: "Open with YT View", contexts: ["link"], id: 'yt-view-open'})
});

chrome.contextMenus.onClicked.addListener(async function(info, tab) {
  if (info.menuItemId === "yt-view-open") {
    const linkUrl = info.linkUrl;
    const regexVideo = /(?:watch\?v=)(.*?)(?:&|$)/;
    const regexPlaylist = /(?:playlist\?list=)(.*?)(?:&|$)/;
    const regexList = /(?:\&list=)(.*?)(?:&|$)/;
    const videoMatchContextMenu = linkUrl.match(regexVideo);
    const playlistMatchContextMenu = linkUrl.match(regexPlaylist);
    const listMatchContextMenu = linkUrl.match(regexList);
    const localStoragePort = await chrome.storage.sync.get(['ytViewPort']);
    const portNumber = localStoragePort?.ytViewPort || 3999;
    const localhostUrl = `http://localhost:${portNumber}/?`;
    let newTabUrlContextMenu;
  
    if (playlistMatchContextMenu && playlistMatchContextMenu[1]) {
      newTabUrlContextMenu = `${localhostUrl}playlist=${playlistMatchContextMenu[1]}`;
    } else if (listMatchContextMenu && listMatchContextMenu[1]) {
      newTabUrlContextMenu = `${localhostUrl}playlist=${listMatchContextMenu[1]}`;
    } else if (videoMatchContextMenu && videoMatchContextMenu[1]) {
      newTabUrlContextMenu = localhostUrl + 'video=' + videoMatchContextMenu[1];
    }
  
    if (newTabUrlContextMenu) chrome.tabs.create({ url: newTabUrlContextMenu });
  }
});