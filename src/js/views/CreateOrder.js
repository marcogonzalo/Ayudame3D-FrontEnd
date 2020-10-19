import React from "react";
import { Link } from "react-router-dom";
import "../../styles/createOrder.scss";

export const CreateOrder = () => (
	<div className="container">
		<h2> Create Order</h2>
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<form name="my-form" onSubmit="return validform()" action="success.php" method="">
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
									<select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
										<option selected>Choose...</option>
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
									<select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
										<option selected>Choose...</option>
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
											<input type="file" className="file" multiple />
										</span>
									</div>
								</div>
							</div>

							<div className="col-md-6 offset-md-4">
								<Link to="/orders">
									<button type="submit" className="btn btn-primary">
										Create Order
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
