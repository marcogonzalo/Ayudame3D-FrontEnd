export function isPending(status_id) {
	return status_id === 1;
}

export function isProcessing(status_id) {
	return status_id === 3;
}

export function isReady(status_id) {
	return status_id === 4;
}
