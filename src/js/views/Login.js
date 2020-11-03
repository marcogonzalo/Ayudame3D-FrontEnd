import React, { useState } from "react";
import "../../styles/login.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const Login = () => {
	let history = useHistory();

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	function login(event) {
		event.preventDefault();
		let data = {
			email: email,
			password: password
		};

		fetch("https://3000-c6e3d648-b9dc-4aca-942d-937c30697a99.ws-eu01.gitpod.io/login", {
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
					alert("El usuario no existe.");
				} else {
					localStorage.setItem("accessToken", responseJson.access_token);
					alert("Usuario correcto");
					history.push("/orders");
				}
			});
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div className="card card-signin my-5">
						<div className="card-body">
							<h5 className="card-title text-center">LOGIN</h5>
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
									<label htmlFor="inputEmail" />
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
