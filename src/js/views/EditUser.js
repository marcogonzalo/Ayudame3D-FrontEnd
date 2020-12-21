import React, { useContext, useState, useEffect, Fragment } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "../../styles/editUser.scss";
import { Context } from "../store/appContext";
import canRoleIDDo, { isHelper, isManager, isAdmin } from "../helpers/UserHelper";
import { SelectFilledAndSelected } from "../component/SelectFilledAndSelected";

export const EditUser = () => {
	const BASE_URL = process.env.BASE_URL;
	const history = useHistory();
	let { id } = useParams();
	const { actions } = useContext(Context);
	const [user, setUser] = useState(null);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getUser(id);
	}, []);

	if (loading || user == null) {
		return "Loading...";
	}

	function getUser(id) {
		fetch(BASE_URL + "users/" + id, {
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
				console.log(responseJson);
				if (responseJson.msg !== undefined && responseJson.msg === "Token has expired") {
					history.push("/");
				}
				setUser(responseJson);
				setLoading(false);
			})
			.catch(error => {
				alert("Error:", error);
			});
	}

	let divRoleUser = "";
	let role_id = actions.getLoggedUserRoleID();
	if (canRoleIDDo(role_id, "users/changeRole")) {
		divRoleUser = (
			<div className="form-group row">
				<label htmlFor="user" className="col-md-4 col-form-label text-md-right">
					Role
				</label>
				<div className="col-md-6">
					<div className="col-md-6">
						<SelectFilledAndSelected data={users} idSelected={user.role.id} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container">
			<h2> Edit User</h2>
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-body">
							<form name="my-form">
								<div className="form-group row">
									<label htmlFor="nid_number" className="col-md-4 col-form-label text-md-right">
										<abbr title="Id User">ID</abbr> Number
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="Id"
											className="form-control"
											name="Id User"
											defaultValue={user.id}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="full_name" className="col-md-4 col-form-label text-md-right">
										Full Name
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="name"
											className="form-control"
											name="name"
											defaultValue={user.full_name}
										/>
									</div>
								</div>

								{divRoleUser}

								<div className="form-group row">
									<label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">
										E-Mail Address
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="email"
											className="form-control"
											name="email"
											defaultValue={user.email}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="phone_number" className="col-md-4 col-form-label text-md-right">
										Phone Number
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="phone"
											className="form-control"
											name="phone"
											defaultValue={user.phone}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="present_address" className="col-md-4 col-form-label text-md-right">
										Address
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="address"
											className="form-control"
											name="address"
											defaultValue={user.address}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="city" className="col-md-4 col-form-label text-md-right">
										City
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="city"
											className="form-control"
											name="city"
											defaultValue={user.city}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="country" className="col-md-4 col-form-label text-md-right">
										Country
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="country"
											className="form-control"
											name="country"
											defaultValue={user.country}
										/>
									</div>
								</div>

								<div className="col-md-6 offset-md-4">
									<Link to="/users">
										<button className="btn btn-primary" type="submit" value="submit">
											Save user
										</button>
									</Link>
									&nbsp; &nbsp;
									<Link to="/users">
										<button className="btn btn-primary" type="submit" value="submit">
											Cancel
										</button>
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
