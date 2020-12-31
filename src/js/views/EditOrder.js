import React, { useContext, useState, useEffect, Fragment } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "../../styles/editOrder.scss";
import { SelectFilledAndSelected } from "../component/SelectFilledAndSelected";
import { isPending, isProcessing, isReady, isCompleted } from "../helpers/StatusHelper";
import { Context } from "../store/appContext";
import canRoleIDDo, { isHelper, isManager } from "../helpers/UserHelper";
import { DeleteDocumentButton } from "../component/DeleteDocumentButton";

export const EditOrder = () => {
	const BASE_URL = process.env.BASE_URL;
	const history = useHistory();
	let { id } = useParams();

	const { actions } = useContext(Context);
	const [order, setOrder] = useState(null);
	const [helpers, setHelpers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [statuses, setStatuses] = useState([]);

	const [files, setFiles] = useState([]);
	const [video, setVideo] = useState("");
	const [savingVideo, setSavingVideo] = useState(false);

	const [pickupAddress, setPickupAddress] = useState("");
	const [pickupCity, setPickupCity] = useState("");
	const [pickupCountry, setPickupCountry] = useState("");
	const [pickupCP, setPickupCP] = useState("");

	const [deliveryAddress, setDeliveryAddress] = useState("");
	const [deliveryCity, setDeliveryCity] = useState("");
	const [deliveryCountry, setDeliveryCountry] = useState("");
	const [deliveryCP, setDeliveryCP] = useState("");

	useEffect(() => {
		getOrder(id);
		getHelpers();
	}, []);

	if (loading || order == null) {
		return "Loading...";
	}

	function getOrder(id) {
		fetch(BASE_URL + "orders/" + id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			}
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				if (responseJson.msg !== undefined && responseJson.msg === "Token has expired") {
					history.push("/");
				}
				setOrder(responseJson);
				setLoading(false);
			})
			.catch(error => {
				console.log("Error: " + error);
			});
	}

	function getHelpers() {
		fetch(BASE_URL + "helpers", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				if (responseJson.msg !== undefined && responseJson.msg === "Token has expired") {
					history.push("/");
				}
				setHelpers(responseJson);
				setLoading(false);
			})
			.catch(error => {
				console.log("Error: " + error);
			});
	}

	function setHelper(value) {
		const formData = new FormData();
		formData.append("helper_id", value);

		fetch(BASE_URL + "orders/" + order.id, {
			method: "PUT",
			body: formData,
			headers: {
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				setOrder(responseJson);
				alert("Order reasigned");
				history.push("/orders");
			})
			.catch(error => console.log(error))
			.finally(setLoading(false));
	}

	function fileSelected(event) {
		let input = event.currentTarget;
		setFiles(input.files);
	}

	function fileSelected(event) {
		let input = event.currentTarget;
		saveFiles(input.files);
		event.target.value = null;
	}

	function saveFiles(files) {
		const formData = new FormData();
		for (var i = 0; i < files.length; i++) {
			formData.append("document" + i, files[i]);
		}
		fetch(BASE_URL + "orders/" + order.id + "/save-files", {
			method: "POST",
			body: formData,
			headers: {
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			}
		})
			.then(response => response.json())
			.then(responseJson => setOrder(responseJson))
			.catch(error => console.log(error));
	}

	function setOrderReady() {
		setLoading(true);
		fetch(BASE_URL + "orders/" + order.id + "/set-ready", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			}
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				if (responseJson.msg !== undefined && responseJson.msg === "Token has expired") {
					history.push("/");
				}
				setOrder(responseJson);
			})
			.catch(error => {
				console.log("Error: " + error);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	function acceptOrder() {
		setLoading(true);
		fetch(BASE_URL + "orders/" + order.id + "/accept", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			}
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				if (responseJson.msg !== undefined && responseJson.msg === "Token has expired") {
					history.push("/");
				}
				setOrder(responseJson);
			})
			.catch(error => {
				console.log("Error: " + error);
			})
			.finally(() => {
				setLoading(false);
				history.push("/orders");
			});
	}

	function rejectOrder() {
		setLoading(true);
		fetch(BASE_URL + "orders/" + order.id + "/reject", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			}
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				if (responseJson.msg !== undefined && responseJson.msg === "Token has expired") {
					history.push("/");
				}
				setOrder(responseJson);
			})
			.catch(error => {
				console.log("Error: " + error);
			})
			.finally(() => {
				setLoading(false);
				history.push("/orders");
			});
	}

	function haveFilesUploadedForHelper(user_id) {
		return order.documents.some(document => document.user_id != user_id);
	}

	let divSaveButtons = "";
	let role_id = actions.getLoggedUserRoleID();

	if (isPending(order.status.id) && isHelper(role_id)) {
		divSaveButtons = (
			<div className="col-md-7 mx-auto">
				<button className="btn btn-primary" onClick={acceptOrder}>
					Aceptar
				</button>
				<button className="btn btn-danger" onClick={rejectOrder}>
					Rechazar
				</button>
			</div>
		);
	} else if (isProcessing(order.status.id)) {
		divSaveButtons = (
			<div className="col-md-7 mx-auto">
				<span>El gestor debe validar la documentación subida y marcar el pedido como listo.</span>
			</div>
		);
		if (isManager(role_id)) {
			let user = actions.getLoggedUser();
			if (haveFilesUploadedForHelper(user.id)) {
				divSaveButtons = (
					<div className="col-md-7 mx-auto text-center">
						<button className="btn btn-primary" onClick={setOrderReady}>
							Set Order Ready!
						</button>
					</div>
				);
			}
		}
	} else if (isReady(order.status.id) && isHelper(role_id)) {
		divSaveButtons = (
			<div className="col-md-7 mx-auto text-center">
				<button className="btn btn-primary" onClick={saveAddresses}>
					Guardar direcciones!
				</button>
			</div>
		);
	}

	function saveAddresses() {
		//TODO Loading
		let data = {
			delivery: {
				address: deliveryAddress,
				city: deliveryCity,
				country: deliveryCountry,
				CP: deliveryCP
			},
			pickup: {
				address: pickupAddress,
				city: pickupCity,
				country: pickupCountry,
				CP: pickupCP
			}
		};
		fetch(BASE_URL + "orders/" + order.id + "/addresses/save", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				if (responseJson.msg !== undefined && responseJson.msg === "Token has expired") {
					history.push("/");
				}
				setOrder(responseJson);
			})
			.catch(error => {
				console.log("Error: " + error);
			})
			.finally(() => {
				//TODO Loading
			});
	}

	function saveVideo() {
		if (video == "") {
			return;
		}
		fetch(BASE_URL + "orders/" + order.id + "/save-video", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			},
			body: JSON.stringify({ video: video })
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				if (responseJson.msg !== undefined && responseJson.msg === "Token has expired") {
					history.push("/");
				}
				setOrder(responseJson);
			})
			.catch(error => {
				console.log("Error: " + error);
			})
			.finally(() => {
				setSavingVideo(false);
			});
		setVideo("");
	}

	let uploadFilesHtml = "";
	let uploadVideosHtml = "";
	if ((isProcessing(order.status.id) || isReady(order.status.id)) && isHelper(role_id)) {
		uploadFilesHtml = (
			<div className="col-md-9">
				<input
					name="document"
					type="file"
					className="form-control file"
					multiple
					onChange={fileSelected}
					id="input-file"
				/>
			</div>
		);
		uploadVideosHtml = (
			<div className="form-group row">
				<label htmlFor="email_address" className="col-md-3 col-form-label text-md-right">
					Upload Video:
				</label>
				<div className="col-md-6">
					<input
						value={video}
						name="url"
						type="text"
						className="form-control"
						onChange={e => setVideo(e.target.value)}
					/>
				</div>
				<div className="col-md-3">
					<button disabled={savingVideo} className="btn btn-secondary" onClick={saveVideo}>
						Save video
					</button>
				</div>
			</div>
		);
	}

	let divHelper = "";
	if (canRoleIDDo(role_id, "orders/changeHelper")) {
		divHelper = (
			<div className="form-group row">
				<label htmlFor="helper" className="col-md-3 col-form-label text-md-right">
					Helper:
				</label>
				<div className="col-md-6">
					<div className="col-md-6">
						<SelectFilledAndSelected data={helpers} idSelected={order.helper.id} onChange={setHelper} />
					</div>
				</div>
			</div>
		);
	}

	let divStatus = "";
	if (canRoleIDDo(role_id, "orders/setStatusManual")) {
		divStatus = (
			<div className="form-group row">
				<label htmlFor="user_rol" className="col-md-4 col-form-label text-md-right">
					Status
				</label>
				<div className="col-md-6">
					<div className="col-md-6">
						<SelectFilledAndSelected data={statuses} idSelected={order.status.id} />
					</div>
				</div>
			</div>
		);
	}

	function deleteDocument(document_id) {
		const orderCloned = { ...order };
		let position = orderCloned.documents.findIndex(document => document.id == document_id);
		orderCloned.documents.splice(position, 1);
		setOrder(orderCloned);
	}

	let liDocumentsHtml = order.documents.map(document => {
		let deleteButtonHtml = "";
		if (document.user_id == actions.getLoggedUser().id) {
			deleteButtonHtml = (
				<DeleteDocumentButton document={document} onDelete={deleteDocument}>
					Delete
				</DeleteDocumentButton>
			);
		}
		return (
			<li key={document.id}>
				<a href={document.url} target="_blank" rel="noopener noreferrer">
					{document.name}
				</a>
				&nbsp; &nbsp; &nbsp;
				{deleteButtonHtml}
			</li>
		);
	});

	// direcciones de entrega y recogida==============================================
	let pickupAddressHtml = "";
	if (isReady(order.status.id) || isCompleted(order.status.id)) {
		pickupAddressHtml = (
			<Fragment>
				<div className="form-group row">
					<label className="col-md-12 col-form-label">Dirección de recogida</label>
					<label htmlFor="pickup-address" className="col-md-3 col-form-label text-md-right">
						Dirección
					</label>
					<div className="col-md-9">
						<input
							defaultValue={order.address_pickup !== undefined ? order.address_pickup.address : ""}
							type="text"
							className="form-control"
							name="pickup-address"
							placeholder="Address"
							onChange={e => setPickupAddress(e.target.value)}
						/>
					</div>
					<label htmlFor="pickup-address" className="col-md-3 col-form-label text-md-right">
						City
					</label>
					<div className="col-md-9">
						<input
							defaultValue={order.address_pickup !== undefined ? order.address_pickup.city : ""}
							type="text"
							className="form-control"
							name="pickup-City"
							placeholder="City"
							onChange={e => setPickupCity(e.target.value)}
						/>
					</div>
					<label htmlFor="pickup-address" className="col-md-3 col-form-label text-md-right">
						Country
					</label>
					<div className="col-md-9">
						<input
							defaultValue={order.address_pickup !== undefined ? order.address_pickup.country : ""}
							type="text"
							className="form-control"
							name="pickup-Country"
							placeholder="Country"
							onChange={e => setPickupCountry(e.target.value)}
						/>
					</div>
					<label htmlFor="pickup-address" className="col-md-3 col-form-label text-md-right">
						CP
					</label>
					<div className="col-md-9">
						<input
							defaultValue={order.address_pickup !== undefined ? order.address_pickup.cp : ""}
							type="text"
							className="form-control"
							name="pickup-CP"
							placeholder="CP"
							onChange={e => setPickupCP(e.target.value)}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-md-12 col-form-label">Dirección de envío</label>
					<label htmlFor="delivery-address" className="col-md-3 col-form-label text-md-right">
						Dirección
					</label>
					<div className="col-md-9">
						<input
							defaultValue={order.address_delivery !== undefined ? order.address_delivery.address : ""}
							type="text"
							className="form-control"
							name="delivery-address"
							placeholder="Address"
							onChange={e => setDeliveryAddress(e.target.value)}
						/>
					</div>
					<label htmlFor="delivery-City" className="col-md-3 col-form-label text-md-right">
						City
					</label>
					<div className="col-md-9">
						<input
							defaultValue={order.address_delivery !== undefined ? order.address_delivery.city : ""}
							type="text"
							className="form-control"
							name="delivery-City"
							placeholder="City"
							onChange={e => setDeliveryCity(e.target.value)}
						/>
					</div>
					<label htmlFor="delivery-Country" className="col-md-3 col-form-label text-md-right">
						Country
					</label>
					<div className="col-md-9">
						<input
							defaultValue={order.address_delivery !== undefined ? order.address_delivery.country : ""}
							type="text"
							className="form-control"
							name="delivery-Country"
							placeholder="Country"
							onChange={e => setDeliveryCountry(e.target.value)}
						/>
					</div>
					<label htmlFor="delivery-CP" className="col-md-3 col-form-label text-md-right">
						CP
					</label>
					<div className="col-md-9">
						<input
							defaultValue={order.address_delivery !== undefined ? order.address_delivery.cp : ""}
							type="text"
							className="form-control"
							name="delivery-CP"
							placeholder="CP"
							onChange={e => setDeliveryCP(e.target.value)}
						/>
					</div>
				</div>
			</Fragment>
		);
	}

	return (
		<div className="container">
			<h2> Edit Order</h2>
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-body">
							<div className="form-group row">
								<label htmlFor="description" className="col-md-3 col-form-label text-md-right">
									Description :
								</label>
								<div className="col-md-9">
									<input
										type="text"
										id="description"
										className="form-control"
										name="description"
										defaultValue={order.description}
									/>
								</div>
							</div>

							{divHelper}

							{divStatus}

							{uploadVideosHtml}

							<div className="form-group row">
								<label htmlFor="email_address" className="col-md-3 col-form-label text-md-right">
									Documents:
								</label>
								{uploadFilesHtml}

								<div className="col-md-8">
									<ul>{liDocumentsHtml}</ul>
								</div>
							</div>

							{pickupAddressHtml}

							{divSaveButtons}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
