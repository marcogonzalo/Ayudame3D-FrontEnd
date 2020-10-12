import React from "react";
import "../../styles/login.scss";
import { Link } from "react-router-dom";

export const Login = () => (
	<div className="container">
		<div className="row">
			<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
				<div className="card card-signin my-5">
					<div className="card-body">
						<h5 className="card-title text-center">LOGIN</h5>
						<form className="form-signin">
							<div className="form-label-group">
								<input
									type="email"
									id="inputEmail"
									className="form-control"
									placeholder="Email address"
									required
									autoFocus
								/>
								<label htmlFor="inputEmail" />
							</div>

							<div className="form-label-group">
								<input
									type="password"
									id="inputPassword"
									className="form-control"
									placeholder="Password"
									required
								/>
								<label htmlFor="inputPassword" />
							</div>
							<div className="d-flex justify-content-around">
								<div className="custom-control custom-checkbox mb-3">
									<input type="checkbox" className="custom-control-input" id="customCheck1" />
									<label className="custom-control-label" htmlFor="customCheck1">
										Remember password
									</label>
								</div>
								<div>
									<a href="">Forgot password?</a>
								</div>
							</div>
							<Link to="/users">
								<button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
									LOGIN
								</button>
							</Link>

							<hr className="my-4" />
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
);
