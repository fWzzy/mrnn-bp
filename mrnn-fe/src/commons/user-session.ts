class UserSession {
  static setToken(token: string | null): void {
    if (token) {
      window.localStorage.setItem('token', token)
    } else {
      window.localStorage.removeItem('token')
    }
  }

  static getToken(): string | null {
    return window.localStorage.getItem('token')
  }
}

export default UserSession