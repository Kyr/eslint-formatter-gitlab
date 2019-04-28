const xml = require('./lib/xml');
const formatResult = require('./lib/formatResult');
const reduceToString = require('./lib/fns/reduceToString');
const resultsFormatter = reduceToString(formatResult);

module.exports = xmlTemplate;

/**
 *
 * @param {Result[]} results
 * @return {string}
 */
function xmlTemplate (results) {
	const formattedResults = resultsFormatter(results);
	const testSuite = xml.createNode('testsuite', {
		id:       'org.eslint',
		name:     'Eslint',
		time:     0,
		tests:    1,
		failures: results.length,
	}, formattedResults);
	const testSuites = xml.createNode('testsuites', {
		package: 'org.eslint',
		tests: 1,
		failures: results.length
	}, testSuite);
	return '<?xml version="1.0" encoding="utf-8"?>' + testSuites;
}
