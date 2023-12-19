const baseURL = "http://localhost:5000";
const request = require('supertest');

it("Check edit api is working properly or not",async ()=>{
    
    const id = '65802f4cb127e90b9fa68fa2';
    const response = await request(baseURL).put(`/updateTask/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeUndefined();
})
