const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        title: req.body.title,
        body: req.body.body,
        createdAt: new Date()
    })
    res.status(201).send()
})


async function loadPostsCollection () {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://admin123:admin123@cluster0-ot7wu.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });
    
    return client.db('intership').collection('posts');
}

module.exports = router;