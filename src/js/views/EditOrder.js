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

	const [files, setFiles] = useState("");
	const [video, setVideo] = useState([]);
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
		setVideo(input.files);
	}

	function saveFiles() {
		if (files == "") {
			return;
		}
		fetch(BASE_URL + "orders/" + order.id + "/save-files", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("accessToken")
			},
			body: JSON.stringify({ files: files })
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
				setSavingVideo(false); // Cambiar
			});
		setFiles("");
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
	} else if (isReady(order.status.id) && !isHelper(role_id)) {
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
				setLoading(false);
				history.push("/orders");
			});
	}

	function saveVideo() {
		const formData = new FormData();
		for (var i = 0; i < video.length; i++) {
			formData.append("video" + i, video[i]);
		}
		fetch(BASE_URL + "orders/" + order.id + "/save-video", {
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

	let uploadFilesHtml = "";
	let uploadVideosHtml = "";
	if ((isProcessing(order.status.id) || isReady(order.status.id)) && isHelper(role_id)) {
		uploadFilesHtml = (
			<>
				<div className="col-md-6">
					<input
						value={files}
						name="url"
						type="text"
						className="form-control"
						onChange={e => setFiles(e.target.value)}
					/>
				</div>
				<div className="col-md-3">
					<button className="btn btn-secondary save-btn" onClick={saveFiles}>
						Save URL
					</button>
				</div>
			</>
		);
		uploadVideosHtml = (
			<div className="form-group row">
				<label htmlFor="email_address" className="col-md-3 col-form-label text-md-right">
					Upload Video:
				</label>
				<div className="col-md-6">
					<input
						name="video"
						type="file"
						className="form-control file"
						multiple
						onChange={fileSelected}
						id="input-file"
					/>
				</div>
				<div className="col-md-3">
					<button disabled={savingVideo} className="btn btn-secondary save-btn" onClick={saveVideo}>
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
					<SelectFilledAndSelected data={helpers} idSelected={order.helper.id} onChange={setHelper} />
				</div>
			</div>
		);
	}

	let divStatus = "";
	if (canRoleIDDo(role_id, "orders/setStatusManual")) {
		divStatus = (
			<div className="form-group row">
				<label htmlFor="user_rol" className="col-md-3 col-form-label text-md-right">
					Status:
				</label>
				<div className="col-md-6">
					<SelectFilledAndSelected data={statuses} idSelected={order.status.id} />
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
		let visibility = "";

		document.user_id == actions.getLoggedUser().id ? (visibility = "visible") : (visibility = "invisible");

		return (
			<span key={document.id} className="mb-1">
				<DeleteDocumentButton visibility={visibility} document={document} onDelete={deleteDocument}>
					<i className="fas fa-minus-square fa-2x text-danger" />
				</DeleteDocumentButton>
				<a href={document.url} className="ml-2" target="_blank" rel="noopener noreferrer">
					{document.name}
				</a>
			</span>
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
	let descriptionClass = "";
	isHelper(role_id) ? (descriptionClass = "form-control-plaintext") : (descriptionClass = "form-control");
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
										className={descriptionClass}
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
									Documents URL:
								</label>
								{uploadFilesHtml}
							</div>
							<div className="form-group row">
								<label htmlFor="email_address" className="col-md-3 col-form-label text-md-right">
									Existing Files:
								</label>
								<div className="col-md-6 d-flex flex-column">{liDocumentsHtml}</div>
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
