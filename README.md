This library implements an algorithm that is suitable for autocompletion.

The `kindalike` function takes a search string and an array of subject strings to search in:

## Example:

```javascript

var query = somethingTheUserTypes();
var subjects = someArrayOfStrings();

// matches is an Array where each element is an object
// with properties subject, indices and gaps
var matches = kindalike(query, subjects);
```

Each `match` is an object like so:

```
{ subject: 'horse', indices: [1, 4], gaps: 2 }
```

The `subject` property is the matched subject.

The `indices` property is an array of int, each representing the index in the subject
where a query character is found. In the example above the query string was `oe`, and
each of those letters were found at indices `[1, 4]`.

The `gaps` property is a number indicating how many gaps there are between letters from the
query string. In this case there was a gap of `2` - between index `1` and `4`.

The matches are sorted by the `gaps` property, ranking matches with small gaps higher.

## Rendering

Each `match` can be turned into string with `<span>` elements around each matched character:

```
h<span>o</span>rs<span>e</span>
```

By styling the `<span>` element this can be used to highlight the letters from the query.

## Demo

Just open `index.html` in a browser.