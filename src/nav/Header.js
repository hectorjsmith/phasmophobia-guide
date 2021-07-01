import {Component} from "react";
import headerImg from "../img/header.png";

export default class TopNav extends Component {
    render() {
        return (
            <nav className="level">
                <p className="level-item has-text-centered">
                    <img src={headerImg} alt="Phasmophobia paranormal guide" style={{height: "150px"}} />
                </p>
            </nav>
        )
    }
}
