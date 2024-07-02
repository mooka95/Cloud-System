const request = require('supertest');
const app = require('../index');
const User = require('../Models/User')
let server;


describe("POST /login", () => {
  describe("given a Email and password", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/login").send({
        email: "moham.ed.22@gmail.com",
        password: "Password1234*"
      })
      expect(response.statusCode).toBe(200)
    })
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/login").send({
        email: "moham.ed.22@gmail.com",
        password: "Password1234*"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("response has token", async () => {
      const response = await request(app).post("/login").send({
        email: "moham.ed.22@gmail.com",
        password: "Password1234*"
      })
      expect(response.body.token).toBeDefined()
    })
  })

  describe("when the email and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {email: "moham.ed.22@gmail.com"},
        {password: "Password1234*"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/login").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })

})

describe("POST /user", () => {
  describe("given a Unique Email , password,firstName,lastName,street,city AND country", () => {
    test("should respond with a status code of 201", async () => {
      const response = await request(app).post("/user").send({
        email: "a.shr.afs.22@gmail.com",
        password: "Password1234*",
        firstName:"Luca",
        lastName:"Modric",
        street:"zafraan",
        city:"alex",
        country:"Egyptss"
      })
      expect(response.statusCode).toBe(201)

    })


  })
  describe("given Email exists in database ", () => {
    test("should respond with a status code of 409", async () => {
      const response = await request(app).post("/user").send({
        email: "akram.22@gmail.com",
        password: "Password1234*",
        firstName:"Luca",
        lastName:"Modric",
        street:"zafraan",
        city:"alex",
        country:"Egyptss"
      })
      expect(response.statusCode).toBe(409)

    })


  })

  describe("when the email , password ,firstName,lastName,Address is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {
          password: "Password1234*",
          firstName:"Luca",
          lastName:"Modric",
          street:"zafraan",
          city:"alex",
          country:"Egyptss"
        },
        {
          email: "moham.ed.22@gmail.com",
          firstName:"Luca",
          lastName:"Modric",
          street:"zafraan",
          city:"alex",
          country:"Egyptss"
        },
        {
          email: "moham.ed.22@gmail.com",
          password: "Password1234*",
          lastName:"Modric",
          street:"zafraan",
          city:"alex",
          country:"Egyptss"
        },
        {
          email: "moham.ed.22@gmail.com",
          password: "Password1234*",
          firstName:"Luca",
          street:"zafraan",
          city:"alex",
          country:"Egyptss"
        },
        {
          email: "moham.ed.22@gmail.com",
          password: "Password1234*",
          firstName:"Luca",
          lastName:"Modric",
          city:"alex",
          country:"Egyptss"
        },

        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/user").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })


})

test('CheckPasswordHash function should verify password correctly', async () => {
  const password = 'mySuperSecretPassword';
  const wrongPassword = 'wrongpassword';
  let hashedPassword;
  const user = new User(null,'mohamed.osa.22@gmai.com',password)

  try {
     await user.hashPassword();
    console.log(hashedPassword)
  } catch (err) {
    throw new Error(`Expected no error, got ${err}`);
  }

  let match;

  try {
    match = await user.checkPasswordHash(password, user.password);
    console.log(match)
  } catch (err) {
    throw new Error(`Expected no error, got ${err}`);
  }

  expect(match).toBe(true);

  try {
    match = await user.checkPasswordHash(wrongPassword, hashedPassword);
  } catch (err) {
    throw new Error(`Expected no error, got ${err}`);
  }

  expect(match).toBe(false);
});
