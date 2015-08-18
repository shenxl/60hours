var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;

var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var DropDownMenu = mui.DropDownMenu;
var RaisedButton = mui.RaisedButton;
var SelectField = mui.SelectField;
var RadioButtonGroup = mui.RadioButtonGroup;
var RadioButton = mui.RadioButton;
var TextField = mui.TextField;


require('../../assets/styles/record.scss');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var menuItems = [
    {payload: '1', text: '状态非常棒'},
    {payload: '2', text: '感觉一般'},
    {payload: '3', text: '需要鼓励'}
];


var CreateRecord = React.createClass({

    mixins: [ReactFireMixin, Navigation],

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getInitialState: function () {
        return {
            evaluation: '1',
            todo: '',
            time: 'half_hour'
        };
    },

    componentDidMount: function () {
        this.ref = new Firebase('https://taketimes.firebaseio.com');
        var childRef = this.ref.child("timeLine");
        this.bindAsArray(childRef, 'timeLine');
    },


    _handleTextChange: function (e) {

        this.setState({
            todo: e.target.value
        });
    },

    _handleClick: function (e) {
        e.preventDefault();
        var date = new Date().toLocaleString();
        var timeLine = {
            recordDate: date,
            evaluation: this.state.evaluation,
            todo: this.state.todo,
            time: this.state.time
        };

        console.log(timeLine);
        this.firebaseRefs['timeLine'].push(timeLine);

        this.setState({
            timeLine: {}
        });


        this.transitionTo('app');

    },

    _handleSelectChange: function (e) {
        this.setState({
            evaluation: e.target.value
        });
    },

    _handleRadioChange: function (e) {
        this.setState({
            time: e.target.value
        });
    },


    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    render: function () {

        return (
            <div className="cd-record">
                <form className="cd-form">
                    <fieldset>
                        <legend>目标达成情况</legend>
                        <TextField
                            floatingLabelText="为了目标今天做了什么"
                            multiLine={true}
                            onChange={this._handleTextChange}/>

                        <div>
                            <h3>自我评价</h3>
                            <DropDownMenu menuItems={menuItems}
                                          onChange={this._handleSelectChange}/>
                        </div>

                        <div>
                            <h3>执行时间</h3>
                            <RadioButtonGroup
                                name="runTimes"
                                defaultSelected="half_hour"
                                labelPosition="right" onChange={this._handleRadioChange}>
                                <RadioButton
                                    value="one_hour"
                                    label="一小时"
                                    style={{marginBottom:8}}/>
                                <RadioButton
                                    value="half_hour"
                                    label="半小时"
                                    style={{marginBottom:8}}/>
                                <RadioButton
                                    value="none"
                                    label="没有继续"
                                    style={{marginBottom:8}}/>
                            </RadioButtonGroup>

                        </div>

                        <div>
                            <RaisedButton label="记录" primary={true} onClick={this._handleClick}/>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }

});
module.exports = CreateRecord;