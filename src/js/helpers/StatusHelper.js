export function isPending(status_id) {
	return status_id === 1;
}

export function isRejected(status_id) {
	return status_id === 2;
}

export function isProcessing(status_id) {
	return status_id === 3;
}

export function isReady(status_id) {
	return status_id === 4;
}

export function isCompleted(status_id) {
	return status_id === 5;
}
