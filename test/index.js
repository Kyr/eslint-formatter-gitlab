const test = require('tape');
const formatter = require('../index');

test('when there are no problems', noProblem);

test('format report', formatReport);

function formatReport (test) {
	test.plan(1);
	const payload = [
		{
			'filePath':            'fixtures/app/fullOfProblem.js',
			'messages':            [
				{
					'ruleId':    'no-unused-vars',
					'severity':  2,
					'message':   '\'addOne\' is defined but never used.',
					'line':      1,
					'column':    10,
					'nodeType':  'Identifier',
					'endLine':   1,
					'endColumn': 16,
				},
				{
					'ruleId':    'use-isnan',
					'severity':  2,
					'message':   'Use the isNaN function to compare with NaN.',
					'line':      2,
					'column':    6,
					'nodeType':  'BinaryExpression',
					'messageId': 'useIsNaN',
					'endLine':   2,
					'endColumn': 14,
				},
				{
					'ruleId':   'semi',
					'severity': 2,
					'message':  'Missing semicolon.',
					'line':     3,
					'column':   14,
					'nodeType': 'ReturnStatement',
					'fix':      {
						'range': [
							51,
							51,
						],
						'text':  ';',
					},
				},
				{
					'ruleId':   'semi',
					'severity': 2,
					'message':  'Missing semicolon.',
					'line':     5,
					'column':   9,
					'nodeType': 'ReturnStatement',
					'fix':      {
						'range': [
							70,
							70,
						],
						'text':  ';',
					},
				},
				{
					'ruleId':    'no-extra-semi',
					'severity':  2,
					'message':   'Unnecessary semicolon.',
					'line':      7,
					'column':    2,
					'nodeType':  'EmptyStatement',
					'messageId': 'unexpected',
					'endLine':   7,
					'endColumn': 3,
					'fix':       {
						'range': [
							74,
							76,
						],
						'text':  '}',
					},
				},
			],
			'errorCount':          5,
			'warningCount':        0,
			'fixableErrorCount':   3,
			'fixableWarningCount': 0,
			'source':              'function addOne(i) {\n\tif (i != NaN) {\n\t\treturn i ++\n\t} else {\n\t\treturn\n\t}\n};\n',
		},
		{
			'filePath':            'fixtures/app/tooComplex.js',
			'messages':            [
				{
					'ruleId':    'no-unused-vars',
					'severity':  1,
					'message':   '\'toComplex\' is defined but never used.',
					'line':      1,
					'column':    10,
					'nodeType':  'Identifier',
					'endLine':   1,
					'endColumn': 19,
				},
				{
					'ruleId':    'no-constant-condition',
					'severity':  2,
					'message':   'Unexpected constant condition.',
					'line':      2,
					'column':    5,
					'nodeType':  'BinaryExpression',
					'messageId': 'unexpected',
					'endLine':   2,
					'endColumn': 10,
				},
			],
			'errorCount':          1,
			'warningCount':        1,
			'fixableErrorCount':   2,
			'fixableWarningCount': 0,
			'source':              'function toComplex(){\n\tif(2 > 1) {\n\t\tif ( 2 >1){\n\t\t\tif ( 2 >1){\n\t\t\t\t;\n\t\t\t} else {\n\t\t\t\t;\n\t\t\t}\n\t\t\t;\n\t\t} else {\n\t\t\tif ( 2 >1){\n\t\t\t\t;\n\t\t\t} else {\n\t\t\t\t;\n\t\t\t}\n\t\t\t;\n\t\t}\n\n\t}else {\n\t\tif (2 > 1) {\n\t\t\tif ( 2 >1){\n\t\t\t\t;\n\t\t\t} else {\n\t\t\t\t;\n\t\t\t}\n\n\t\t}else {\n\t\t\tif ( 2 >1){\n\t\t\t\t;\n\t\t\t} else {\n\t\t\t\t;\n\t\t\t}\n\t\t}\n\t}\n}\n',
		},
		{
			'filePath':            'fixtures/app/fatal.js',
			'messages':            [
				{
					'ruleId':   null,
					'fatal':    true,
					'severity': 2,
					'message':  'Fatal error, whatever',
				},
			],
			'errorCount':          1,
			'warningCount':        0,
			'fixableErrorCount':   0,
			'fixableWarningCount': 0,
			'source':              'import path from \'path\';\nimport path from \'path\';\n',
		},
	];
	//language=XML
	const expected = '<?xml version="1.0" encoding="utf-8"?><testsuites package="org.eslint" tests="1" failures="3"><testsuite id="org.eslint" name="Eslint" time="0" tests="1" failures="3"><testcase time="0" classname="fixtures/app/fullOfProblem.js" id="fixtures/app/fullOfProblem.js" name="fixtures/app/fullOfProblem.js - 5 issue(s)"><failure type="error" message="Eslint report: fixtures/app/fullOfProblem.js"><![CDATA[Error at fixtures/app/fullOfProblem.js:1:10 - \'addOne\' is defined but never used. (no-unused-vars)\nError at fixtures/app/fullOfProblem.js:2:6 - Use the isNaN function to compare with NaN. (use-isnan)\nError at fixtures/app/fullOfProblem.js:3:14 - Missing semicolon. (semi)\nError at fixtures/app/fullOfProblem.js:5:9 - Missing semicolon. (semi)\nError at fixtures/app/fullOfProblem.js:7:2 - Unnecessary semicolon. (no-extra-semi)]]></failure></testcase><testcase time="0" classname="fixtures/app/tooComplex.js" id="fixtures/app/tooComplex.js" name="fixtures/app/tooComplex.js - 2 issue(s)"><failure type="error" message="Eslint report: fixtures/app/tooComplex.js"><![CDATA[Warning at fixtures/app/tooComplex.js:1:10 - \'toComplex\' is defined but never used. (no-unused-vars)\nError at fixtures/app/tooComplex.js:2:5 - Unexpected constant condition. (no-constant-condition)]]></failure></testcase><testcase time="0" classname="fixtures/app/fatal.js" id="fixtures/app/fatal.js" name="fixtures/app/fatal.js - 1 issue(s)"><failure type="error" message="Eslint report: fixtures/app/fatal.js"><![CDATA[Error at fixtures/app/fatal.js - Fatal error, whatever]]></failure></testcase></testsuite></testsuites>';
	const actual = formatter(payload);

	test.equal(actual, expected);
}


function noProblem (test) {
	test.plan(1);
	const code = [];
	//language=XML
	const expected = '<?xml version="1.0" encoding="utf-8"?><testsuites package="org.eslint" tests="1" failures="0"><testsuite id="org.eslint" name="Eslint" time="0" tests="1" failures="0"></testsuite></testsuites>';
	const actual = formatter(code);
	test.equal(actual, expected);
}
