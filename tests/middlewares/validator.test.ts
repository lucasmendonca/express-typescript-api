import httpMocks from "node-mocks-http";
import { schemaValidator } from "../../src/middlewares/validator";
import { postSchema } from "../../src/validators";

describe("schemaValidatorTest", () => {
  test("should return 400 error", async () => {
    const invalidPost = {
      id: "Hello world post",
      body: "My fist post",
      authorId: 1,
    };
    const mockRes = httpMocks.createResponse();
    const mockReq = httpMocks.createRequest({
      params: {},
      body: invalidPost,
    });
    const mockNext = jest.fn();
    const resJsonSpy = jest.spyOn(mockRes, "json");
    const resStatusSpy = jest.spyOn(mockRes, "status");

    await schemaValidator(postSchema)(mockReq, mockRes, mockNext);

    expect(resJsonSpy).toHaveBeenCalledWith({
      success: false,
      message: '"title" is required',
      data: null,
    });
    expect(resStatusSpy).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should return 500 error", async () => {
    const invalidPost = { };
    const mockRes = httpMocks.createResponse();
    const mockReq = httpMocks.createRequest({
      params: {},
      body: invalidPost,
    });
    const mockNext = jest.fn();
    const resJsonSpy = jest.spyOn(mockRes, "json");
    const resStatusSpy = jest.spyOn(mockRes, "status");
    const validateSpy = jest.spyOn(postSchema, "validateAsync").mockRejectedValueOnce(new Error("Any Error"))

    await schemaValidator(postSchema)(mockReq, mockRes, mockNext);

    expect(resJsonSpy).toHaveBeenCalledWith({
      success: false,
      message: 'Any Error',
      data: null,
    });
    expect(resStatusSpy).toHaveBeenCalledWith(500);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should proceed if any error", async () => {
    const validPost = {
      title: "Hello world post",
      body: "My fist post",
      authorId: 1,
    };
    const mockRes = httpMocks.createResponse();
    const mockReq = httpMocks.createRequest({
      params: {},
      body: validPost,
    });
    const mockNext = jest.fn();
    const resJsonSpy = jest.spyOn(mockRes, "json");
    const resStatusSpy = jest.spyOn(mockRes, "status");

    await schemaValidator(postSchema)(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(resStatusSpy).not.toHaveBeenCalled();
    expect(resJsonSpy).not.toHaveBeenCalled();
  });
});
