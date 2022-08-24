import Cookies from 'js-cookie'

export const redirectIfUnauthenticated = (context) => {
  const hasAuthToken = Cookies.get('auth_token')
  if (!hasAuthToken) {
    context.$router.push('/auth/login')
  }
}

export const redirectIfAuthenticated = (context) => {
  const hasAuthToken = Cookies.get('auth_token')
  if (hasAuthToken) {
    context.$router.push('/')
  }
}

export const saveAuthToken = (token) => {
  Cookies.set('auth_token', token)
}

export const removeAuthToken = () => {
  Cookies.remove('auth_token')
}
