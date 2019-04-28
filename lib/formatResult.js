const path = require('path');
const xml = require('./xml');
const formatDescription = require('./formatDescription');

module.exports = formatResult;

/**
 *
 * @param {Result} result
 * @return {string}
 */
function formatResult (result) {
	const filePath = path.relative('', result.filePath);
	const messages = result.messages;
	const errorsAmount = messages.length;

	const description = messages
		.map(message => formatDescription(message, filePath))
		.join('\n');

	const failure = xml.createNode('failure', {
		type:    'error',
		message: `Eslint report: ${filePath}`,
	}, xml.cData(description));

	return xml.createNode('testcase', {
		time:      0,
		classname: filePath,
		id:        filePath,
		name:      `${filePath} - ${errorsAmount} issue(s)`,
	}, failure);
}
