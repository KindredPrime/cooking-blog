// Converts the date object into an easily readable string
function formatDate(date) {
  //Original: Date(Sat Dec 19 2020 07:37:16 GMT-0500 (Eastern Standard Time))
  //New: 'Dec 19 2020 07:37:16'
  return date.toString().split(' ').slice(1, 5).join(' ');
}

export {
  formatDate
};