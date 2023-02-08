
const HR_TOKEN = 'token'

export function setToken(v) {
    localStorage.setItem(HR_TOKEN, v)
}

export function getToken() {
    return localStorage.getItem(HR_TOKEN)
}

export function removeToken() {
    localStorage.removeItem(HR_TOKEN)
}