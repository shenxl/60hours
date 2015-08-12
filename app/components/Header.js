var React = require('react');

var Header = React.createClass({

	render: function() {
		return (
			<header className="cd-header">
				<div className="cd-3d-nav-info">
					<span>目标：</span>
					<span>每天做的： xxx</span>
					<span>30小时 第20天</span>
				</div>

				<a href="#" className="cd-3d-nav-trigger">
					Menu
					<span></span>
				</a>
			</header>
		);
	}

});
module.exports = Header;