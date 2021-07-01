import {Component} from "react"

export default class ObservationToggle extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(field) {
        this.props.onToggle(this.props.evidence, field)
    }

    render() {
        return (
            <div className="columns is-mobile is-vcentered">
                <div className="column is-offset-2 is-narrow">
                    <div className="buttons has-addons">
                        <button className={"button" + (this.props.evidence.rejected ? " is-danger" : "")}
                                onClick={() => this.onChange("rejected")}>
                            <span className="icon is-small">
                                <i className="fa fa-times" />
                            </span>
                        </button>

                        <button className={"button" + (this.props.evidence.selected ? " is-success" : "")}
                                onClick={() => this.onChange("selected")}>
                            <span className="icon is-small">
                                <i className="fa fa-check" />
                            </span>
                        </button>
                    </div>
                </div>
                <div className="column is-mobile">
                    <span>{this.props.evidence.name}</span>
                </div>
            </div>
        );
    }
}
