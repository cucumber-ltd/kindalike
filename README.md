This library implements an algorithm that is suitable for autocompletion.

Example:

```javascript

var subjects = someArrayOfStrings();
var query = somethingTheUserTypes();

// matches is an Array where each element is an object
// with properties subject, indices and gaps
var matches = kindalike(query, subjects);
```

The matches are sorted by the `gaps` property, which is the "score" attributed to
each match.

The `indices` property is an array of int, each representing the index in the subject
where a query character is found.

The `subject` property is the matched subject.
