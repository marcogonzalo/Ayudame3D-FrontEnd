import React from "react";
import { Link } from "react-router-dom";
import "../../styles/editUser.scss";

export const EditUser = () => {
	const user = {
		id: 3,
		role: "Helper",
		name: "John Matius",
		email: "jmatius@gmail.com",
		phone: "9652356",
		address: "Calle Valencia",
		city: "Madrid",
		country: "España"
	};

	let usersInf = [
		{
			id: 1,
			name: "Erik Wilson",
			role: "Helper"
		},
		{
			id: 2,
			name: "Mario Fernanzez",
			role: "Gestor"
		},
		{
			id: 3,
			name: "John Matius",
			role: "Administrator"
		}
	];

	let userHtml = usersInf.map(userdata => {
		let selected = "";
		if (userdata.id === user.id) {
			selected = "selected";
		}
		return (
			<option selected={selected} key={userdata.id} value={userdata.role}>
				{userdata.role}
			</option>
		);
	});

	return (
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
										<input
											type="text"
											id="Id"
											className="form-control"
											name="Id User"
											defaultValue={user.id}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="user_role" className="col-md-4 col-form-label text-md-right">
										Role
									</label>
									<div className="col-md-6">
										<select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
											<option>Choose...</option>
											{userHtml}
										</select>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="full_name" className="col-md-4 col-form-label text-md-right">
										Full Name
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="name"
											className="form-control"
											name="name"
											defaultValue={user.name}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">
										E-Mail Address
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="email"
											className="form-control"
											name="email"
											defaultValue={user.email}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="phone_number" className="col-md-4 col-form-label text-md-right">
										Phone Number
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="phone"
											className="form-control"
											name="phone"
											defaultValue={user.phone}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="present_address" className="col-md-4 col-form-label text-md-right">
										Address
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="address"
											className="form-control"
											name="address"
											defaultValue={user.address}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="city" className="col-md-4 col-form-label text-md-right">
										City
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="city"
											className="form-control"
											name="city"
											defaultValue={user.city}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="country" className="col-md-4 col-form-label text-md-right">
										Country
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="country"
											className="form-control"
											name="country"
											defaultValue={user.country}
										/>
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
};
