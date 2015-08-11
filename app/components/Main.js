var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var Main = React.createClass({
    render: function () {
        return (
            <div>
                <header className="cd-header">
                    <a href="#" className="cd-3d-nav-trigger">
                        Menu
                        <span></span>
                    </a>
                </header>

                <main>
                    <RouteHandler />
                </main>

                <nav className="cd-3d-nav-container">
                    <ul className="cd-3d-nav">
                        <li className="cd-selected">
                            <a href="#">我的里程</a>
                        </li>

                        <li>
                            <a href="#">同伴里程</a>
                        </li>
                    </ul>
                    <span className="cd-marker color-1"></span>
                </nav>
            </div>
        )
    }
});
module.exports = Main;