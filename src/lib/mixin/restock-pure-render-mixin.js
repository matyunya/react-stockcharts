"use strict";

var shallowEqual = require("react/lib/shallowEqual");

/**
 * If your React component's render function is "pure", e.g. it will render the
 * same result given the same props and state, provide this Mixin for a
 * considerable performance boost.
 *
 * Most React components have pure render functions.
 *
 * Example:
 *
 *   var ReactComponentWithPureRenderMixin =
 *     require('ReactComponentWithPureRenderMixin');
 *   React.createClass({
 *     mixins: [ReactComponentWithPureRenderMixin],
 *
 *     render: function() {
 *       return <div className={this.props.className}>foo</div>;
 *     }
 *   });
 *
 * Note: This only checks shallow equality for props and state. If these contain
 * complex data structures this mixin may have false-negatives for deeper
 * differences. Only mixin to components which have simple props and state, or
 * use `forceUpdate()` when you know deep data structures have changed.
 */
var ReStockPureRenderMixin = {
	shouldComponentUpdate: function(nextProps, nextState) {
		var extraCheck = (typeof this.extraShouldComponentUpdate === "function")
			? this.extraShouldComponentUpdate
			: (nextProps, nextState, actualCheck) => actualCheck
		var actualCheck = !shallowEqual(this.props, nextProps) ||
				!shallowEqual(this.state, nextState)
		return extraCheck(nextProps, nextState, actualCheck);
	}
};

module.exports = ReStockPureRenderMixin;