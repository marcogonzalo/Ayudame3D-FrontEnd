import React from "react";
import { PropTypes } from "prop-types";

export const SelectFilledAndSelected = props => {
	let dataHtml = props.data.map(row => {
		return (
			<option key={row.id} value={row.id}>
				{row.name}
			</option>
		);
	});

	return (
		<select defaultValue={props.idSelected} className="custom-select mr-sm-2">
			<option>Choose...</option>
			{dataHtml}
		</select>
	);
};

SelectFilledAndSelected.propTypes = {
	data: PropTypes.array,
	idSelected: PropTypes.number
};
