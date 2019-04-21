const escapeString = require('./escapeString');

module.exports = zipAttributes;

function zipAttributes(attributes) {
	return Object.entries(attributes).map(([key, value]) => `${key}="${escapeString(value.toString())}"`);
}
