var React = require('react');
var TimelineBlock = require('./TimelineBlock');


var TimelineContainer = React.createClass({

    render: function () {

        var todoItem = this.props.todoList.map(function(todo,index) {
            return (
                <TimelineBlock todoItem={todo} Key={index}/>)
        });

        return (
            <div>
                <section id="cd-timeline" className="cd-container">
                    {todoItem}
                </section>
            </div>
        );
    }

});

module.exports = TimelineContainer;