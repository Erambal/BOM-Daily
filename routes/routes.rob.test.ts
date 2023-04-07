// @ts-nocheck
// const { getUser } = require('../controllers/test.js');
const request = require ('supertest');
const express = require ('express');
// const router = require ('../routes/index.ts');

const app = new express();
// app.use('/', router);

//-----------------------------------------------------------------------------
// Mocks
//-----------------------------------------------------------------------------

app.get('/user/642ee6ac484ed2d1216d5818', (req, res) => {
    res.status(200).json({ 
        username: 'johndoughnut',
        fname: 'John',
        lname: 'Doe',
        street: '1234 Elm Street',
        city: 'New York',
        state: 'NY',
        zipcode: '10001'
    });
});

app.get('/user', (req, res) => {
    res.status(200).json([
        { 
            username: 'johndoughnut',
            fname: 'John',
            lname: 'Doe',
            street: '1234 Elm Street',
            city: 'New York',
            state: 'NY',
            zipcode: '10001'
        },
        {
            username: 'alicewonderland',
            fname: 'Alice',
            lname: 'Johnson',
            street: '5678 Oak Avenue',
            city: 'Los Angeles',
            state: 'CA',
            zipcode: '90001'
        }]
    );
});

app.post('/user', (req, res) => {
    res.status(200).json(
        {
            acknowledged: true,
            insertedId: "642f7cccee86860fb5863c7d"
        }
    )
});

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe('Routes', function () {

    test('/user', async () => {
        const res = await request(app).get('/user');
        expect(res.body).toEqual([
            { 
                username: 'johndoughnut',
                fname: 'John',
                lname: 'Doe',
                street: '1234 Elm Street',
                city: 'New York',
                state: 'NY',
                zipcode: '10001'
            },
            {
                username: 'alicewonderland',
                fname: 'Alice',
                lname: 'Johnson',
                street: '5678 Oak Avenue',
                city: 'Los Angeles',
                state: 'CA',
                zipcode: '90001'
            }]
        );
    });

    test('/user/{userId}', async () => {
        const res = await request(app).get(`/user/642ee6ac484ed2d1216d5818`);
        expect(res.body).toEqual({ 
            username: 'johndoughnut',
            fname: 'John',
            lname: 'Doe',
            street: '1234 Elm Street',
            city: 'New York',
            state: 'NY',
            zipcode: '10001'
        });
    });

    // test('POST /users', async () => {
    //       const res = await request(app).post('/users');
    //     //   send({name: 'john'});
    //     //   set('Accept', 'application/json');
    //       expect(res.status).toBe(200));
    //       expect(res.body).toEqual(
    //         {
    //           acknowledged: true,
    //           insertedId: "642f7cccee86860fb5863c7d"
    //         }
    //       )
    // });
});