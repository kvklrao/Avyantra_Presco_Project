/**
 * Common functions that are used across the app
 * @type {{addCommas: (function(*): string)}, {printLog: (function(*): string)}}
 */

module.exports = {
    //Print logs
    printLog: function (page, number, args) {
      // If page[] = some name and number[] = corresponding page's number
      console.log(page,number,args);
      let displayPages = [];
      if (displayPages.includes(page)) {
        console.log(new Date(), arguments);
      }
    }
  };
  