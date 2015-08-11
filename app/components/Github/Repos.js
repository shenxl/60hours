
var React = require('react');

var Repos = React.createClass({

	propTypes:{
		username:React.PropTypes.string.isRequired,
		repos:React.PropTypes.array.isRequired
	},
	render: function() {
		return (
        <div>
            项目信息
        </div>
		);
	}

});

module.exports = Repos;