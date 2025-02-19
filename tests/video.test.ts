import supertest from "supertest";
import { web } from "../src/application/web";
import { v4 as uuidv4 } from "uuid";
import { VideoTest } from "./test-util";

describe("GET /api/v1/videos", () => {
  it("should retrieve video list", async () => {
    const response = await supertest(web).get("/api/v1/videos");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("VIDEOS LIST RETRIEVED SUCCESSFULLY");
  });
});

describe("GET /api/v1/videos/:videoId", () => {
  afterEach(async () => {
    await VideoTest.delete();
  });

  it("should return invalid video id", async () => {
    const response = await supertest(web).get("/api/v1/videos/1234weqr");

    console.log(response.body);

    expect(response.status).toBe(400);
  });

  it("should return video not found", async () => {
    const validButNotExistUUID = uuidv4();

    const response = await supertest(web).get(
      `/api/v1/videos/${validButNotExistUUID}`
    );

    console.log(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Video not found");
  });

  it("should return detail video", async () => {
    const createdVideo = await VideoTest.create();

    const response = await supertest(web).get(
      `/api/v1/videos/${createdVideo.id}`
    );

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.title).toBe("test");
  });
});
