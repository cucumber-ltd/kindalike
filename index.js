function kindalike (query, subjects) {
  var results = [];
  var ms = matches(query, subjects);
  for(var n in ms) {
    var match = ms[n];
    if(match.length != 0) {
      results.push({subject: subjects[n], indices: match});
    }
  }
  results.sort(function(r1, r2) {
    var d1 = distance(r1);
    var d2 = distance(r2);
    return d1===d2 ? 0 : ( d1 < d2 ? -1 : 1);
  });
  return results;
}

function distance(result) {
  var indices = result.indices;
  var d = 0;
  for(var n = 0; n < indices.length-1; n++) {
    d += (indices[n+1] - indices[n] - 1);
  }
  return d;
}

function matches (query, subjects) {
  var result = [];
  for(var n in subjects) {
    var subject = subjects[n];
    var queryIndex = 0;
    var subjectIndex = -1;
    var matches = [];

    // Loop over the chars in the subject
    while(++subjectIndex < subject.length) {
      var queryChar = query[queryIndex];
      var subjectChar = subject[subjectIndex];
      if(queryChar === subjectChar) {
        matches.push(subjectIndex);
        queryIndex++;
      }
    }
    if(matches.length == query.length) {
      result.push(matches);
    } else {
      result.push([]);
    }
  }
  return result;
}

kindalike.matches = matches;

module.exports = kindalike;
