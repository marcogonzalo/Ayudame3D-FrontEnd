export default function canRoleIDDo(role_id, topic) {
	switch (topic) {
		case "orders/delete":
		case "users/create":
		case "orders/setStatusManual":
			if (isAdmin(role_id)) {
				return true;
			}
			break;
		case "orders/create":
		case "users/index":
		case "orders/changeHelper":
			if (isAdmin(role_id) || isManager(role_id)) {
				return true;
			}
			break;
		case "orders/index":
			if (isAdmin(role_id) || isManager(role_id) || isHelper(role_id)) {
				return true;
			}
			break;
	}
	return false;
}

export function isAdmin(role_id) {
	return role_id === 1;
}

export function isManager(role_id) {
	return role_id === 2;
}

export function isHelper(role_id) {
	return role_id === 3;
}
