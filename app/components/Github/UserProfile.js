var React = require('react');

var UserProfile = React.createClass({

    propTypes:{
        username:React.PropTypes.string.isRequired,
        bio:React.PropTypes.object.isRequired
    },
	render: function() {
		return (
        <div>
            个人资料 <br />
            用户名 : {this.props.username}  <br />
            详情 : {this.props.bio}
        </div>
		);
	}

});

module.exports = UserProfile;