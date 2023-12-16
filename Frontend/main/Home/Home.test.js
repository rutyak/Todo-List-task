const request = require("supertest")
const baseURL = "http://localhost:5000"

test("should return 200", async () => {

    const currentUser = "swapnil@gmail.com"
    
    const response = await request(baseURL).get(`/tasks/${currentUser}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeUndefined();
});