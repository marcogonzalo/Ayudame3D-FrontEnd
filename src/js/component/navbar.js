import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import logoAyudame from "../../img/logoAyudame.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link to="/">
				<a className="navbar-brand" href="#">
					<img src={logoAyudame} width="180" height="50" alt="" loading="lazy" />
				</a>
			</Link>

			<button
				className="navbar-toggler toggler-example"
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

			<div className="col-md-6 offset-md-4">
				<Link to="/users">
					<button type="submit" className="btn btn-primary">
						USERS
					</button>
				</Link>{" "}
				<Link to="/orders">
					<button type="submit" className="btn btn-primary">
						ORDERS
					</button>
				</Link>{" "}
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
					LOGOUT
				</button>
				<div className="modal fade" id="myModal" role="dialog">
					<div className="modal-dialog modal-sm">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
								<h4 className="modal-title">Modal Header</h4>
							</div>
							<div className="modal-body">
								<p>This is a small modal.</p>
							</div>
							<div className="modal-footer">
								<Link to="/">
									<button type="button" className="btn btn-default" data-dismiss="modal">
										Close
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
