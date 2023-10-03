chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
  const currentUrl = tabs[0].url;
  const regexVideo = /(?:watch\?v=)(.*?)(?:&|$)/;
  const regexPlaylist = /(?:playlist\?list=)(.*?)(?:&|$)/;
  const regexList = /(?:\&list=)(.*?)(?:&|$)/;
  const videoMatch = currentUrl.match(regexVideo);
  const playlistMatch = currentUrl.match(regexPlaylist);
  const listMatch = currentUrl.match(regexList);
  const localStoragePort = await chrome.storage.sync.get(['ytViewPort']);
  const portNumber = localStoragePort?.ytViewPort || 3999
  const localhostUrl = `http://localhost:${portNumber}/?`
  let newTabUrl;

  if (playlistMatch && playlistMatch[1]) {
    newTabUrl = `${localhostUrl}playlist=${playlistMatch[1]}`
  } else if (listMatch && listMatch[1]) {
    newTabUrl = `${localhostUrl}playlist=${listMatch[1]}`
  } else if (videoMatch && videoMatch[1]) {
    newTabUrl = localhostUrl + 'video=' + videoMatch[1]
  }

  if (newTabUrl) chrome.tabs.create({ url: newTabUrl });
});
