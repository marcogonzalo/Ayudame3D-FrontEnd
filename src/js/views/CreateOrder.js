import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../styles/createOrder.scss";
import canRoleIDDo from "../helpers/UserHelper";
import { Context } from "../store/appContext";

export const CreateOrder = () => {
	const BASE_URL = process.env.BASE_URL;
	const history = useHistory();
	const { actions } = useContext(Context);
	const [files, setFiles] = useState([]);
	const [helpers, setHelpers] = useState([]);
	const [statuses, setStatuses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [description, setDescription] = useState("");
	const [helper, setHelper] = useState(0);

	let role_id = actions.getLoggedUserRoleID();
	if (!canRoleIDDo(role_id, "orders/create")) {
		return "Permission denied.";
	}

	useEffect(() => {
		getHelpersAndSet();
	}, []);

	if (loading) {
		return "Loading...";
	}

	function getHelpersAndSet() {
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
					getHelpers();
				});
		} else {
			getHelpers();
		}
	}

	function getHelpers() {
		fetch(BASE_URL + "helpers", {
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
				setHelpers(responseJson);
				setLoading(false);
			})
			.catch(error => {
				alert("Error:", error);
			});
	}

	function fileSelected(event) {
		let input = event.currentTarget;
		setFiles(input.files);
	}

	function createOrder() {
		const formData = new FormData();
		formData.append("description", description);
		formData.append("helper_id", helper);

		for (var i = 0; i < files.length; i++) {
			formData.append("document" + i, files[i]);
		}

		fetch(BASE_URL + "orders/create", {
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
				success => history.push("/orders") // Handle the success response object
			)
			.catch(
				error => console.log(error) // Handle the error response object
			);
	}

	let statusesDivHtml = "";
	if (canRoleIDDo(role_id, "orders/setStatusManual")) {
		statusesDivHtml = (
			<div className="form-group row">
				<label htmlFor="status" className="col-md-4 col-form-label text-md-right">
					Status
				</label>

				<div className="col-md-6">
					<select defaultValue="0" className="custom-select mr-sm-2" id="inlineFormCustomSelect">
						<option value="0">Pending</option>
					</select>
				</div>
			</div>
		);
	}

	const helpersHtml = helpers.map(helper => {
		return (
			<option key={helper.id} value={helper.id}>
				{helper.full_name}
			</option>
		);
	});

	return (
		<div className="container">
			<h2> Create Order</h2>
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-body">
							<div className="form-group row">
								<label htmlFor="user_rol" className="col-md-4 col-form-label text-md-right">
									Description
								</label>
								<div className="col-md-6">
									<input
										onChange={e => setDescription(e.target.value)}
										type="text"
										id="description"
										className="form-control"
										name="description"
										value={description}
									/>
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="full_name" className="col-md-4 col-form-label text-md-right">
									Helper
								</label>
								<div className="col-md-6">
									<select
										onChange={e => setHelper(e.currentTarget.value)}
										defaultValue="0"
										className="custom-select mr-sm-2"
										id="inlineFormCustomSelect"
										required>
										<option value="0">Choose...</option>
										{helpersHtml}
									</select>
								</div>
							</div>

							{statusesDivHtml}

							<div className="form-group row">
								<label htmlFor="documents" className="col-md-4 col-form-label text-md-right">
									Documents
								</label>
								<div className="form-group">
									<div className="col-sm-9">
										<span className="btn btn-default ">
											<input
												name="document"
												type="file"
												className="file"
												multiple
												onChange={fileSelected}
												id="input-file"
											/>
										</span>
									</div>
								</div>
							</div>

							<div className="col-md-6 offset-md-4">
								<button className="btn btn-primary" onClick={createOrder}>
									Create Order
								</button>
								&nbsp; &nbsp;
								<Link to="/orders">
									<button className="btn btn-primary">Cancel</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
