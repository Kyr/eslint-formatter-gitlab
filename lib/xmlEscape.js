'use strict';
// eslint-disable-next-line no-control-regex
const notValidChars = /[<>&"'\x00-\x1F\x7F\u0080-\uFFFF]/gu;
const charMapping = new Map([
  ['<', '&lt;'],
  ['>', '&gt;'],
  ['&', '&amp;'],
  ['"', '&quot;'],
  ["'", '&apos;'],
]);

module.exports = xmlEscape;

/**
 *
 * @param {string} str
 * @return {string}
 */
function xmlEscape(str) {
  return str.replace(notValidChars, replacer);
}

function replacer(char) {
  return charMapping.has(char) ? charMapping.get(char) : `&#${char.charCodeAt(0)};`;
}
