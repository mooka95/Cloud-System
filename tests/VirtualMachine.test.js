const request = require('supertest');
const app = require('../index');
let server;


describe("GET /virtualmachines", () => {
    describe("Send Request With actual access token", () => {
  
      test("should respond with a 200 status", async () => {
        const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0OH0sInN1YiI6NDgsImlhdCI6MTcxOTE5ODA2MywiZXhwIjoxNzE5MjA1MjYzfQ.vekZ6-AbDZqCrwnJXukwMs2Ghsdyq-BCuv5e9jO5Zwo'
        const response = await request(app).get("/virtualmachines").set('Authorization', token);
        expect(response.statusCode).toBe(200)    
      })

    })
  
  })