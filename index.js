function kindalike () {

}

function matches (q, strings) {
  var result = [];
  for(var n in strings) {
    var s = strings[n];
    var j = -1;
    var matches = [];
    for(var i in q) {
      var qc = q[i];
      while(++j < s.length) {
        var sc = s[j];
        if(qc === sc) {
          matches.push(j);
          break;
        }
      }
    }
    result.push(matches);
  }
  return result;
}

kindalike.matches = matches;

module.exports = kindalike;
