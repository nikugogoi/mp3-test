const _ = require('lodash')
const { Router } = require('express')
const { authenticate } = require('./middleware/authenticate')
const bodyParser = require('body-parser')
const router = Router()
const { Song } = require('./models/song')
const { User } = require('./models/user')

// Add restaurants Routes
router.use(bodyParser.json())

router.get('/songs', (req, res) => {
    const limit = req.query.limit || 20
    let offset = 0
    
    if(req.query.q){
        const search = `%${req.query.q}%`
        // perform text search
    }

    Song.find()
        .skip(offset)
        .limit(limit)
        .then((songs) => {
            res.send({
                songs
            })
        })
        .catch(err=>res.status(400).send(err))
})

router.get('/songs/:id', (req, res) => {
    const id = req.params.id
    Song.findById(id).then(song => {
        if(song){
            res.status(200).json({result: song})
        } else {
            res.status(400).send()
        }
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

router.post('/users/login', (req, res)=>{
    var body = _.pick(req.body, ['email', 'password'])
    User.findByCredentials(body.email, body.password).then(user => {
        user.generateAuthToken().then(token => {
            req.session.token = token
            res.header('x-auth', token).send(user)
        })
    }).catch(e => {
        console.log(e)

        var user = new User(body)

        user.save().then(() => {
            return user.generateAuthToken()
        }).then((token) => {
            req.session.token = token
            res.header('x-auth', token).send(user)
        }).catch(err => {
            res.status(400).send(err)
        })
    })
})

router.post('/users/logout', authenticate, (req, res)=>{
    req.user.removeToken(req.token).then(() => {
        delete req.session.token
        res.status(200).send()
    }).catch(e => {
        res.status(400).send(e)
    })
})

router.get('/users/me', authenticate, (req, res) => {
    const user = req.user
    res.status(200).json(user)
})

router.get('/users/playlists', authenticate, (req, res) => {
    const user = req.user
    res.status(200).json({ playlists: user.playlists})
})

router.post('/users/playlists', authenticate, (req, res) => {
    const user = req.user
    var body = _.pick(req.body, ['name'])
    user.updateOne({
        $push : { 
            playlists : {
                name : body.name,
                songs : []
            }
        }
    }).then(result => {
        res.status(200).json({ result })
    })
})

module.exports = router