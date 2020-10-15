import React from "react";
import { Link } from "react-router-dom";
import "../../styles/orders.scss";

export const Orders = () => (
	<div className="text-center mt-5">
		<h2>Orders</h2>
		<table className="center">
			<tr>
				<th>Id Order</th>
				<th>Status</th>
				<th>Helper</th>
				<th>Email</th>
				<th>Actions</th>
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editOrder">
									<i className="fa fa-edit" />
								</Link>
							</button>
						</li>
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Delete">
								<Link to="/deleteOrder">
									<i className="far fa-trash-alt" />
								</Link>
							</button>
						</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editOrder">
									<i className="fa fa-edit" />
								</Link>
							</button>
						</li>
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Delete">
								<Link to="/deleteOrder">
									<i className="far fa-trash-alt" />
								</Link>
							</button>
						</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editOrder">
									<i className="fa fa-edit" />
								</Link>
							</button>
						</li>
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Delete">
								<Link to="/deleteOrder">
									<i className="far fa-trash-alt" />
								</Link>
							</button>
						</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editOrder">
									<i className="fa fa-edit" />
								</Link>
							</button>
						</li>
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Delete">
								<Link to="/deleteOrder">
									<i className="far fa-trash-alt" />
								</Link>
							</button>
						</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
				<td>
					<ul className="list-inline m-0">
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Edit">
								<Link to="/editOrder">
									<i className="fa fa-edit" />
								</Link>
							</button>
						</li>
						<li className="list-inline-item">
							<button
								className="btn btn-sm rounded-0"
								type="button"
								data-toggle="tooltip"
								data-placement="top"
								title="Delete">
								<Link to="/deleteOrder">
									<i className="far fa-trash-alt" />
								</Link>
							</button>
						</li>
					</ul>
				</td>
			</tr>
		</table>

		<hr className="my-4" />

		<Link to="/createOrder">
			<button className="btn btn-primary" type="submit" value="submit" m>
				Create Order
			</button>
		</Link>
	</div>
);
