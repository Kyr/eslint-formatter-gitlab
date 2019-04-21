const test = require('tape');
const formatter = require('../lib/formatMessage');

test('formatter for warning message', warningMessage);
test('formatter for error message', errorMessage);
test('formatter for fatal message', fatalMessage);

function warningMessage (a) {
	a.plan(1);
	const payload = {
		message:  'Unexpected foo.',
		severity: 1,
		line:     5,
		column:   10,
		ruleId:   'foo',
	};
	const actual = formatter.call({filePath: 'foo.js'}, payload);
	const expected = '<testcase time="0" name="org.eslint.foo" classname="foo.js"><failure type="failure" message="Unexpected foo."><![CDATA[Warning at foo.js:5:10 - Unexpected foo. (foo)]]></failure></testcase>';
	a.equal(actual, expected);
}

function errorMessage (a) {
	a.plan(1);
	const payload = {
		ruleId:   'curly',
		severity: 2,
		message:  'Expected { after \'if\' condition.',
		line:     2,
		column:   1,
		nodeType: 'IfStatement',
	};
	const actual = formatter.call({filePath: 'foo.js'}, payload);

	a.equal(actual, '<testcase time="0" name="org.eslint.curly" classname="foo.js"><failure type="failure" message="Expected { after &apos;if&apos; condition."><![CDATA[Error at foo.js:2:1 - Expected { after \'if\' condition. (curly)]]></failure></testcase>');
}

function fatalMessage (a) {
	a.plan(1);
	const payload = {
		fatal:   true,
		message: 'Something went wrong',
	};
	const actual = formatter.call({filePath: 'foo.js'}, payload);
	const expected = '<testcase time="0" name="org.eslint.error" classname="foo.js"><failure type="failure" message="Something went wrong"><![CDATA[Error at foo.js - Something went wrong]]></failure></testcase>';

	a.equal(actual, expected);
}
