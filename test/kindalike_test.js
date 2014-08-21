var assert = require('assert');
var kindalike = require('..');

describe('kindalike', function () {
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
