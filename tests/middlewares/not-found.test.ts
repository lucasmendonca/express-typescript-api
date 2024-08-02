import httpMocks from "node-mocks-http";

import { NotFoundHandler } from "../../src/middlewares/not-found";

describe("NotFoundHandler", () => {
  test("should return 404 with message", async () => {
    const mockRes = httpMocks.createResponse();
    const mockReq = httpMocks.createRequest({
      params: {},
    });

    const resJsonSpy = jest.spyOn(mockRes, "json");
    const response = NotFoundHandler(mockReq, mockRes);

    expect(resJsonSpy).toHaveBeenCalledWith({
      success: false,
      message: "Resource not found",
      data: null,
    });
    expect(response.statusCode).toBe(404);
  });
});
