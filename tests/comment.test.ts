import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { CommentTest, VideoTest } from "./test-util";
import { prismaClient } from "../src/application/database";

describe("GET /API/v1/videos/:videoId/comments", () => {
  afterEach(async () => {
    await CommentTest.delete();
  });

  it("should retrieve all comments", async () => {
    const video = await VideoTest.create();

    await CommentTest.create(video.id);
    await CommentTest.create(video.id);
    await CommentTest.create(video.id);

    const url = `/api/v1/videos/${video.id}/comments`;

    const response = await supertest(web).get(url);

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });

  it("should retrieve all comments with no existing comment", async () => {
    const url = `/api/v1/videos/${(await VideoTest.create()).id}/comments`;

    const response = await supertest(web).get(url);

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });

  it("should return videoID not valid", async () => {
    const url = `/api/v1/videos/whatever/comments`;

    const response = await supertest(web).get(url);

    console.log(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("POST /api/v1/:videoId/comments", () => {
  afterEach(async () => {
    await CommentTest.delete();
  });

  it("should reject submitted comment if video does not exist", async () => {
    const response = await supertest(web)
      .post("/api/v1/videos/111/comments")
      .send({
        username: "",
        comment: "",
      });
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject comment if comment is invalid", async () => {
    const url = `/api/v1/videos/${(await VideoTest.create()).id}/comments`;

    const response = await supertest(web).post(url).send({
      username: "",
      comment: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should successfully create new comment", async () => {
    const url = `/api/v1/videos/${(await VideoTest.create()).id}/comments`;

    const response = await supertest(web).post(url).send({
      username: "test",
      comment: "This is comment test",
    });

    console.log(response.body);

    const comment = await prismaClient.comments.findFirst({
      where: { username: "test" },
    });

    expect(response.status).toBe(201);
    expect(response.body.data.id).toBeDefined();
    expect(comment?.username).toBe("test");
    expect(comment?.comment).toBe("This is comment test");
    expect(comment?.createdAt).toBeDefined();
  });
});
