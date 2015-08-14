var React = require('react');
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
							<li><a href="#">登陆</a></li>
							<li>
								<a href="#" className="cd-subnav-trigger"><span>完成情况</span></a>
								<ul>
									<li className="go-back"><a href="#">返回</a></li>
									<li><a href="#">最终目标：完成网站开发</a></li>
									<li><a href="#">近期计划：学习Node.js架构</a></li>
									<li><a href="#">第30小时</a></li>
									<li><a href="#">第5天</a></li>
									<li><a href="#" className="placeholder">Placeholder</a></li>
								</ul>
							</li>
						</ul>
					</nav>

					<a href="#" className="cd-nav-trigger">返回<span></span></a>
				</header>
		);
	}

});
module.exports = Header;