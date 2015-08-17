var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var AddRecord = React.createClass({
    mixins:[Navigation],

    handleAdd:function(){
        this.transitionTo('record');
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