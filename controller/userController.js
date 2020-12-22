const express = require('express');
const userModel = require('../model/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/users', async(req, res) => {
            let token = req.headers['x-access-token'];
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


                const users = await userModel.find({});
                try {
                    res.send(users);
                } catch (err) {
                    res.status(500).send(err);
                }
            });

            app.post('/user', async(req, res) => {
                const user = new userModel(req.body);
                user.password = bcrypt.hashSync(req.body.password, 8);
                try {
                    await user.save();
                    let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: '1h' });
                    res.status(200, 'User created sucessfully').send({ auth: true, token: token });
                } catch (err) {
                    res.status(500).send(err);
                }
            });

            app.put('/user/:id', async(req, res) => {
                try {
                    const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
                    user.password = bcrypt.hashSync(req.body.password, 8);
                    await user.save()
                    res.send(user)
                } catch (err) {
                    res.status(500).send(err)
                }
            });

            app.delete('/user/:id', async(req, res) => {
                try {
                    const user = await userModel.findByIdAndDelete(req.params.id)

                    if (!user) res.status(404).send("No item found")
                    res.status(200).send()
                } catch (err) {
                    res.status(500).send(err)
                }
            });

            module.exports = app;