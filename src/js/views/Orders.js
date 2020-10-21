import React from "react";
import { Link } from "react-router-dom";
import "../../styles/orders.scss";
import { OrderTr } from "../component/OrderTr";
import { ConfirmModal } from "../component/ConfirmModal";

export const Orders = () => {
	let orders = [
		{
			id: 1234,
			status: "processing",
			helper: {
				id: 1,
				name: "Erik Wilson",
				email: "erwilson@gmail.com"
			}
		},

		{
			id: 5214,
			status: "processing",
			helper: {
				id: 2,
				name: "Mario Fernanzez",
				email: "mfernandez@gmail.com"
			}
		},

		{
			id: 8663,
			status: "pending",
			helper: {
				id: 3,
				name: "John Matius",
				email: "jmathius@gmail.com"
			}
		},

		{
			id: 9951,
			status: "rejected",
			helper: {
				id: 4,
				name: "Fernando Gonzalez",
				email: "fgonzalez@gmail.com"
			}
		},

		{
			id: 6689,
			status: "completes",
			helper: {
				id: 5,
				name: "Pedro Andrés",
				email: "pandres@gmail.com"
			}
		}
	];

	function archiveOrder() {} // ??????
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
