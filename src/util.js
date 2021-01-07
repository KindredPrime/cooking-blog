// Converts the date object into an easily readable string
function formatDate(date) {
  if (!date) {
    return null;
  }

  //Original: Date(Sat Dec 19 2020 07:37:16 GMT-0500 (Eastern Standard Time))
  //New: 'Dec 19 2020 07:37:16'
  return date.toString().split(' ').slice(1, 5).join(' ');
}

// Returns true of the current 'page' of entities is the last group
function isOnLastPage(entities, page, pageLimit) {
  return page * pageLimit > entities.length;
}

// Sorts the comments by their timestamp, descending
function sortEntities(entities) {
  return entities.sort((a, b) => {
    return b.lastEdited.valueOf() - a.lastEdited.valueOf();
  });
}

export {
  formatDate,
  isOnLastPage,
  sortEntities
};