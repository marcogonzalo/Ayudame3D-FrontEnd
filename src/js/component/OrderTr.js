import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { PropTypes } from "prop-types";

export const OrderTr = props => {
	const { actions } = useContext(Context);
	const { order } = props;

	function archiveOrder() {
		actions.askConfirmation("Are you sure?", archiveOrderConfirmed);
	}

	function archiveOrderConfirmed() {
		console.log("test");
	}

	return (
		<tr>
			<td>{order.id}</td>
			<td>{order.status.name}</td>
			<td>{order.helper.full_name}</td>
			<td className="d-none d-sm-table-cell">{order.helper.email}</td>
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
					<li className="list-inline-item">
						<i className="far fa-trash-alt" onClick={archiveOrder} />
					</li>
				</ul>
			</td>
		</tr>
	);
};

OrderTr.propTypes = {
	order: PropTypes.object
};
