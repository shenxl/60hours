var React = require('react');
var AddRecord = React.createClass({
    handleAdd:function(){
        alert('AA');

    },

	render: function() {
		return (
            <div className="cd-timeline-block add-child">
                <div className="cd-timeline-img cd-add" onClick={this.handleAdd}>
                    <img src="img/cd-icon-add.svg" alt=""/>
                </div>
            </div>
		);
	}

});
module.exports = AddRecord;