// based on https://github.com/eslint/eslint/blob/master/tests/lib/formatters/junit.js
const test = require('tape');
const formatter = require('../index');

test('when there are no problems', noProblem);

test('when passed a single message', singleMessage);

test('when passed multiple messages', multipleMessages);

function multipleMessages (a) {
	a.plan(1);
	const payload = [
		{
			filePath: 'foo.js',
			messages: [
				{
					message:  'Unexpected foo.',
					severity: 2,
					line:     5,
					column:   10,
					ruleId:   'foo',
				}, {
					message:  'Unexpected bar.',
					severity: 1,
					line:     6,
					column:   11,
					ruleId:   'bar',
				},
			],
		},
	];
	const actual = formatter(payload).replace(/\n/gu, '');
	const expected = '<?xml version="1.0" encoding="utf-8"?><testsuites><testsuite package="org.eslint" time="0" tests="2" errors="2" name="foo.js"><testcase time="0" name="org.eslint.foo" classname="foo.js"><failure type="failure" message="Unexpected foo."><![CDATA[Error at foo.js:5:10 - Unexpected foo. (foo)]]></failure></testcase><testcase time="0" name="org.eslint.bar" classname="foo.js"><failure type="failure" message="Unexpected bar."><![CDATA[Warning at foo.js:6:11 - Unexpected bar. (bar)]]></failure></testcase></testsuite></testsuites>';

	a.equal(actual, expected);
}

function noProblem (t) {
	t.plan(1);
	const code = [];
	const result = formatter(code);
	t.equal(result.replace(/\n/gu, ''), '<?xml version="1.0" encoding="utf-8"?><testsuites></testsuites>');
}

function singleMessage (t) {
	t.plan(1);
	const payload = [
		{
			filePath: 'foo.js',
			messages: [
				{
					message:  'Unexpected foo.',
					severity: 2,
					line:     5,
					column:   10,
					ruleId:   'foo',
				},
			],
		},
	];

	const result = formatter(payload).replace(/\n/gu, '');
	const expected = '<?xml version="1.0" encoding="utf-8"?><testsuites><testsuite package="org.eslint" time="0" tests="1" errors="1" name="foo.js"><testcase time="0" name="org.eslint.foo" classname="foo.js"><failure type="failure" message="Unexpected foo."><![CDATA[Error at foo.js:5:10 - Unexpected foo. (foo)]]></failure></testcase></testsuite></testsuites>';

	t.equal(result, expected);
}
