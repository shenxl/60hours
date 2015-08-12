var React = require('react');
var TimelineContainer = require('./TimeLine/TimelineContainer');
var CreateRecord  =require('./Record/CreateRecord');

var Home = React.createClass({

    getInitialState: function () {
        return {
            todoList: []
        };
    },


    render:function(){
        for (var i = 0; i < 10; i++) {
            this.state.todoList.push({
                title: "Title of section " + i,
                details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut." +
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.",
                dateTime: "Jan " + i
            });
        }

        return (
            <div>
                <CreateRecord />
                <TimelineContainer todoList={this.state.todoList} />
            </div>
        )
    }
})

module.exports = Home;