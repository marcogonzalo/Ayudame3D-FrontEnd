import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Users } from "./views/Users";
import { CreateUser } from "./views/CreateUser";
import { CreateOrder } from "./views/CreateOrder";
import { EditOrder } from "./views/EditOrder";
import { EditUser } from "./views/EditUser";
import { Orders } from "./views/Orders";
import { Login } from "./views/Login";
import { ForgotPassword } from "./views/forgot-password";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Login />
						</Route>
						<Route exact path="/users">
							<Users />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/orders">
							<Orders />
						</Route>
						<Route exact path="/forgot-password">
							<ForgotPassword />
						</Route>
						<Route exact path="/users/create">
							<CreateUser />
						</Route>
						<Route exact path="/users/:id/edit">
							<EditUser />
						</Route>
						<Route exact path="/orders/create">
							<CreateOrder />
						</Route>
						<Route exact path="/orders/:id/edit">
							<EditOrder />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
