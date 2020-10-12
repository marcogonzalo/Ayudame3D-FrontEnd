import React from "react";
import { Link } from "react-router-dom";
import logoAyudame from "../../img/logoAyudame.png";
export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<Link to="/">
				<a className="navbar-brand" href="#">
					<img src={logoAyudame} width="180" height="50" alt="" loading="lazy" />
				</a>
			</Link>
		</nav>
	);
};
