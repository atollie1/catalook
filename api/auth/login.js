import crypto from 'crypto'

export default function handler (req, res) {
  const { email, password } = req.body
  const knownUser = {
    email: 'admin@mail.com',
    password: 'itsSoSecret'
  }

  const correctEmail = email === knownUser.email
  const correctPassword = password === knownUser.password

  if (correctEmail && correctPassword) {
    return res.status(200).json({
      success: true,
      data: {
        token: crypto.randomBytes(32).toString('hex'),
        user: knownUser
      }
    })
  } else {
    let errors = {}

    if (!correctEmail) {
      errors = {
        ...errors,
        email: 'Invalid email'
      }
    }

    if (!correctPassword) {
      errors = {
        ...errors,
        password: 'Invalid password'
      }
    }

    res.status(422).json({
      success: false,
      errors
    })
  }
}
