var assert = require('assert');
var kindalike = require('..');

describe('kindalike', function () {
  it('filters and sorts matches according to match gaps', function () {
    var like = kindalike('ace', ['acde', 'eca', 'ace', 'deface']);
    assert.equal(JSON.stringify(like, null, 2), JSON.stringify([
      { subject: 'ace', indices: [0, 1, 2], gaps: 0 },
      { subject: 'acde', indices: [0, 1, 3], gaps: 1 },
      { subject: 'deface', indices: [3, 4, 5], gaps: 3 },
    ], null, 2));
  });

  it('ignores case', function () {
    var like = kindalike('aCe', ['Acde', 'EcA', 'acE']);
    assert.deepEqual(like, [
      { subject: 'acE', indices: [0, 1, 2], gaps: 0 },
      { subject: 'Acde', indices: [0, 1, 3], gaps: 1 }
    ]);
  });

  describe('spans', function() {
    it('converts a match to a string with spans', function () {
      var match = { subject: 'abcdefghi', indices: [2, 4, 6], gaps: 1 };
      assert.equal(kindalike.spans(match), 'ab<span>c</span>d<span>e</span>f<span>g</span>hi');
    });

    it('escapes special characters', function () {
      var match = { subject: 'ab<>efgh"', indices: [2, 4, 6], gaps: 1 };
      assert.equal(kindalike.spans(match), 'ab<span>&lt;</span>&gt;<span>e</span>f<span>g</span>h&quot;');
    });
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
