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
});