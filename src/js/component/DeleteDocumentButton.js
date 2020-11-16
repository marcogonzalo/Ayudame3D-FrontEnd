import React from "react";
import { PropTypes } from "prop-types";
import { BASE_URL } from "../helpers/UrlHelper";

export const DeleteDocumentButton = props => {
	const { document, onDelete } = props;

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
				alert("Error:", error);
			})
			.finally(() => {
				onDelete(document.id);
			});
	}

	return (
		<button type="button" className="btn btn-danger" onClick={deleteDocument}>
			{props.children}
		</button>
	);
};

DeleteDocumentButton.propTypes = {
	document: PropTypes.object,
	children: PropTypes.node.isRequired,
	onDelete: PropTypes.func
};
