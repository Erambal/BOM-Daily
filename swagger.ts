const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Book of Mormon Daily Scripture API',
    description: 'Provides endpoints for retrieving daily scriptures for \
                  users based on user preferences. Also provides admin \
                  functionality for managing users and settings.',
  },
  host: 'bom-daily-1alq.onrender.com',
  schemes: ['https'],
  basepath: "/",
  consumes: ['application/json'],
  produces: ['application/json'],
  // tags: [
  //   {
  //     'name': 'Users',
  //     // 'description': 'Endpoints'
  //   }
  // ],
  definitions: {
    user: {
      admin: 'false',
      firstName: 'John',
      lastName: 'Doe',
      userName: 'john.doe@email.com',
      password: 'mypassword',
      profileImage: 'https://picsum.photos/200',
      favorites: [
        {
          reference: '1 Nephi 1:1',
          text: 'I, Nephi, ...',
          link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/1?lang=eng',
          image: 'https://www.churchofjesuschrist.org/search?lang=eng&type=image&query=nephi',
          topic: ['Parents']
        }
      ],
      settings: {
        font: 'Roboto',
        color: '#2196F3',
        topic: ['Parents', 'Prayer']
      }
    },
    scripture: {
      volume: 'Book of Mormon',
      book: '1 Nephi',
      chapter: 1,
      verse: 1,
      verse_title: '1 Nephi 1:1',
      scripture_text: 'I, Nephi, having been born of goodly parents...',
      link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/1?lang=eng',
      image: 'https://www.churchofjesuschrist.org/search?lang=eng&type=image&query=nephi',
      topic: ['Faith']
    },
    settings: {
      name: 'Color',
      code: 'color',
      options: ['#2196F3', '#ffffff']
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);