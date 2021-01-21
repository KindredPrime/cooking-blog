import camelCase from 'camelcase';

// Convert a date string to a friendly format
function formatDate(date) {
  // Wed Jul 28 1993 15:43:20 GMT+0200 (CEST)
  const dateString = new Date(date).toString();
  const dateArray = dateString.split(' ');

  // 15:43:20 Jul 28, 1993
  return `${dateArray[4]} ${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
}

// Returns true of the current 'page' of entities is the last group
function isOnLastPage(entities, page, pageLimit) {
  return page * pageLimit > entities.length;
}

// Sorts the comments by their timestamp, descending
function sortEntities(entities) {
  return entities.sort((a, b) => {
    return Date.parse(b.lastEdited) - Date.parse(a.lastEdited);
  });
}

/**
 * Convert the name of every field in the provided JSON object (or array of JSON objects) into
 * camelCase format
 *
 * @param {*} jsonObj
 */
function convertToCamelCase(jsonObj) {
  if (Array.isArray(jsonObj)) {
    const camelJsonArray = [];
    for (const elem of jsonObj) {
      camelJsonArray.push(convertToCamelCase(elem));
    }

    return camelJsonArray;
  }

  else {
    const camelJson = {};
    for(const fieldName in jsonObj) {
      let fieldValue = jsonObj[fieldName];
      let camelFieldValue = fieldValue;
      if (typeof fieldValue === 'object') {
        camelFieldValue = convertToCamelCase(fieldValue);
      }

      const camelFieldName = camelCase(fieldName);
      camelJson[camelFieldName] = camelFieldValue;
    }

    return camelJson;
  }
}

/**
 * For each function in the provided object, add each tail function to be run afterward,
 * sequentially
 *
 * @param {Object} funcsObj - a collection of functions to be modified
 * @param {Array} tailFuncs - the functions to run afterward
 */
function addTailFunction(funcsObj, tailFuncs) {
  for(const tailFunc of tailFuncs) {
    for(const funcName in funcsObj) {
      const origFunc = funcsObj[funcName];
      funcsObj[funcName] = (...args) => origFunc(...args).then(tailFunc);
    }
  }

  return funcsObj;
}

export {
  formatDate,
  isOnLastPage,
  sortEntities,
  convertToCamelCase,
  addTailFunction
};