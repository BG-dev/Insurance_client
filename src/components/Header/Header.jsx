import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
    return (
        <header className="header">
            <h1>Insurance</h1>
            <nav className="nav">
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link className="nav__link" to={"/clients"}>
                            Clients
                        </Link>
                    </li>
                    <li className="nav__item">
                        <Link className="nav__link" to={"/agents"}>
                            Agents
                        </Link>
                    </li>
                    <li className="nav__item">
                        <Link className="nav__link" to={"/contracts"}>
                            Contracts
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
