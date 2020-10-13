import React from "react";
import { Link } from "react-router-dom";
import "../../styles/users.scss";

export const Users = () => (
	<div className="text-center mt-5">
		<h2>Users</h2>
		<table className="center">
			<tr>
				<th>Name</th>
				<th>Rol</th>
				<th>Email</th>
				<th>Address</th>
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
			</tr>
		</table>

		<hr className="my-4" />

		<Link to="/createUser">
			<button className="btn btn-primary" type="submit" value="submit" m>
				Create user
			</button>

			<button className="btn btn-primary" type="submit" value="submit">
				Edit user
			</button>
		</Link>
	</div>
);
