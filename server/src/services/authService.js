import bcrypt from 'bcrypt'
import prisma from '../db/prisma.js'
import AppError from '../utils/AppError.js'
import { generateAuthToken } from '../utils/jwt.js'

const SALT_ROUNDS = 10

const normalizeEmail = (email) => email.trim().toLowerCase()

const mapUser = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  createdAt: user.createdAt,
})

export const registerUser = async ({ email, password, name }) => {
  const normalizedEmail = normalizeEmail(email)

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  })

  if (existingUser) {
    throw new AppError('An account with this email already exists.', 409)
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      password: hashedPassword,
      name: name.trim(),
    },
  })

  return mapUser(user)
}

export const loginUser = async ({ email, password }) => {
  const normalizedEmail = normalizeEmail(email)

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  })

  if (!user) {
    throw new AppError('Invalid email or password.', 401)
  }

  const passwordMatches = await bcrypt.compare(password, user.password)

  if (!passwordMatches) {
    throw new AppError('Invalid email or password.', 401)
  }

  return {
    user: mapUser(user),
    token: generateAuthToken(user.id),
  }
}

export const getAuthUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new AppError('Authentication required.', 401)
  }

  return mapUser(user)
}
