var React = require('react');
var AddRecord = React.createClass({
    handleAdd:function(){
        alert('AA');

    },

	render: function() {
		return (
            <div className="cd-timeline-block add-child">
                <div className="cd-timeline-img cd-add" onClick={this.handleAdd}>
                    <span />
                </div>
            </div>
		);
	}

});
module.exports = AddRecord;