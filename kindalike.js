(function () {
  'use strict';

  function kindalike(query, subjects) {
    query = query.toLowerCase();

    var results = [];
    subjects.forEach(function (rawSubject) {
      var subject = rawSubject.toLowerCase();
      var queryIndex = 0;
      var subjectIndex = -1;
      var result = {
        subject: rawSubject,
        indices: [],
        gaps: 0
      };

      // Loop over the chars in the subject
      while (++subjectIndex < subject.length) {
        if (query[queryIndex] === subject[subjectIndex]) {
          result.indices.push(subjectIndex);
          if (queryIndex > 0) {
            result.gaps += result.indices[queryIndex] - result.indices[queryIndex-1] - 1;
          } else {
            result.gaps += subjectIndex;
          }
          queryIndex++;
        }
      }
      if (result.indices.length == query.length) {
        results.push(result);
      }
    });
    results.sort(function (r1, r2) {
      return r1.gaps === r2.gaps ? 0 : ( r1.gaps < r2.gaps ? -1 : 1);
    });
    return results;
  }

  /**
   * Turns a match into a string with spans. Special chars are escaped.
   */
  kindalike.spans = function (match) {
    var text = '';
    var start = 0;
    for (var n = 0; n < match.indices.length; n++) {
      var i = match.indices[n];

      text += escapeHtml(match.subject.slice(start, i));
      text += '<span>';
      text += escapeHtml(match.subject[i]);
      text += '</span>';

      start = i+1;
    }
    text += escapeHtml(match.subject.slice(start));
    return text;
  }

  function escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
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
