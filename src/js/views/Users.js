import React from "react";
import { Link } from "react-router-dom";
import "../../styles/users.scss";

export const Users = () => (
	<div className="text-center mt-5">
		<h2> Users </h2>

		<table className="center">
			<tr>
				<th>Name</th>
				<th>Role</th>
				<th>Email</th>
				<th>Address</th>
				<th>Actions</th>
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
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
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Delete">
								<i className="far fa-trash-alt" />
							</button>
						</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
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
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Delete">
								<i className="far fa-trash-alt" />
							</button>
						</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
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
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Delete">
								<i className="far fa-trash-alt" />
							</button>
						</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
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
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Delete">
								<i className="far fa-trash-alt" />
							</button>
						</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
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
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Delete">
								<i className="far fa-trash-alt" />
							</button>
						</li>
					</ul>
				</td>
			</tr>
		</table>

		<hr className="my-4" />

		<Link to="/createUser">
			<button className="btn btn-primary" type="submit" value="submit" m>
				Create user
			</button>
		</Link>
	</div>
);
