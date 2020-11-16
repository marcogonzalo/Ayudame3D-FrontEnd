const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			confirmModal: {
				body: "",
				confirm: null
			},
			loggedUser: null
		},
		actions: {
			getLoggedUserRoleID() {
				const store = getStore();
				let user = this.getLoggedUser();
				if (user !== null && user.role_id) {
					return user.role_id;
				} else {
					return null;
				}
			},
			getLoggedUser() {
				const store = getStore();
				if (store.loggedUser !== null) {
					return store.loggedUser;
				}

				let userInLocalStorage = localStorage.getItem("loggedUser");
				if (userInLocalStorage !== null) {
					this.setLoggedUser(JSON.parse(userInLocalStorage));
				}

				return userInLocalStorage;
			},
			setLoggedUser(user) {
				setStore({ loggedUser: user });
				localStorage.setItem("loggedUser", JSON.stringify(user));
			},
			logout() {
				setStore({ loggedUser: null });
				localStorage.removeItem("loggedUser");
			},
			askConfirmation(body, confirmCallback) {
				setStore({
					confirmModal: {
						body: body,
						confirm: confirmCallback
					}
				});
				$("#confirm-modal").modal();
			}
		}
	};
};

export default getState;
