var assert = require('assert');
var kindalike = require('..');

describe('kindalike', function () {
  it('ranks matches according to closeness of hits', function () {
    var matches = kindalike('ace', ['ace', 'acde']);
    assert.deepEqual(matches, [
      {match: 'abc', distance: 0},
      {match: 'abbc', distance: 1} // 1 char from c to e
    ]);
  });
});
