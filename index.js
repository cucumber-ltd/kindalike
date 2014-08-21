(function () {
  'use strict';

  function kindalike (query, subjects) {
    query = query.toLowerCase();

    var result = [];
    for(var n in subjects) {
      var subject = subjects[n];
      var lowerCaseSubject = subject.toLowerCase();
      var queryIndex = 0;
      var subjectIndex = -1;
      var indices = [];
      var distance = 0;

      // Loop over the chars in the subject
      while(++subjectIndex < subject.length) {
        var queryChar = query[queryIndex];
        var subjectChar = lowerCaseSubject[subjectIndex];
        if(queryChar === subjectChar) {
          indices.push(subjectIndex);
          if(queryIndex > 0) {
            distance += indices[queryIndex] - indices[queryIndex-1] - 1;
          }
          queryIndex++;
        }
      }
      if(indices.length == query.length) {
        result.push({subject: subject, indices: indices, distance: distance});
      }
    }
    result.sort(function(r1, r2) {
      return r1.distance === r2.distance ? 0 : ( r1.distance < r2.distance ? -1 : 1);
    });
    return result;
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    // Node.js
    module.exports = kindalike;
  } else {
    if (typeof define === 'function' && define.amd) {
      // AMD
      define([], function () {
        return kindalike;
      });
    } else {
      // Browser, no AMD
      window.kindalike = kindalike;
    }
  }
})();
