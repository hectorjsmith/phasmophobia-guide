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
        const totalGhosts = this.props.possibleGhosts.length
        const matchingGhosts = this.props.possibleGhosts.filter(g => g.evidence.some(e => e === this.props.evidence.name)).length

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

                        <button className={"button" + (this.props.evidence.selected ? " is-success" : "") + (matchingGhosts === 0 ? " is-dark" : "")}
                                onClick={() => this.onChange("selected")}>
                            <span className="icon is-small">
                                <i className={"fa fa-check" + (matchingGhosts === 0 ? " has-text-dark" : "")} />
                            </span>
                        </button>
                    </div>
                </div>
                <div className="column is-mobile mt-1">
                    <p>{this.props.evidence.name}</p>
                    <p className="heading">{matchingGhosts} / {totalGhosts}</p>
                </div>
            </div>
        );
    }
}
