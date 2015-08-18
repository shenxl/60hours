var React = require('react');
var Main = require('../components/Main');
var Home = require('../components/Home');
var CreateRecord = require('../components/Record/CreateRecord');
var TimelineContainer = require('../components/TimeLine/TimelineContainer');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
    <Route name="app" path="/" handler={Main}>
        <Route name="record" path="main/record" handler={CreateRecord} />
        <DefaultRoute handler={Home} />
    </Route>
);


