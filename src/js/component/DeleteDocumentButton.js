import React from "react";
import { PropTypes } from "prop-types";
import { useHistory } from "react-router-dom";

export const DeleteDocumentButton = props => {
	const BASE_URL = process.env.BASE_URL;
	const { document, onDelete } = props;
	const history = useHistory();

	function deleteDocument() {
		fetch(BASE_URL + "documents/" + document.id + "/delete", {
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
				if (responseJson.msg !== undefined && responseJson.msg === "Token has expired") {
					history.push("/");
				}
			})
			.catch(error => {
				console.log("Error: " + error);
			})
			.finally(() => {
				onDelete(document.id);
			});
	}

	return (
		<button type="button" disabled={props.disabled} className="btn btn-sm p-0" onClick={deleteDocument}>
			{props.children}
		</button>
	);
};

DeleteDocumentButton.propTypes = {
	document: PropTypes.object,
	children: PropTypes.node.isRequired,
	onDelete: PropTypes.func,
	disabled: PropTypes.bool
};
