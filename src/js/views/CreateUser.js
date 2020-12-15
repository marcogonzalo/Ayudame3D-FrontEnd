import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../styles/createUser.scss";
import canRoleIDDo from "../helpers/UserHelper";
import { Context } from "../store/appContext";
import { BASE_URL } from "../helpers/UrlHelper";

export const CreateUser = () => {
	const history = useHistory();
	const { actions } = useContext(Context);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [idUser, setIdUser] = useState("");
	const [fullName, setFullName] = useState("");
	const [roleId, setRoleId] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [passwordUser, setPasswordUser] = useState("");

	const [roles, setRoles] = useState([]);

	let role_id = actions.getLoggedUserRoleID();
	if (!canRoleIDDo(role_id, "users/create")) {
		return "Permission denied.";
	}

	useEffect(() => {
		getRoles();
	}, []);

	if (loading) {
	}

	function getRoles() {
		fetch(BASE_URL + "roles", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			}
		})
			.then(response => {
				console.log(response);
				return response.json();
			})
			.then(responseJson => {
				if (responseJson.msg !== undefined && responseJson.msg === "Token has expired") {
					history.push("/");
				}

				setRoles(responseJson);
				setLoading(false);
			})
			.catch(error => {
				alert("Error:", error);
			});
	}

	/* =================*/

	useEffect(() => {
		getUsersAndSet();
	}, []);

	if (loading) {
		return "Loading...";
	}

	function getUsersAndSet() {
		let accessToken = localStorage.getItem("accessToken");
		if (actions.getLoggedUser() === null) {
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
	}

	function getUsers() {
		fetch(BASE_URL + "users", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			}
		})
			.then(response => {
				console.log(response);
				return response.json();
			})
			.then(responseJson => {
				if (responseJson.msg !== undefined && responseJson.msg === "Token has expired") {
					history.push("/");
				}
				setUsers(responseJson);
				setLoading(false);
			})
			.catch(error => {
				alert("Error:", error);
			});
	}

	/* ==================*/
	function createUser() {
		const formData = new FormData();
		formData.append("role_id", roleId);
		formData.append("full_name", fullName);
		formData.append("password_user", passwordUser);
		formData.append("email_address", emailAddress);
		formData.append("phone_number", phoneNumber);

		fetch(BASE_URL + "users/create", {
			method: "POST",
			body: formData,
			headers: {
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			}
		})
			.then(
				response => response.json() // if the response is a JSON object
			)
			.then(
				success => history.push("/users") // Handle the success response object
			)
			.catch(
				error => console.log(error) // Handle the error response object
			);
	}

	const rolesHtml = roles.map(role => {
		return (
			<option key={role.id} value={role.id}>
				{role.name}
			</option>
		);
	});

	let rolesDivHtml = "";
	if (canRoleIDDo(role_id, "users/setRolesManual")) {
		rolesDivHtml = (
			<div className="form-group row">
				<label htmlFor="roles" className="col-md-4 col-form-label text-md-right">
					Role
				</label>
				<div className="col-md-6">
					<select
						defaultValue="0"
						className="custom-select mr-sm-2"
						id="inlineFormCustomSelect"
						onChange={e => setRoleId(e.target.value)}>
						<option value="0">Choose...</option>

						{rolesHtml}
					</select>
				</div>
			</div>
		);
	}

	return (
		<div className="container">
			<h2> Create User</h2>
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-body">
							{rolesDivHtml}

							<div className="form-group row">
								<label htmlFor="full_name" className="col-md-4 col-form-label text-md-right">
									Full Name
								</label>
								<div className="col-md-6">
									<input
										onChange={e => setFullName(e.target.value)}
										type="text"
										id="fullName"
										className="form-control"
										name="fullName"
										value={fullName}
									/>
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">
									E-Mail Address
								</label>
								<div className="col-md-6">
									<input
										onChange={e => setEmailAddress(e.target.value)}
										type="text"
										id="emailAddress"
										className="form-control"
										name="emailAddress"
										value={emailAddress}
									/>
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="password" className="col-md-4 col-form-label text-md-right">
									Password
								</label>
								<div className="col-md-6">
									<input
										onChange={e => setPasswordUser(e.target.value)}
										type="text"
										id="passwordUser"
										className="form-control"
										name="passwordUser"
										value={passwordUser}
									/>
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="phone_number" className="col-md-4 col-form-label text-md-right">
									Phone Number
								</label>
								<div className="col-md-6">
									<input
										onChange={e => setPhoneNumber(e.target.value)}
										type="text"
										id="phoneNumber"
										className="form-control"
										name="phoneNumber"
										value={phoneNumber}
									/>
								</div>
							</div>

							<div className="col-md-6 offset-md-4">
								<button className="btn btn-primary" onClick={createUser}>
									Create user
								</button>
								&nbsp; &nbsp;
								<Link to="/users">
									<button type="submit" className="btn btn-primary">
										Cancel
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
