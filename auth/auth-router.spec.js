const server = require('../api/server');
const request = require('supertest');

const Users = require('../users/users-model');
const db = require('../database/dbConfig');


describe('server.js', function() {
    describe('environment', function(){
        it('should set environment to testing', function(){
            expect(process.env.DB_ENV).toBe("testing")
        })
    });

  describe('users-model', () => {
        beforeEach(async () => {
            await db('users').truncate();
        })
    
    describe('POST /register', function(){
        it('should return a 201 OK', function(){
            request(server) 
            .post('/register')
            .send('username=NewUser')
            .set('Accept', 'application/json')
            .expect(201, {
                username: 'NewUser'})
        })
        it('responds with a 401', () => {
            request(server)
              .post('/login')
              .auth('NewUser', 'pass')
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(401)
          })
    });
    describe('insert', () => {
        it('should insert user into db', async () => {
          // insert the record
          await Users.add({
            username: 'chris',
            password: 'password'
          });
          const users = await db('users');

            // assert the record was inserted
        expect(users).toHaveLength(1);
    });

    it('should insert user into db', async () => {
        // insert the record
        const {id} =  await Users.add({
          username: 'chris',
          password: 'password'
        })
  
        let user = await db('users')
          .where({ id })
          .first();
  
        // assert the record was inserted
        expect(user.username).toBe('chris')
    });
  });
 });
});