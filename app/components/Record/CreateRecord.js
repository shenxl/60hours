var React = require('react');


require('../../assets/styles/record.scss');

var CreateRecord = React.createClass({

    render: function () {
        return (
            <form className="cd-form floating-labels">
                <fieldset>
                    <legend>Project Info</legend>

                    <div>
                        <h4>Budget</h4>

                        <p className="cd-select icon">
                            <select className="budget">
                                <option value="0">Select Budget</option>
                                <option value="1">&lt; $5000</option>
                                <option value="2">$5000 - $10000</option>
                                <option value="3">&gt; $10000</option>
                            </select>
                        </p>
                    </div>

                    <div>
                        <h4>Project type</h4>

                        <ul className="cd-form-list">
                            <li>
                                <input type="radio" name="radio-button" id="cd-radio-1" checked/>
                                <label for="cd-radio-1">Choice 1</label>
                            </li>

                            <li>
                                <input type="radio" name="radio-button" id="cd-radio-2"/>
                                <label for="cd-radio-2">Choice 2</label>
                            </li>

                            <li>
                                <input type="radio" name="radio-button" id="cd-radio-3"/>
                                <label for="cd-radio-3">Choice 3</label>
                            </li>
                        </ul>
                    </div>


                    <div className="icon">
                        <label className="cd-label" for="cd-textarea">Project description</label>
                        <textarea className="message" name="cd-textarea" id="cd-textarea" required></textarea>
                    </div>

                    <div>
                        <input type="submit" value="Send Message"/>
                    </div>
                </fieldset>
            </form>
        );
    }

});
module.exports = CreateRecord;