import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/orders.scss";
import { OrderTr } from "../component/OrderTr";
import { ConfirmModal } from "../component/ConfirmModal";

export const Orders = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		fetch("https://3000-c6e3d648-b9dc-4aca-942d-937c30697a99.ws-eu01.gitpod.io/orders", {
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
				setOrders(responseJson);
			});
	}, []);

	const ordersHtml = orders.map(order => {
		return <OrderTr key={order.id} order={order} />;
	});

	return (
		<div className="text-center mt-5">
			<Link to="/orders/create">
				<button className="btn btn-primary float-left">Create Order</button>
			</Link>

			<table className="table table-bordered ">
				<thead>
					<tr>
						<th colSpan="8">ORDERS</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Id Order</th>
						<th>Status</th>
						<th>Helper</th>
						<th className="d-none d-sm-table-cell">Email</th>
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
