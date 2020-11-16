import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { PropTypes } from "prop-types";
import canRoleIDDo, { isHelper } from "../helpers/UserHelper";

export const OrderTr = props => {
	const { actions } = useContext(Context);
	const { order } = props;

	function archiveOrder() {
		actions.askConfirmation("Are you sure?", archiveOrderConfirmed);
	}

	function archiveOrderConfirmed() {
		console.log("test");
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

	let conditionalColumns = "";
	if (!isHelper(role_id)) {
		conditionalColumns = (
			<Fragment>
				<td>{order.helper.full_name}</td>
				<td className="d-none d-sm-table-cell">{order.helper.email}</td>
			</Fragment>
		);
	} else {
		conditionalColumns = <td>{order.description}</td>;
	}

	return (
		<tr>
			<td>{order.id}</td>
			<td>{order.status.name}</td>
			{conditionalColumns}
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
	order: PropTypes.object
};
