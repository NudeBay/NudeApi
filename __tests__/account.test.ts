import supertest from 'supertest';
import app from '../app';
// import { MongoMemoryServer } from 'mongodb-memory-server'; 
// import mongoose from 'mongoose';

describe('account', () => {
    // beforeAll(async () => {
    //     const mongoServer=new MongoMemoryServer();
    //     const mongoUri=await mongoose.connect(await mongoServer.getUri());
    // });

    // afterAll(async () => {
    //     await mongoose.disconnect();
    //     await mongoose.connection.close();
    // });

    let token: string;
    const user={
        'nickname': 'test',
        'email': 'test@test.com',
        'password': 'Test.123@',
        'device': 'testDevice'
    };

    describe('register', () => {
        describe('given the user does not exist', () => {
            it('return 201', async () => {
                const response=await supertest(app).post('/account/register').send(user).expect(201);
                token=response.body.data.token;
            });
        });

        describe('given the user exists', () => {
            it('return 400', async () => {
                await supertest(app).post('/account/register').send(user).expect(400);
            });
        });

        describe('given wrong user data', () => {
            it('return 400', async () => {
                const wrongUser={
                    'nickname': '.',
                    'email': '',
                    'password': '',
                    'device': '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890', // 100 characters
                };

                await supertest(app).post('/account/register').send(wrongUser).expect(400);
            });
        });

        describe('given no user data', () => {
            it('return 400', async () => {
                const wrongUser={
                    'nickname': undefined,
                    'password': user.password,
                    'device': user.device,
                    'email': "' or 1=1; --"
                };

                await supertest(app).post('/account/register').send(wrongUser).expect(400);
            });
        });

        describe('given ddos attack', async () => {
            it('return 429', async () => {
                const numberOfRequests=100;
                const requests=Array(numberOfRequests).fill(0).map(() => supertest(app).post('/account/register').send(user).expect(429));
                await Promise.all(requests);

                // numberOfRequests + 1 (remember to restart the server before running this test again)
                await supertest(app).post('/account/register').send(user).expect(429);
            });
        });
    });

    describe('login', () => {
        describe('given the user exists', () => {
            it('return 200', async () => {
                // ...
            });
        });

        describe('given the user does not exist', () => {
            it('return 404', async () => {
                // ...
            });
        });

        describe('given wrong user data', () => {
            it('return 400', async () => {
                // ...
            });
        });

        describe('given no user data', () => {
            it('return 400', async () => {
                // ...
            });
        });

        describe('given ddos attack', async () => {
            it('return 429', async () => {
                // ...
            });
        });
    });

    describe('logout', () => {
        describe('given the user is logged in', () => {
            it('return 200', async () => {
                // ...
            });
        });

        describe('given the user is not logged in', () => {
            it('return 401', async () => {
                // ...
            });
        });

        describe('given wrong user data', () => {
            it('return 400', async () => {
                // ...
            });
        });

        describe('given ddos attack', async () => {
            it('return 429', async () => {
                // ...
            });
        });
    });

    describe('delete', () => {
        describe('given the user is logged in', () => {
            it('return 200', async () => {
                // ...
            });
        });

        describe('given the user is not logged in', () => {
            it('return 401', async () => {
                // ...
            });
        });

        describe('given wrong user data', () => {
            it('return 400', async () => {
                // ...
            });
        });

        describe('given ddos attack', async () => {
            it('return 429', async () => {
                // ...
            });
        });
    });

    describe('forgot password', () => {
        describe('given the email exists', () => {
            it('return 200', async () => {
                // ...
            });
        })

        describe('given the email does not exist', () => {
            it('return 404', async () => {
                // ...
            });
        });

        describe('given wrong auth code', () => {
            it('return 400', async () => {
                // ...
            });
        });

        describe('given right user data', () => {
            it('return 200', async () => {
                // ...
            });
        });
    });
});