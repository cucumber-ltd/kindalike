var assert = require('assert');
var kindalike = require('..');

describe('kindalike', function () {
  describe('.matches', function () {
    it('finds match indices', function () {
      var matches = kindalike.matches('ace', ['ace', 'acde']);
      assert.deepEqual(matches, [
        [0, 1, 2],
        [0, 1, 3]
      ]);
    });
  });
});
