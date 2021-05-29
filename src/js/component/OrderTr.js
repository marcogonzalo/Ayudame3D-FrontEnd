import React, { useContext, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { PropTypes } from "prop-types";
import canRoleIDDo, { isHelper } from "../helpers/UserHelper";
import { isPending, isProcessing, isReady, isRejected, isApproved, isCompleted } from "../helpers/StatusHelper";
import "../../styles/orderTr.scss";

export const OrderTr = props => {
	const { actions } = useContext(Context);
	const { order, setLoadingOrder } = props;
	const BASE_URL = process.env.BASE_URL;
	function archiveOrder() {
		actions.askConfirmation("Are you sure?", archiveOrderConfirmed);
	}
	function archiveOrderConfirmed() {
		fetch(BASE_URL + "orders/" + props.order.id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			}
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				// console.log("order: ", responseJson.description, ", was deleted");
				setLoadingOrder(true);
			});
	}

	let role_id = actions.getLoggedUserRoleID();
	let liDeleteOrder = "";
	if (canRoleIDDo(role_id, "orders/delete")) {
		liDeleteOrder = (
			<li className="list-inline-item">
				<i className="far fa-trash-alt" onClick={archiveOrder} />
			</li>
		);
	}

	let statusClass = "";
	if (isPending(order.status.id)) {
		statusClass = "pending";
	} else if (isProcessing(order.status.id)) {
		statusClass = "processing";
	} else if (isReady(order.status.id)) {
		statusClass = "ready";
	} else if (isApproved(order.status.id)) {
		statusClass = "approved";
	} else if (isRejected(order.status.id)) {
		statusClass = "rejected";
	} else if (isCompleted(order.status.id)) {
		statusClass = "completed";
	}

	let conditionalColumns = "";
	if (!isHelper(role_id)) {
		conditionalColumns = (
			<Fragment>
				<td>{order.helper.full_name}</td>
				<td className="d-none d-sm-table-cell">{order.helper.email}</td>
			</Fragment>
		);
	}

	return (
		<tr>
			<td>{order.id}</td>
			{conditionalColumns}
			<td>{order.description}</td>
			<td className={statusClass}>{order.status.name}</td>
			<td>{order.created_at}</td>
			<td>
				<ul className="list-inline m-0">
					<li className="list-inline-item">
						<button
							className="btn btn-sm rounded-0"
							type="button"
							data-toggle="tooltip"
							data-placement="top"
							title="Edit">
							<Link to={`/orders/${order.id}/edit`}>
								<i className="fa fa-edit" />
							</Link>
						</button>
					</li>
					{liDeleteOrder}
				</ul>
			</td>
		</tr>
	);
};

OrderTr.propTypes = {
	order: PropTypes.object,
	setLoadingOrder: PropTypes.func
};
