const localStorage = window.localStorage
const USER_KEY = 'user_info'

export function setUser(value) {
	localStorage.setItem(USER_KEY,value)
}

export function getUser() {
	return JSON.parse(localStorage.getItem(USER_KEY))
}

export function removeUser() {
	localStorage.removeItem(USER_KEY);
}