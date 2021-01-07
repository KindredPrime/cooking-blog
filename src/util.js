// Converts the date object into an easily readable string
function formatDate(date) {
  //Original: Date(Sat Dec 19 2020 07:37:16 GMT-0500 (Eastern Standard Time))
  //New: 'Dec 19 2020 07:37:16'
  return date.toString().split(' ').slice(1, 5).join(' ');
}

// Returns true of the current 'page' of comments is the last group
function isOnLastPage(comments, page, pageLimit) {
  return page * pageLimit > comments.length;
}

// Sorts the comments by their timestamp, descending
function sortComments(comments) {
  return comments.sort((a, b) => {
    return b.lastEdited.valueOf() - a.lastEdited.valueOf();
  });
}

export {
  formatDate,
  isOnLastPage,
  sortComments
};