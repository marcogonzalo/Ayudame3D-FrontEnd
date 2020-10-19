import React from "react";
import { Link } from "react-router-dom";
import "../../styles/orders.scss";

export const Orders = () => (
	<div className="text-center mt-5">
		<Link to="/createOrder">
			<button className="btn btn-primary float-left">Create Order</button>
		</Link>

		<table className="table table-bordered ">
			<thead>
				<tr>
					<th colSpan="8">ORDERS</th>
				</tr>
			</thead>
			<tr>
				<th>Id Order</th>
				<th>Status</th>
				<th>Helper</th>
				<th>Email</th>
				<th>Actions</th>
			</tr>
			<tr>
				<td>1234</td>
				<td>processing</td>
				<td>Eric Wilson</td>
				<td>erwilson@gmail.com</td>
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editOrder">
									<i className="fa fa-edit" />
								</Link>
							</button>
						</li>
						<li className="list-inline-item">
							<a href="#">
								<i className="far fa-trash-alt" data-toggle="modal" data-target="#myModal" />{" "}
							</a>
						</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td>5214</td>
				<td>processing</td>
				<td>Mario Fernanzez</td>
				<td>mfernandez@gmail.com</td>
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editOrder">
									<i className="fa fa-edit" />
								</Link>
							</button>
						</li>
						<li className="list-inline-item">
							<a href="#">
								<i className="far fa-trash-alt" data-toggle="modal" data-target="#myModal" />{" "}
							</a>
						</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td>8663</td>
				<td>pending</td>
				<td>John Matius</td>
				<td>jmatius@gmail.com</td>
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editOrder">
									<i className="fa fa-edit" />
								</Link>
							</button>
						</li>
						<li className="list-inline-item">
							<a href="#">
								<i className="far fa-trash-alt" data-toggle="modal" data-target="#myModal" />{" "}
							</a>
						</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td>9951</td>
				<td>rejected</td>
				<td>Fernando Gonzalez</td>
				<td>fgonzalez@gmail.com</td>
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editOrder">
									<i className="fa fa-edit" />
								</Link>
							</button>
						</li>
						<li className="list-inline-item">
							<a href="#">
								<i className="far fa-trash-alt" data-toggle="modal" data-target="#myModal" />{" "}
							</a>
						</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td>0204</td>
				<td>rejected</td>
				<td>Pedro Andrś</td>
				<td>pa@gmail.com</td>
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editOrder">
									<i className="fa fa-edit" />
								</Link>
							</button>
						</li>
						<li className="list-inline-item">
							<a href="#">
								<i className="far fa-trash-alt" data-toggle="modal" data-target="#myModal" />{" "}
							</a>
						</li>
					</ul>
				</td>
			</tr>
		</table>

		<div
			className="modal fade"
			id="myModal"
			tabIndex="-1"
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Delete User
						</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">...</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-dismiss="modal">
							Close
						</button>
						<button type="button" className="btn btn-danger">
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
);
