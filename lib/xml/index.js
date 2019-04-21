'use strict';
const zipAttributes = require('./zipAttributes');
const spaceConcat = (acc, fragment) => `${acc} ${fragment}`;

module.exports = {
	cData,
	createNode,
	createNodeConstructor,
};

/**
 * @param {string} nodeType
 * @param {Object} attributes
 * @param {string} childNodes
 * @return {string}
 */
function createNode(nodeType, attributes, childNodes = '') {
	const open = [nodeType, ...zipAttributes(attributes)].reduce(spaceConcat);
	return `<${open}>${childNodes}</${nodeType}>`;
}

/**
 * @param {string} nodeType
 * @param {Object} defaultAttributes
 * @return {function(attributes:{}, childNodes: string): string}
 */
function createNodeConstructor(nodeType, defaultAttributes = {}) {
	return (attributes, childNodes) => createNode(nodeType, {...defaultAttributes, ...attributes}, childNodes);
}

/**
 * @param {string} data
 * @return {string}
 */
function cData(data) {
	return `<![CDATA[${data}]]>`;
}
