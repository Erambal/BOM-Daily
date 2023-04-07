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

app.get('/user-favorites/642ba1874f0a09b2a6206f42', (req, res) => {
    res.status(200).json({ 
        user_id: '6419f6c8b61b42ba4e0d9177',
        scripture_id: '641d274f588a75afa7694a6a'
    });
});

app.get('/user-favorites', (req, res) => {
    res.status(200).json( [
        {
          "_id": "642ba1874f0a09b2a6206f42",
          "user_id": "6419f6c8b61b42ba4e0d9177",
          "scripture_id": "641d274f588a75afa7694a6a"
        },
        {
          "_id": "642f89f168ac41bc95e2e057",
          "user_id": "642ee6ac484ed2d1216d5819",
          "scripture_id": "641d26a6588a75afa7694a21"
        }
      ]);
});

app.post('/user-favorites', (req, res) => {
    res.status(200).json(
        {
            "acknowledged": true,
            "insertedId": "642f89f168ac41bc95e2e057"
          }
    )
});

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe('Routes', function () {

    test('/user-favorites', async () => {
        const res = await request(app).get('/user-favorites');
        expect(res.body).toEqual([
            {
              "_id": "642ba1874f0a09b2a6206f42",
              "user_id": "6419f6c8b61b42ba4e0d9177",
              "scripture_id": "641d274f588a75afa7694a6a"
            },
            {
              "_id": "642f89f168ac41bc95e2e057",
              "user_id": "642ee6ac484ed2d1216d5819",
              "scripture_id": "641d26a6588a75afa7694a21"
            }
          ]
        );
    });

    test('/user/{userId}', async () => {
        const res = await request(app).get(`/user-favorites/642ba1874f0a09b2a6206f42`);
        expect(res.body).toEqual({
            "_id": "642ba1874f0a09b2a6206f42",
            "user_id": "6419f6c8b61b42ba4e0d9177",
            "scripture_id": "641d274f588a75afa7694a6a"
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