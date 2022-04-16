const request = require("supertest");
const app = require("../server");
const toDoList = require("../src/toDoList.json");

describe("Endpoints", () => {
  it("should return all tasks", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(toDoList);
  });

  it("should update task status", async () => {
    const res = await request(app).post("/update/1");

    const updatedList = toDoList.map((object) =>
      object.id === 1 ? { ...object, done: !object.done } : object
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(updatedList);
  });
});
