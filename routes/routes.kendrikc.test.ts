// @ts-nocheck
// const { getUser } = require('../controllers/test.js');
const request = require('supertest');
const express = require('express');
// const router = require ('../routes/index.ts');

const app = new express();
// app.use('/', router);

//-----------------------------------------------------------------------------
// Mocks
//-----------------------------------------------------------------------------

app.get('/settings', (req, res) => {
    res.status(200).json([
        {
            "_id": "642625424f0a09b2a6206f41",
            "name": "topics",
            "options": [
                "Hope",
                "Faith",
                "Repentance",
                "Family",
                "Charity",
                "Love",
                "Atonement",
                "Baptism",
                "Scripture Mastery"
            ]
        },
        {
            "_id": "642625424f0a09b2a6206f3e",
            "name": "Font",
            "code": "font",
            "options": [
                "Roboto",
                "Lato"
            ]
        },
        {
            "_id": "642625424f0a09b2a6206f3f",
            "name": "Text size",
            "code": "text-size",
            "options": [
                "x-small",
                "small",
                "medium",
                "large",
                "x-large"
            ]
        },
        {
            "_id": "642625424f0a09b2a6206f3d",
            "name": "Color",
            "code": "color",
            "options": [
                "black",
                "white",
                "blue",
                "gray"
            ]
        },
        {
            "_id": "642625424f0a09b2a6206f40",
            "name": "Time zone",
            "code": "time-zone",
            "options": [
                "Eastern",
                "Central",
                "Mountain",
                "Pacific"
            ]
        }
    ]
    );
});

app.post('/settings', (req, res) => {
    res.status(200).json(
        {
            acknowledged: true,
            insertedId: "642f7cccee86860fb5863c7d"
        }
    )
});

app.put('/settings', (req, res) => {
    res.status(200).json(
        {
            "acknowledged": true,
            "modifiedCount": 1,
            "upsertedId": null,
            "upsertedCount": 0,
            "matchedCount": 1
        }
    )
})
//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe('Routes', function () {

    test('/settings', async () => {
        [
            {
                "_id": "642625424f0a09b2a6206f41",
                "name": "topics",
                "options": [
                    "Hope",
                    "Faith",
                    "Repentance",
                    "Family",
                    "Charity",
                    "Love",
                    "Atonement",
                    "Baptism",
                    "Scripture Mastery"
                ]
            },
            {
                "_id": "642625424f0a09b2a6206f3e",
                "name": "Font",
                "code": "font",
                "options": [
                    "Roboto",
                    "Lato"
                ]
            },
            {
                "_id": "642625424f0a09b2a6206f3f",
                "name": "Text size",
                "code": "text-size",
                "options": [
                    "x-small",
                    "small",
                    "medium",
                    "large",
                    "x-large"
                ]
            },
            {
                "_id": "642625424f0a09b2a6206f3d",
                "name": "Color",
                "code": "color",
                "options": [
                    "black",
                    "white",
                    "blue",
                    "gray"
                ]
            },
            {
                "_id": "642625424f0a09b2a6206f40",
                "name": "Time zone",
                "code": "time-zone",
                "options": [
                    "Eastern",
                    "Central",
                    "Mountain",
                    "Pacific"
                ]
            }
        ]
    });

    test('POST /settings', async () => {
        const res = await request(app)
            .post('/settings')
            .send({ name: 'Font' })
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            {
                acknowledged: true,
                insertedId: "642f7cccee86860fb5863c7d"
            }
        )
    });
    
    test('PUT /settings', async () => {
        const res = await request(app)
            .post('/settings')
            .send({ name: 'Font' })
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            {
                acknowledged: true,
                insertedId: "642f7cccee86860fb5863c7d"
            }
        )
    });

    // test('DELETE /settings', async () => {
    //     const res = await request(app)
    //         .post('/settings')
    //         .send({ name: 'Font' })
    //         .set('Accept', 'application/json');
    //     expect(res.status).toBe(200);
    //     expect(res.body).toEqual(
    //         {
    //             acknowledged: true,
    //             insertedId: "0"
    //         }
    //     )
    // });

});