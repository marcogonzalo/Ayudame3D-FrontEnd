import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../../styles/forgotPassword.scss";

export const ResetPassword = () => {
	const BASE_URL = process.env.BASE_URL;
	const params = new URLSearchParams(useLocation().search);
	const token = params.get("token");
	const history = useHistory();
	const [password, setPassword] = useState(null);
	const [repeatPassword, setRepeatPassword] = useState(null);
	const [msg, setMsg] = useState(null);

	const handleSubmit = event => {
		event.preventDefault();
		if (password !== repeatPassword) {
			setMsg("Las contraseñas no coinciden");
			return;
		}
		setMsg(null);

		let data = {
			password,
			token
		};

		fetch(BASE_URL + "reset-password", {
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
				if (responseJson.status === "ok") {
					history.push("/login");
				} else {
					setMsg("Ha habido un error, intenta más tarde.");
				}
			});
	};
	return (
		<div className="form-gap">
			<div className="container">
				<div className="row">
					<div className="col-md-4 col-md-offset-4 mx-auto">
						<div className="panel panel-default">
							<div className="panel-body">
								<div className="text-center">
									<h3>
										<i className="fa fa-lock fa-2x" />
									</h3>
									<h2 className="text-center">Restablecer contraseña</h2>
									<p>Inserta el correo electrónico asociado a tu cuenta.</p>
									<div className="panel-body">
										<form
											id="register-form"
											role="form"
											autoComplete="off"
											className="form"
											method="post">
											<div className="form-group">
												<div className="input-group">
													<input
														id="password"
														name="password"
														placeholder="Password"
														className="form-control"
														type="password"
														onChange={e => setPassword(e.target.value)}
													/>
												</div>
											</div>
											<div className="form-group">
												<div className="input-group">
													<input
														id="repeat-password"
														name="repeat-password"
														placeholder="Repeat your password"
														className="form-control"
														type="password"
														onChange={e => setRepeatPassword(e.target.value)}
													/>
												</div>
											</div>
											<div className="form-group">
												<input
													name="recover-submit"
													className="btn btn-lg btn-primary btn-block"
													value="Reset Password"
													onClick={e => handleSubmit(e)}
													type="submit"
												/>
											</div>
											<div className="form-group">
												<Link to="/">
													<button className="btn btn-lg btn-primary btn-block">Cancel</button>
												</Link>
											</div>
										</form>
										{msg && (
											<div>
												<b>{msg}</b>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
