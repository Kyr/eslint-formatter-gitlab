const test = require('tape');
const zipAttributes = require('../zipAttributes');

test('zipAttributes', a => {

	a.test('should return array of zipped key values from passed object', a => {
		a.plan(1);
		const payload = {
			a: 'A',
			b: 2
		};
		const expected = [
			'a="A"',
			'b="2"'
		];
		const actual = zipAttributes(payload);
		a.deepEqual(actual, expected);
	});

	a.test('should use escapeString', a => {
		a.plan(1);
		const payload = {
			escaped: 'Unexpected <foo></foo>\b\t\n\f\r牛逼.'
		};
		const expected = [
			'escaped="Unexpected &lt;foo&gt;&lt;/foo&gt;&#8;&#9;&#10;&#12;&#13;&#29275;&#36924;."'
		];
		const actual = zipAttributes(payload);

		a.deepEqual(actual, expected);
	});
});
