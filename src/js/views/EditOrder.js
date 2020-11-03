import React from "react";
import { Link } from "react-router-dom";
import "../../styles/editOrder.scss";
import { SelectFilledAndSelected } from "../component/SelectFilledAndSelected";

export const EditOrder = () => {
	const order = {
		id: 8663,
		status: {
			id: 1,
			name: "pending"
		},
		helper: {
			id: 3,
			name: "John Matius",
			email: "jmatius@gmail.com"
		},
		description: "Diseño 3D"
	};

	let helpers = [
		{
			id: 1,
			name: "Erik Wilson"
		},
		{
			id: 2,
			name: "Mario Fernanzez"
		},
		{
			id: 3,
			name: "John Matius"
		}
	];

	let statuses = [
		{
			id: 1,
			name: "pending"
		},
		{
			id: 2,
			name: "completed"
		}
	];

	return (
		<div className="container">
			<h2> Edit Order</h2>
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-body">
							<form name="my-form">
								<div className="form-group row">
									<label htmlFor="description" className="col-md-4 col-form-label text-md-right">
										Description
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="description"
											className="form-control"
											name="description"
											defaultValue={order.description}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="helper" className="col-md-4 col-form-label text-md-right">
										Helper
									</label>
									<div className="col-md-6">
										<div className="col-md-6">
											<SelectFilledAndSelected data={helpers} idSelected={order.helper.id} />
										</div>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="user_rol" className="col-md-4 col-form-label text-md-right">
										Status
									</label>
									<div className="col-md-6">
										<div className="col-md-6">
											<SelectFilledAndSelected data={statuses} idSelected={order.status.id} />
										</div>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">
										Documents
									</label>
									<div className="col-md-6">
										<input type="text" id="documents" className="form-control" name="documents" />
									</div>
								</div>

								<div className="col-md-6 offset-md-4">
									<Link to="/orders">
										<button type="submit" className="btn btn-primary">
											Save Order
										</button>
									</Link>{" "}
									<Link to="/orders">
										<button type="submit" className="btn btn-primary">
											Cancel
										</button>
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
