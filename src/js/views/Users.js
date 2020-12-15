import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import "../../styles/users.scss";
import { UserTr } from "../component/UserTr";
import { ConfirmModal } from "../component/ConfirmModal";
import { Context } from "../store/appContext";
import canRoleIDDo, { isHelper } from "../helpers/UserHelper";
import { BASE_URL } from "../helpers/UrlHelper";

export const Users = () => {
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const { actions, store } = useContext(Context);

	function getUsers() {
		fetch(BASE_URL + "users", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			}
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				setUsers(responseJson);
				setLoading(false);
			});
	}

	useEffect(() => {
		let accessToken = localStorage.getItem("accessToken");
		if (store.loggedUser === null) {
			fetch(BASE_URL + "get-user-authenticated", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("accessToken")
				}
			})
				.then(response => {
					return response.json();
				})
				.then(responseJson => {
					actions.setLoggedUser(responseJson.user);
					getUsers();
				});
		} else {
			getUsers();
		}
	}, []);

	if (loading) {
		return "Loading...";
	}

	const usersHtml = users.map(user => {
		return <UserTr key={user.id} user={user} />;
	});
	let role_id = actions.getLoggedUserRoleID();
	let buttonCreateUser = "";
	if (canRoleIDDo(role_id, "users/create")) {
		buttonCreateUser = (
			<Link to="/users/create">
				<button className="btn btn-primary float-left">Create User</button>
			</Link>
		);
	}

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
