import React from "react";
import { Link } from "react-router-dom";
import "../../styles/users.scss";

export const Users = () => (
	<div className="text-center mt-5">
		<Link to="/createUser">
			<button className="btn btn-primary float-left">Create User</button>
		</Link>

		<table className="table table-bordered ">
			<thead>
				<tr>
					<th colSpan="8">USERS</th>
				</tr>
			</thead>
			<tr>
				<th>Name</th>
				<th>Role</th>
				<th>Email</th>
				<th>Address</th>
				<th>Actions</th>
			</tr>
			<tr>
				<td>Eric Wilson</td>
				<td>Helper</td>
				<td>erwilson@gmail.com</td>
				<td>Madrid</td>
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editUser">
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
				<td>Jhon Matius</td>
				<td>Helper</td>
				<td>jmatius@gmail.com</td>
				<td>Londres</td>
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editUser">
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
				<td>Pedro Fernandez</td>
				<td>Administrator</td>
				<td>pfernandez@gmail.com</td>
				<td>Madrid</td>
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editUser">
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
				<td>José Gonzalez</td>
				<td>Helper</td>
				<td>jgonzalez@gmail.com</td>
				<td>Barcelona</td>
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editUser">
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
				<td>Juan Perez</td>
				<td>Helper</td>
				<td>jp@gmail.com</td>
				<td>Madrid</td>
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editUser">
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
