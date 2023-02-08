
const ElToken = "token"

export function getToken() {
    return localStorage.getItem(ElToken)
}
export function setToken(data) {
    return localStorage.setItem(ElToken, data)
}
export function rmoveToken() {
    return localStorage.removeItem(ElToken)
}