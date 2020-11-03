import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/createOrder.scss";

export const CreateOrder = () => {
	const [file, setFile] = useState(null);
	const [helperId, setHelperId] = useState(1);

	function fileSelected(event) {
		let input = event.currentTarget;
		setFile(input.files[0]);
	}

	function createOrder() {
		const formData = new FormData();
		formData.append("description", "abc123");
		formData.append("helper_id", helper_id);
		formData.append("document", file);

		fetch("https://3000-c1474300-2ab3-41da-a96e-eb802ce05da6.ws-eu01.gitpod.io/upload-file", {
			method: "POST",
			body: formData
		})
			.then(
				response => response.json() // if the response is a JSON object
			)
			.then(
				success => console.log(success) // Handle the success response object
			)
			.catch(
				error => console.log(error) // Handle the error response object
			);
	}

	return (
		<div className="container">
			<h2> Create Order</h2>
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-body">
							<div className="form-group row">
								<label htmlFor="user_rol" className="col-md-4 col-form-label text-md-right">
									Description
								</label>
								<div className="col-md-6">
									<input type="text" id="description" className="form-control" name="description" />
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="full_name" className="col-md-4 col-form-label text-md-right">
									Helper
								</label>
								<div className="col-md-6">
									<select
										defaultValue="0"
										className="custom-select mr-sm-2"
										id="inlineFormCustomSelect">
										<option value="0">Choose...</option>
										<option value="1">Jhon Matius</option>
										<option value="2">Pedro Fernandez</option>
										<option value="3">Jose Gonzalez</option>
										<option value="4">María Sanchez</option>
									</select>
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="status" className="col-md-4 col-form-label text-md-right">
									Status
								</label>
								<div className="col-md-6">
									<select
										defaultValue="0"
										className="custom-select mr-sm-2"
										id="inlineFormCustomSelect">
										<option value="0">Choose...</option>
										<option value="1">Pending</option>
										<option value="2">Processing</option>
										<option value="3">Rejected</option>
										<option value="4">Completed</option>
									</select>
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="documents" className="col-md-4 col-form-label text-md-right">
									Documents
								</label>
								<div className="form-group">
									<div className="col-sm-9">
										<span className="btn btn-default ">
											<input
												name="document"
												type="file"
												className="file"
												multiple
												onChange={fileSelected}
												id="input-file"
											/>
										</span>
									</div>
								</div>
							</div>

							<div className="col-md-6 offset-md-4">
								<button className="btn btn-primary" onClick={createOrder}>
									Create Order
								</button>
								<Link to="/orders">
									<button className="btn btn-primary">Cancel</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
