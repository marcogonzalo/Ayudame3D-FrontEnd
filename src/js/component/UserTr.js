import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ConfirmModal } from "../component/ConfirmModal";
import { PropTypes } from "prop-types";

export const UserTr = props => {
	const { actions } = useContext(Context);
	const { user } = props;
	const BASE_URL = process.env.BASE_URL;

	function archiveUser() {
		fetch(BASE_URL + "users/" + user.id, {
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
				console.log("User: ", responseJson.full_name, ", was deleted");
			});
	}

	return (
		<tr>
			<td>{user.id}</td>
			<td>{user.full_name}</td>
			<td>{user.role.name}</td>
			<td className="d-none d-sm-table-cell">{user.email}</td>
			<td>
				<ul className="list-inline m-0">
					<li className="list-inline-item">
						<button
							className="btn btn-sm rounded-0"
							type="button"
							data-toggle="tooltip"
							data-placement="top"
							title="Edit">
							<Link to={`/users/${user.id}/edit`}>
								<i className="fa fa-edit" />
							</Link>
						</button>
					</li>
					<li className="list-inline-item">
						<i className="far fa-trash-alt" data-toggle="modal" data-target={`#user-archive-${user.id}`} />
						<ConfirmModal
							id={`user-archive-${user.id}`}
							body="¿Deseas archivar este usuario?"
							confirm={archiveUser}
						/>
					</li>
				</ul>
			</td>
		</tr>
	);
};
UserTr.propTypes = {
	user: PropTypes.object
};
