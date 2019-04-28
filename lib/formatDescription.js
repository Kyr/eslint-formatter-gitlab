module.exports = formatDescription;

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
