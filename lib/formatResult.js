const path = require('path');
const xml = require('./xml');
const fns = require('./fns');
const formatMessage = require('./formatMessage');
const testSuite = xml.createNodeConstructor('testsuite');

module.exports = formatResult;

/**
 *
 * @param {Result} result
 * @return {string}
 */
function formatResult (result) {
	const filePath = path.relative('', result.filePath);
	const messages = result.messages;
	const testsAmount = messages.length || 1;
	const errorsAmount = messages.length;
	const scopedMessageFormatter = fns.apply(formatMessage, {filePath});
	const formattedMessages = fns.reduceToString(scopedMessageFormatter)(messages);

	return testSuite({
		package: 'org.eslint',
		time: 0,
		tests: testsAmount,
		errors: errorsAmount,
		name: filePath
	}, formattedMessages);
}
