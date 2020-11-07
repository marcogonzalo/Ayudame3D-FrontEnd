import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "../../styles/editOrder.scss";
import { SelectFilledAndSelected } from "../component/SelectFilledAndSelected";
import { isPending } from "../helpers/StatusHelper";
import { Context } from "../store/appContext";
import canRoleIDDo, { isHelper } from "../helpers/UserHelper";
import { BASE_URL } from "../helpers/UrlHelper";

export const EditOrder = () => {
	const history = useHistory();
	let { id } = useParams();
	const { actions } = useContext(Context);
	const [order, setOrder] = useState(null);
	const [helpers, setHelpers] = useState([]);
	const [loading, setLoading] = useState(true);
	//Fetch order with id
	let statuses = [
		{
			id: 1,
			name: "pending"
		},
		{
			id: 2,
			name: "completed"
		}
	];

	useEffect(() => {
		getOrder(id);
	}, []);

	if (loading) {
		return "Loading...";
	}

	function getOrder(id) {
		fetch(BASE_URL + "orders/" + id, {
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
				setOrder(responseJson);
				setLoading(false);
			})
			.catch(error => {
				alert("Error:", error);
			});
	}

	let divSaveButtons = (
		<div className="col-md-6 offset-md-4">
			<Link to="/orders">
				<button type="submit" className="btn btn-primary">
					Save Order
				</button>
			</Link>{" "}
			<Link to="/orders">
				<button type="submit" className="btn btn-secondary">
					Cancel
				</button>
			</Link>
		</div>
	);

	let role_id = actions.getLoggedUserRoleID();
	if (isPending(status.id) && isHelper(role_id)) {
		divSaveButtons = (
			<div className="col-md-6 offset-md-4">
				<button type="submit" className="btn btn-primary">
					Aceptar
				</button>
				<button type="submit" className="btn btn-danger">
					Rechazar
				</button>
			</div>
		);
	}

	let divHelper = "";
	if (canRoleIDDo(role_id, "orders/changeHelper")) {
		divHelper = (
			<div className="form-group row">
				<label htmlFor="helper" className="col-md-4 col-form-label text-md-right">
					Helper
				</label>
				<div className="col-md-6">
					<div className="col-md-6">
						<SelectFilledAndSelected data={helpers} idSelected={order.helper.id} />
					</div>
				</div>
			</div>
		);
	}

	let divStatus = "";
	if (canRoleIDDo(role_id, "orders/setStatusManual")) {
		divStatus = (
			<div className="form-group row">
				<label htmlFor="user_rol" className="col-md-4 col-form-label text-md-right">
					Status
				</label>
				<div className="col-md-6">
					<div className="col-md-6">
						<SelectFilledAndSelected data={statuses} idSelected={order.status.id} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container">
			<h2> Edit Order</h2>
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-body">
							<form name="my-form">
								<div className="form-group row">
									<label htmlFor="description" className="col-md-4 col-form-label text-md-right">
										Description
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="description"
											className="form-control"
											name="description"
											defaultValue={order.description}
										/>
									</div>
								</div>

								{divHelper}

								{divStatus}

								<div className="form-group row">
									<label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">
										Documents
									</label>
									<div className="col-md-6">
										<input type="text" id="documents" className="form-control" name="documents" />
									</div>
								</div>
								{divSaveButtons}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
