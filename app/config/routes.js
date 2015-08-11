var React = require('react');
var Main = require('../components/Main');
var Home = require('../components/Home');
var Profile = require('../components/Profile');
var Router = require('react-router');
var TimelineContainer = require('../components/TimeLine/TimelineContainer');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
    <Route name="app" path="/" handler={Main}>
        <Route name="profile" path="profile/:username" handler={Profile} />
        <Route name="timelineContainer" path="timeline" handler={TimelineContainer} />
        <DefaultRoute handler={Home} />
    </Route>
);


