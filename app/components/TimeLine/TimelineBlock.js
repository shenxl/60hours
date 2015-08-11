var React = require('react');

var TimelineBlock = React.createClass({

    render: function () {
        return (
            <div className="cd-timeline-block">
                <div className="cd-timeline-img cd-picture">
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