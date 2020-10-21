import React from "react";
import { Link } from "react-router-dom";
import "../../styles/users.scss";
import { UserTr } from "../component/UserTr";
import { ConfirmModal } from "../component/ConfirmModal";

export const Users = () => {
	let users = [
		{
			id: 1,
			name: "Erik Wilson",
			role: "helper",
			email: "erwilson@gmail.com",
			Address: "Nadrid"
		},

		{
			id: 2,
			name: "Jhon Matius",
			role: "helper",
			email: "jmatius@gmail.com",
			Address: "Londres"
		},

		{
			id: 3,
			name: "Pedro Fernandez",
			role: "Administrador",
			email: "pfernandez@gmail.com",
			Address: "Nadrid"
		},

		{
			id: 4,
			name: "José Gonzalez",
			role: "helper",
			email: "jgonzalez@gmail.com",
			Address: "Barcelona"
		},

		{
			id: 5,
			name: "Juan Perez",
			role: "Gestor",
			email: "jperez@gmail.com",
			Address: "Nadrid"
		}
	];

	function archiveUser() {} // ??????
	const usersHtml = users.map(user => {
		return <UserTr key={user.id} user={user} />;
	});
	return (
		<div className="text-center mt-5">
			<Link to="/users/create">
				<button className="btn btn-primary float-left">Create User</button>
			</Link>

			<table className="table table-bordered ">
				<thead>
					<tr>
						<th colSpan="8">USERS</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Id User</th>
						<th>Name</th>
						<th>Role</th>
						<th className="d-none d-sm-table-cell">Email</th>
						<th>Actions</th>
					</tr>
					{usersHtml}
				</tbody>
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
};
