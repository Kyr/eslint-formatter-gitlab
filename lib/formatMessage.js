const xml = require('./xml');
const failure = xml.createNodeConstructor('failure', {type: 'failure'});
const testCase = xml.createNodeConstructor('testcase');

module.exports = formatMessage;

/**
 * @this {Result}
 * @param {Message} resultMessage
 * @return {string}
 */
function formatMessage (resultMessage) {
	const {
		message = '',
	} = resultMessage;
	const description = xml.cData(formatDescription(resultMessage, this.filePath));
	const formattedMessage = failure({message}, description);

	return testCase({
		time:      0,
		name:      `org.eslint${withRuleName(resultMessage)}`,
		classname: this.filePath,
	}, formattedMessage);
}

/**
 *
 * @param {Message} message
 * @param {string} filePath
 * @return {string}
 */
function formatDescription (message, filePath) {
	const failureType = messageType(message);
	const position = `${filePath}${withPosition(message)}`;

	return `${failureType} at ${position} - ${message.message}${withRuleRef(message)}`;
}

/**
 * @param {Message} message
 * @return {string}
 */
function withRuleName (message) {
	if (message.ruleId) {
		return `.${message.ruleId}`;
	}

	return message.fatal ?
		'.error' :
		'.unknown';
}

/**
 *
 * @param {Message} message
 * @return {string}
 */
function withRuleRef ({ruleId}) {
	return ruleId ? ` (${ruleId})` : '';
}

/**
 *
 * @param {Message} message
 * @return {string}
 */
function withPosition ({line, column}) {
	return line && column ? `:${line}:${column}` : '';
}

/**
 *
 * @param {Message} message
 * @return {string}
 */
function messageType ({fatal = false, severity}) {
	return fatal || severity === 2 ? 'Error' : 'Warning';
}
