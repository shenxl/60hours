var React = require('react');
var NotesList = require('./NotesList');

var Notes = React.createClass({

	propTypes:{
		username:React.PropTypes.string.isRequired,
		notes:React.PropTypes.array.isRequired
	},
	render: function() {
		return (
        <div>
            <h3> {this.props.username} 的笔记本</h3>
			<NotesList notes={this.props.notes} />
        </div>
		);
	}

});

module.exports = Notes;