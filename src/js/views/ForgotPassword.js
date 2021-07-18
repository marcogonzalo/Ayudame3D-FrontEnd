import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/forgotPassword.scss";

export const ForgotPassword = () => {
	const BASE_URL = process.env.BASE_URL;
	const [email, setEmail] = useState(null);
	const [msg, setMsg] = useState(null);

	const handleSubmit = event => {
		event.preventDefault();
		let data = {
			email
		};

		fetch(BASE_URL + "request-password-email", {
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
					setMsg(
						"Hemos enviado un mensaje a la dirección que has indicado con las instrucciones para restablecer tu contraseña."
					);
				} else {
					setError("Ha habido un error, intenta más tarde.");
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
													<span className="input-group-addon">
														<i className="glyphicon glyphicon-envelope color-blue" />
													</span>
													<input
														id="email"
														name="email"
														placeholder="email address"
														className="form-control"
														type="email"
														onChange={e => setEmail(e.target.value)}
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
													<button className="btn btn-lg btn-scondary btn-block">
														Cancel
													</button>
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
