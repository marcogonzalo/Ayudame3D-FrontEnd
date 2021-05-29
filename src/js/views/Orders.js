import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../styles/orders.scss";
import { OrderTr } from "../component/OrderTr";
import { ConfirmModal } from "../component/ConfirmModal";
import { Context } from "../store/appContext";
import canRoleIDDo, { isHelper } from "../helpers/UserHelper";

export const Orders = () => {
	const BASE_URL = process.env.BASE_URL;
	const [loading, setLoading] = useState(true);
	const [loadingOrders, setLoadingOrders] = useState(false);
	const [orders, setOrders] = useState([]);
	const { actions, store } = useContext(Context);
	const history = useHistory();

	function getOrders() {
		fetch(BASE_URL + "orders", {
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
				if (responseJson.msg !== undefined && responseJson.msg === "Token has expired") {
					history.push("/");
					return;
				}
				setOrders(responseJson);
				setLoading(false);
				setLoadingOrders(false);
			});
	}

	useEffect(
		() => {
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
						getOrders();
					});
			} else {
				getOrders();
			}
		},
		[loadingOrders]
	);

	if (loading) {
		return "Loading...";
	}

	const ordersHtml = orders.map(order => {
		return <OrderTr key={order.id} order={order} setLoadingOrder={setLoadingOrders} />;
	});

	let role_id = actions.getLoggedUserRoleID();
	let buttonCreateOrder = "";
	if (canRoleIDDo(role_id, "orders/create")) {
		buttonCreateOrder = (
			<Link to="/orders/create">
				<button className="btn btn-primary float-left">Create Order</button>
			</Link>
		);
	}

	let conditionalColumns = "";
	if (!isHelper(role_id)) {
		conditionalColumns = (
			<Fragment>
				<th>Helper</th>
				<th className="d-none d-sm-table-cell">Email</th>
			</Fragment>
		);
	}

	return (
		<div className="text-center mt-5">
			{buttonCreateOrder}
			<table className="table table-bordered ">
				<thead>
					<tr>
						<th colSpan="8">ORDERS</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Id Order</th>
						{conditionalColumns}
						<th>Subject</th>
						<th>Status</th>
						<th>Created At</th>
						<th>Actions</th>
					</tr>
					{ordersHtml}
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
								Delete Order
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
