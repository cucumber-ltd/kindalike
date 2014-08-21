var assert = require('assert');
var kindalike = require('..');

describe('kindalike', function () {
  it('finds and sorts matches according to match distance', function () {
    var like = kindalike('ace', ['acde', 'eca', 'ace']);
    assert.deepEqual(like, [
      { subject: 'ace', indices: [0, 1, 2] },
      { subject: 'acde', indices: [0, 1, 3] }
    ]);
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
