import React, { Component, useContext } from "react";
import { ConfirmModal } from "../component/ConfirmModal";
import { Context } from "../store/appContext";

export const Footer = () => {
	const { store } = useContext(Context);

	return (
		<footer className="footer mt-auto py-3 text-center">
			<p>Made by Joseluises</p>
			<ConfirmModal id="confirm-modal" body={store.confirmModal.body} confirm={store.confirmModal.confirm} />
		</footer>
	);
};
