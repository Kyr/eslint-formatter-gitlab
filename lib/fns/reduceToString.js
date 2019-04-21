module.exports = reduceToString;

/**
 * @param {function} reducer
 * @return {function(array): string}
 */
function reduceToString (reducer) {
	return function (arr) {
		return arr.reduce((acc, item) => acc + reducer.call(this, item), '');
	};
}
