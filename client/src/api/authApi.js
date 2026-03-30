import { apiRequest } from './apiClient.js'

export const registerRequest = (payload) => {
  return apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export const loginRequest = (payload) => {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export const getCurrentUserRequest = () => {
  return apiRequest('/api/auth/me')
}
