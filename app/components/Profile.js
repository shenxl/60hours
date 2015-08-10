var React = require('react');
var Router = require('react-router');

var UserPorfile = require('../components/Github/UserProfile');
var Notes = require('../components/Notes/Notes');
var Repos = require('../components/Github/Repos');

var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');



var Profile = React.createClass({
    mixins:[Router.State,ReactFireMixin],
    getInitialState: function() {
    	return {
    		notes:[],
            bio:{name : '沈霄雷'},
            repos:['项目1','项目2','项目3']
    	};
    },

    componentDidMount: function() {
        this.ref = new Firebase('https://taketimes.firebaseio.com');
        var childRef = this.ref.child(this.getParams().username);
        this.bindAsArray(childRef,'notes');
    },

    componentWillUnmount: function() {
        this.unbind('notes');
    },
    render:function(){
        var username = this.getParams().username;

        return (
            <div className="row">
                <div className="col-md-4">
                    <UserPorfile username={username} bio={this.state.bio}/>
                </div>
                <div className="col-md-4">
                    <Repos username={username} repos={this.state.repos} />
                </div>
                <div className="col-md-4">
                    <Notes username={username} notes={this.state.notes} />
                </div>
            </div>
        )
    }
});

module.exports = Profile;