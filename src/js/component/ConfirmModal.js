import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

export const ConfirmModal = props => {
	ConfirmModal.propTypes = {
		id: PropTypes.string,
		body: PropTypes.string,
		confirm: PropTypes.func
	};
	return (
		<div
			className="modal fade"
			id={props.id}
			tabIndex="-1"
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Confirmación
						</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">{props.body}</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-dismiss="modal">
							No
						</button>
						<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={props.confirm}>
							Sí
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
