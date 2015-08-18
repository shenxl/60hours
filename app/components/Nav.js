var React = require('react');
var Nav = React.createClass({

	render: function() {
		return (
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
		);
	}

});
module.exports = Nav;