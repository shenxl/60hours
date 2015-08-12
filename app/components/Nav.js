var React = require('react');
var Nav = React.createClass({

	render: function() {
		return (
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
		);
	}

});
module.exports = Nav;