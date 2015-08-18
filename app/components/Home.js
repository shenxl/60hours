var React = require('react');
var TimelineContainer = require('./TimeLine/TimelineContainer');

var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');


var Home = React.createClass({

    mixins: [ReactFireMixin],

    getInitialState: function () {
        return {
            todoList: []
        };
    },


    componentDidMount: function() {
        this.ref = new Firebase('https://taketimes.firebaseio.com');
        var childRef = this.ref.child("timeLine");
        this.bindAsArray(childRef.orderByChild("recordDate"),'todoList');
    },

    render:function(){

        return (
            <div>
                <TimelineContainer todoList={this.state.todoList} />
            </div>
        )
    }
})

module.exports = Home;