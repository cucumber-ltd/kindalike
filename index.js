function kindalike () {

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
