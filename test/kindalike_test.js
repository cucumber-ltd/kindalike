var assert = require('assert');
var kindalike = require('..');

describe('kindalike', function () {
  it('filters and sorts matches according to match gaps', function () {
    var like = kindalike('ace', ['acde', 'eca', 'ace']);
    assert.deepEqual(like, [
      { subject: 'ace', indices: [0, 1, 2], gaps: 0 },
      { subject: 'acde', indices: [0, 1, 3], gaps: 1 }
    ]);
  });

  it('ignores case', function () {
    var like = kindalike('aCe', ['Acde', 'EcA', 'acE']);
    assert.deepEqual(like, [
      { subject: 'acE', indices: [0, 1, 2], gaps: 0 },
      { subject: 'Acde', indices: [0, 1, 3], gaps: 1 }
    ]);
  });

  for(var n = 0; n < 50; n++) {
    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }
    it('can evaluate 10000 strings in less than 50ms', function () {
      var subjects = [];
      for(var i = 0; i < 10000; i++) {
        subjects.push(randomString(32, 'abcdefghijklmnopqrstuvwxyz'));
      }
      var start = Date.now();
      var like = kindalike('abcde', subjects);
      var duration = Date.now() - start;
      console.log(duration, like.length, duration/like.length);
      if(duration > 50) throw new Error("Too slow: " + duration);
    });
  }
});
