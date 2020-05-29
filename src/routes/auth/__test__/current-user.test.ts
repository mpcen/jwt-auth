import request from 'supertest';

import { app } from '../../../app';
import { signin } from '../../../test/authUtil';

it('responds with details about the current user', async () => {
    const token = await signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .send({ jwt: token })
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);

    expect(response.body.currentUser).toEqual(null);
});
