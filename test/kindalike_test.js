var assert = require('assert');
var kindalike = require('..');

describe('kindalike', function () {
  it('filters and sorts matches according to match distance', function () {
    var like = kindalike('ace', ['acde', 'eca', 'ace']);
    assert.deepEqual(like, [
      { subject: 'ace', indices: [0, 1, 2] },
      { subject: 'acde', indices: [0, 1, 3] }
    ]);
  });

  it('can evaluate 10000 strings in less than 50ms', function () {
    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }
    var subjects = [];
    for(var i = 0; i < 10000; i++) {
      subjects.push(randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));
    }
    var start = Date.now();
    var like = kindalike('abc', subjects);
    var duration = Date.now() - start; // 24-44 ms
    console.log(duration);
    if(duration > 50) throw new Error("Too slow: " + duration);
  });

  describe('.matches', function () {
    it('finds match indices', function () {
      var matches = kindalike.matches('ace', ['ace', 'acde', 'eca']);
      assert.deepEqual(matches, [
        [0, 1, 2],
        [0, 1, 3],
        [] // even though a is found at index 2, not all query chars are found, so we report an empty match
      ]);
    });
  });
});
