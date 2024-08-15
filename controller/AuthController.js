const User = require('../model/User')

module.exports = {
  signup: async (req, res) => {
    try {
      let check = await User.findOne({ email: req.body.email })
      if (check) {
        return res.status(400).json({ success: false, error: 'exist user found with same email address' })
      }

      // Create new user
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || 'Admin'
      })

      await user.save()

      res.json({ success: true, user })
    } catch (error) {
      console.error('Signup error:', error)
      res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
  },
  login: async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        const isPassCompare = req.body.password === user.password
        if (isPassCompare) {
          res.json({ success: true, user})
        } else {
          res.json({ success: false, error: 'Wrong password' })
        }
      } else {
        res.json({ success: false, error: 'Email is not registered' })
      }
    } catch (error) {}
  },
}