var React = require('react');
var classNames = require('classnames');

var TimelineBlock = React.createClass({

    render: function () {
        var img_classes = classNames({
            'cd-timeline-img': true,
            'cd-smile': this.props.todoItem.status === 0,
            'cd-face': this.props.todoItem.status === 1,
            'cd-sadly': this.props.todoItem.status === 2,
        });

        return (
            <div className="cd-timeline-block">
                <div className={img_classes}>
                    <span />
                </div>
                <div className="cd-timeline-content">
                    <h2>{this.props.todoItem.title}</h2>
                    <p>{this.props.todoItem.details}</p>
                    <a href="#0" className="cd-read-more">Read more</a>
                    <span className="cd-date">{this.props.todoItem.dateTime}</span>
                </div>
            </div>
                );
            }

        });

module.exports = TimelineBlock;