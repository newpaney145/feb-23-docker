import React from "react";
import { Link } from 'react-router-dom'

function navbar() {

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/InternList">Interns</Link>
                </li>
            </ul>
        </nav>
    );
}

export default navbar;