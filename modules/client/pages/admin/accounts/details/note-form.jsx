'use strict';
const Actions = require('./actions');
const Alert = require('../../../../components/alert.jsx');
const ControlGroup = require('../../../../components/form/control-group.jsx');
const LinkState = require('../../../../helpers/link-state');
const Moment = require('moment');
const React = require('react');
const Spinner = require('../../../../components/form/spinner.jsx');


const propTypes = {
    accountId: React.PropTypes.string,
    error: React.PropTypes.string,
    hasError: React.PropTypes.object,
    help: React.PropTypes.object,
    loading: React.PropTypes.bool,
    notes: React.PropTypes.string,
    showSaveSuccess: React.PropTypes.bool
};


class NoteForm extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            notes: props.notes
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            notes: nextProps.notes
        });
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        const id = this.props.accountId;
        const data = {
            data: this.state.notes
        };

        Actions.newNote(id, data);
    }

    render() {
        const alerts = [];

        if (this.props.showSaveSuccess) {
            alerts.push(<Alert
                key="success"
                type="success"
                onClose={Actions.hideNoteSaveSuccess}
                message="Success. Changes have been saved."
            />);
        }

        if (this.props.error) {
            alerts.push(<Alert
                key="danger"
                type="danger"
                message={this.props.error}
            />);
        }

        const formElements = <fieldset>
            <legend>Note</legend>
            {alerts}
            <ControlGroup
                groupClasses={{ 'form-group-notes': true }}
                hideLabel={true}
                hasError={this.props.hasError.data}
                help={this.props.help.data}>

                <textarea
                    ref="notes"
                    name="notes"
                    rows="20"
                    className="form-control"
                    value={this.state.notes}
                    onChange={LinkState.bind(this)}
                >
                </textarea>
                <button
                    ref="newNoteButton"
                    type="submit"
                    className="btn btn-default btn-block"
                    disabled={this.props.loading}>

                    Update Note
                    <Spinner
                        space="left"
                        show={this.props.loading}
                    />
                </button>
            </ControlGroup>
        </fieldset>;

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                {formElements}
            </form>
        );
    }
}

NoteForm.propTypes = propTypes;


module.exports = NoteForm;
