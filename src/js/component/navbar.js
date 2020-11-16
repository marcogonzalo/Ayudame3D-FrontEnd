import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import logoAyudame from "../../img/logoAyudame.png";
import { ConfirmModal } from "./ConfirmModal";
import canRoleIDDo from "../helpers/UserHelper";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const history = useHistory();
	const { actions } = useContext(Context);

	function logout() {
		history.push("/");
		actions.logout();
	}
	let role_id = actions.getLoggedUserRoleID();
	let liViewUsers = "";
	if (canRoleIDDo(role_id, "users/index")) {
		liViewUsers = (
			<li className="nav-item m">
				<Link to="/users">Users</Link>
			</li>
		);
	}

	let liViewOrders = "";
	if (canRoleIDDo(role_id, "orders/index")) {
		liViewOrders = (
			<li className="nav-item">
				<Link to="/orders">Orders</Link>
			</li>
		);
	}

	let liLogout = "";
	if (canRoleIDDo(role_id, "orders/index")) {
		liLogout = (
			<li className="nav-item">
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-logout">
					Logout
				</button>
			</li>
		);
	}
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link to="/">
				<span className="navbar-brand">
					<img src={logoAyudame} width="180" height="50" alt="" loading="lazy" />
				</span>
			</Link>

			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent1"
				aria-controls="navbarSupportedContent1"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span className="dark-blue-text">
					<i className="fas fa-bars fa-1x" />
				</span>
			</button>

			<div className="col-md-6 offset-md-4 collapse navbar-collapse" id="navbarSupportedContent1">
				<ul className="navbar-nav ml-auto mt-2 mt-lg-0">
					{liViewUsers}
					{liViewOrders}
					{liLogout}
				</ul>
				<ConfirmModal id="modal-logout" body="¿Estas seguro de que quieres cerrar sesión?" confirm={logout} />
			</div>
		</nav>
	);
};
