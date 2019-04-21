const test = require('tape');
const escape = require('../escapeString');

test('should replace unexpected character in string', a => {
	a.plan(1);
	const payload = 'Unexpected <foo></foo>\b\t\n\f\r牛逼.';
	const expected = 'Unexpected &lt;foo&gt;&lt;/foo&gt;&#8;&#9;&#10;&#12;&#13;&#29275;&#36924;.';
	const actual = escape(payload);

	a.equal(actual, expected);
});
