const path = require('path');
const xmlEscape = require('./lib/xmlEscape');

const forEach = (fn) => (arr) => arr.forEach(fn);
const di = (dependencies, fn) =>
    function () {
        return fn.apply(dependencies, arguments);
    };
const eachResult = forEach(formatResult);
const eachMessage = forEach(testCaseTemplate);

module.exports = xmlTemplate;

function xmlTemplate(results) {
    return `<?xml version="1.0" encoding="utf-8"?>
  <testsuites>${eachResult(results)}</testsuites>`;
}

function formatResult(result) {
    const filePath = path.relative('', result.filePath);
    const messages = result.messages;
    const testSuite = di({filePath}, eachMessage)(messages);

    return testSuiteTemplate({
        testsAmount:  messages.length || 1,
        errorsAmount: messages.length,
        testSuite,
    });
}

function testSuiteTemplate({testsAmount, errorsAmount, testSuite}) {
    return `<testsuite package="org.eslint" time="0" tests="${testsAmount}" errors="${errorsAmount}">${testSuite}</testsuite>`;
}

function testCaseTemplate(message) {
    const name = message.ruleId || (message.fatal && 'error') || 'unknown';
    const classname = xmlEscape(this.filePath);
    const formattedMessage = formatMessage(message, this.filePath);

    return `<testcase time="0" name="org.eslint.${name}" classname="${classname}">${formattedMessage}</testcase>`;
}

function formatMessage(eslintMessage, filePath) {
    const {
        message = '',
        ruleId,
        line,
        column,
    } = eslintMessage;
    const escapedMessage = xmlEscape(message);
    const position = filePath + (line && column ? `:${line}:${column}` : '');
    const ruleRef = ruleId ? ` (${ruleId})` : '';
    const description = `${messageType(eslintMessage)} at ${position},\n${message}${ruleRef}`;

    return messageTemplate({
        escapedMessage,
        description
    });
}

function messageTemplate({escapedMessage, description}) {
    return `<failure type="failure" message="${escapedMessage}"><![CDATA[${description}]]</failure>`;
}

function messageType({fatal, severity}) {
    return fatal || severity === 2 ? 'Error' : 'Warning';
}
