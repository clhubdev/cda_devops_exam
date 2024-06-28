const { User } = require('../db/sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key')

module.exports = (app) => {
  app.post('/api/login', (req, res) => {

    User.findOne({ where: { username: req.body.username } }).then(user => {

      if (!user) {
        const message = `L'utilisateur demandé n'existe pas.`
        return res.status(404).json({ message })
      }

      return bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if (!isPasswordValid) {
          const message = `Le mot de passe est incorrect.`
          return res.status(401).json({ message })
        }

        // Générer un jeton JWT valide pendant 24 heures.
        const token = jwt.sign(
          { userId: user.id },
          privateKey,
          { expiresIn: '24h' }
        );

        // Configurer les options de cookie
        const options = {
          httpOnly: false, // le cookie n'est accessible que par le serveur
          secure: false, // le cookie n'est envoyé que via HTTPS
          maxAge: 24 * 60 * 60 * 1000 // durée de vie du cookie (24 heures)
        };

        // Envoyer le cookie
        res.cookie('jwt', token, options);

        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user })
      })
    })
    .catch(error => {
      const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}
