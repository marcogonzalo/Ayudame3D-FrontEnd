import React from "react";
import { PropTypes } from "prop-types";

export const SelectFilledAndSelected = props => {
	let dataHtml = props.data.map(row => {
		let name = row.name;
		if (name == "" || name == undefined || name == null) {
			name = row.full_name;
		}
		return (
			<option key={row.id} value={row.id}>
				{name}
			</option>
		);
	});

	return (
		<select value={props.idSelected} className="custom-select mr-sm-2">
			<option>Choose...</option>
			{dataHtml}
		</select>
	);
};

SelectFilledAndSelected.propTypes = {
	data: PropTypes.array,
	idSelected: PropTypes.number
};
