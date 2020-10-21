import React from "react";
import { Link } from "react-router-dom";
import { ConfirmModal } from "../component/ConfirmModal";
import { PropTypes } from "prop-types";

export const OrderTr = props => {
	OrderTr.propTypes = {
		order: PropTypes.obj
	};

	const { order } = props;

	function archiveOrder() {
		console.log(`Archivariamos el pedido con id ${order.id}`);
	}

	return (
		<tr>
			<td>{order.id}</td>
			<td>{order.status}</td>
			<td>{order.helper.name}</td>
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
						<i
							className="far fa-trash-alt"
							data-toggle="modal"
							data-target={`#order-archive-${order.id}`}
						/>
						<ConfirmModal
							id={`order-archive-${order.id}`}
							body="¿Deseas archivar este pedido?"
							confirm={archiveOrder}
						/>
					</li>
				</ul>
			</td>
		</tr>
	);
};
