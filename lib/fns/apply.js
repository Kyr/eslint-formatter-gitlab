module.exports = apply;

/**
 * Return function that applied fn in context
 * @param {function} fn
 * @param {*} context
 * @return {function(): *}
 */
function apply (fn, context) {
	return function () {
		return fn.apply(context, arguments);
	};
}
