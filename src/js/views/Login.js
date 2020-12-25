import React, { useState, useContext } from "react";
import "../../styles/login.scss";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const BASE_URL = process.env.BASE_URL;
	const { actions } = useContext(Context);
	const history = useHistory();

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [error, setError] = useState("");

	function login(event) {
		event.preventDefault();
		let data = {
			email: email,
			password: password
		};

		fetch(BASE_URL + "login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				if (responseJson.status === "ko") {
					setError("El usuario no existe.");
				} else {
					actions.setLoggedUser(responseJson.user);
					localStorage.setItem("accessToken", responseJson.access_token);
					history.push("/orders");
				}
			});
	}

	let errorHTML = "";
	if (error) {
		errorHTML = (
			<div className="alert alert-danger" role="alert">
				{error}
			</div>
		);
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div className="card card-signin my-5">
						<div className="card-body">
							<h5 className="card-title text-center">LOGIN</h5>
							{errorHTML}
							<form className="form-signin" onSubmit={login}>
								<div className="form-label-group">
									<input
										type="email"
										id="inputEmail"
										className="form-control"
										placeholder="Email address"
										onChange={e => setEmail(e.target.value)}
										required
										autoFocus
									/>
									<label htmlFor="inputEmail">Email</label>
								</div>

								<div className="form-label-group">
									<input
										type="password"
										id="inputPassword"
										className="form-control"
										placeholder="Password"
										onChange={e => setPassword(e.target.value)}
										required
									/>
									<label htmlFor="inputPassword">Password</label>
								</div>
								<div className="d-flex justify-content-around">
									<div className="custom-control custom-checkbox mb-3">
										<input type="checkbox" className="custom-control-input" id="customCheck1" />
										<label className="custom-control-label" htmlFor="customCheck1">
											Remember password
										</label>
									</div>
									<div>
										<Link to="/forgot-password">Forgot password?</Link>
									</div>
								</div>

								<button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
									LOGIN
								</button>

								<hr className="my-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
