var React = require('react');
var classnames = require('classnames');


require('../../assets/styles/record.scss');

var CreateRecord = React.createClass({

    render: function () {
        var record_class=classnames({
            "cd-record" : true,
            "cd-not-active":true
        })
        return (
            <div className={record_class}>
                <form className="cd-form floating-labels">
                    <fieldset>
                        <legend>今日达成情况</legend>
                        <div className="icon">
                            <label className="cd-label" for="cd-textarea">为了目标今天做了什么？</label>
                            <textarea className="message" name="cd-textarea" id="cd-textarea" required></textarea>
                        </div>

                        <div>
                            <h4>自我评价</h4>

                            <p className="cd-select icon">
                                <select className="budget">
                                    <option value="0">状态非常棒</option>
                                    <option value="1">感觉一般</option>
                                    <option value="2">需要鼓励</option>
                                </select>
                            </p>
                        </div>

                        <div>
                            <h4>执行时间</h4>
                            <ul className="cd-form-list">
                                <li>
                                    <input type="radio" name="radio-button" id="cd-radio-1" checked/>
                                    <label for="cd-radio-1">1小时</label>
                                </li>

                                <li>
                                    <input type="radio" name="radio-button" id="cd-radio-2"/>
                                    <label for="cd-radio-2">半小时</label>
                                </li>

                                <li>
                                    <input type="radio" name="radio-button" id="cd-radio-3"/>
                                    <label for="cd-radio-3">今天没能继续</label>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <input type="submit" value="记录"/>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }

});
module.exports = CreateRecord;