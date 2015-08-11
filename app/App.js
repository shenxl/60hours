var React = require('react');
var Router = require('react-router');
var routes = require('./config/routes');

require('../app/assets/styles/style.scss');


Router.run(routes,function(Root){
    React.render(<Root />,document.getElementById('app'));
})