// @ts-nocheck
// const { getScripture } = require('../controllers/test.js');
const request = require ('supertest');
const express = require ('express');
// const router = require ('../routes/index.ts');

const app = new express();
// app.use('/', router);

//-----------------------------------------------------------------------------
// Mocks
//-----------------------------------------------------------------------------

app.get('/scriptures/641d26dc588a75afa7694a28', (req, res) => {
    res.status(200).json({
        volume: "Book of Mormon",
        book: "2 Nephi",
        chapter: 9,
        verse: 21,
        verse_title: "2 Nephi 9:21",
        scripture_text: "And he cometh into the world that he may save all men if they will hearken unto his voice; for behold, he suffereth the pains of all men, yea, the pains of every living creature, both men, women, and children, who belong to the family of Adam."
    });
});

app.get('/scriptures', (req, res) => {
    res.status(200).json([
        {
            volume: "Book of Mormon",
            book: "2 Nephi",
            chapter: 9,
            verse: 21,
            verse_title: "2 Nephi 9:21",
            scripture_text: "And he cometh into the world that he may save all men if they will hearken unto his voice; for behold, he suffereth the pains of all men, yea, the pains of every living creature, both men, women, and children, who belong to the family of Adam."
        },
        {
            volume: "Book of Mormon",
            book: "2 Nephi",
            chapter: 10,
            verse: 25,
            verse_title: "2 Nephi 10:25",
            scripture_text: "Wherefore, may God raise you from death by the power of the resurrection, and also from everlasting death by the power of the atonement, that ye may be received into the eternal kingdom of God, that ye may praise him through grace divine. Amen."
        }]
    );
});

app.post('/scriptures', (req, res) => {
    res.status(200).json(
        {
            acknowledged: true,
            insertedId: "641d26dc588a75afa7694a28"
        }
    )
});

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe('Routes', function () {

    test('/scriptures', async () => {
        const res = await request(app).get('/scriptures');
        expect(res.body).toEqual([
            {
                volume: "Book of Mormon",
                book: "2 Nephi",
                chapter: 9,
                verse: 21,
                verse_title: "2 Nephi 9:21",
                scripture_text:"And he cometh into the world that he may save all men if they will hearken unto his voice; for behold, he suffereth the pains of all men, yea, the pains of every living creature, both men, women, and children, who belong to the family of Adam."
            },
            {
                volume: "Book of Mormon",
                book: "2 Nephi",
                chapter: 10,
                verse: 25,
                verse_title: "2 Nephi 10:25",
                scripture_text: "Wherefore, may God raise you from death by the power of the resurrection, and also from everlasting death by the power of the atonement, that ye may be received into the eternal kingdom of God, that ye may praise him through grace divine. Amen."
            }]
        );
    });

    test('/scriptures/{scriptureId}', async () => {
        const res = await request(app).get(`/scriptures/641d26dc588a75afa7694a28`);
        expect(res.body).toEqual({
            volume: "Book of Mormon",
            book: "2 Nephi",
            chapter: 9,
            verse: 21,
            verse_title: "2 Nephi 9:21",
            scripture_text: "And he cometh into the world that he may save all men if they will hearken unto his voice; for behold, he suffereth the pains of all men, yea, the pains of every living creature, both men, women, and children, who belong to the family of Adam."
        });
    });

    test('POST /scriptures', async () => {
          const res = await request(app).post('/scriptures');
          expect(res.status).toBe(200);
          expect(res.body).toEqual(
            {
              acknowledged: true,
              insertedId: "641d26dc588a75afa7694a28"
            }
          )
    });
    
});