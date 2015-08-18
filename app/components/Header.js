var React = require('react');
var Nav = require('./Nav');

// 加载Css样式
require('../assets/styles/headerNav.scss');
var Header = React.createClass({

	render: function() {
		return (
			<header>
				<div className="cd-logo"></div>
					<nav className="cd-main-nav-wrapper">
						<ul className="cd-main-nav">
							<li><a href="#">我</a></li>
							<li><a href="#">伙伴</a></li>
							<li><a href="#">退出</a></li>
							<Nav />
						</ul>
					</nav>
					<a href="#" className="cd-nav-trigger">返回<span></span></a>
				</header>
		);
	}

});
module.exports = Header;