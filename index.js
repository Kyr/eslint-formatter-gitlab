const xml = require('./lib/xml');
const formatResult = require('./lib/formatResult');
const reduceToString = require('./lib/fns/reduceToString');
const resultsFormatter = reduceToString(formatResult);
const testSuites = xml.createNodeConstructor('testsuites');

module.exports = xmlTemplate;

/**
 *
 * @param {Result[]} results
 * @return {string}
 */
function xmlTemplate (results) {
	const formattedResults = resultsFormatter(results);
	return '<?xml version="1.0" encoding="utf-8"?>' + testSuites({}, formattedResults);
}
