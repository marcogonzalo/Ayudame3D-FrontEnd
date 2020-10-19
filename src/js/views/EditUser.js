import React from "react";
import { Link } from "react-router-dom";
import "../../styles/editUser.scss";

export const EditUser = () => (
	<div className="container">
		<h2> Edit User</h2>
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<form name="my-form" onSubmit="return validform()" action="success.php" method="">
							<div className="form-group row">
								<label htmlFor="nid_number" className="col-md-4 col-form-label text-md-right">
									<abbr title="Id User">ID</abbr> Number
								</label>
								<div className="col-md-6">
									<input type="text" id="nid_number" className="form-control" name="nid-number" />
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="user_rol" className="col-md-4 col-form-label text-md-right">
									Role
								</label>
								<div className="col-md-6">
									<input type="text" id="user_name" className="form-control" name="username" />
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="full_name" className="col-md-4 col-form-label text-md-right">
									Full Name
								</label>
								<div className="col-md-6">
									<input type="text" id="full_name" className="form-control" name="full-name" />
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">
									E-Mail Address
								</label>
								<div className="col-md-6">
									<input
										type="text"
										id="email_address"
										className="form-control"
										name="email-address"
									/>
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="phone_number" className="col-md-4 col-form-label text-md-right">
									Phone Number
								</label>
								<div className="col-md-6">
									<input type="text" id="phone_number" className="form-control" />
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="present_address" className="col-md-4 col-form-label text-md-right">
									Address
								</label>
								<div className="col-md-6">
									<input type="text" id="present_address" className="form-control" />
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="city" className="col-md-4 col-form-label text-md-right">
									City
								</label>
								<div className="col-md-6">
									<input type="text" id="city" className="form-control" name="city" />
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="country" className="col-md-4 col-form-label text-md-right">
									Country
								</label>
								<div className="col-md-6">
									<input type="text" id="country" className="form-control" name="country" />
								</div>
							</div>

							<div className="col-md-6 offset-md-4">
								<Link to="/users">
									<button className="btn btn-primary" type="submit" value="submit" m>
										Save user
									</button>
								</Link>{" "}
								<Link to="/users">
									<button className="btn btn-primary" type="submit" value="submit" m>
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
