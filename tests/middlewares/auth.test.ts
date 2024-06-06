import httpMocks from "node-mocks-http";
import jwt from "jsonwebtoken";
import { authChecker } from "../../src/middlewares/auth";
import { getJwtSecret } from "../../src/utils/jwt-secret";

describe("authCheckerTest", () => {
    const mockedToken = "anyToken"
  test("should reject if Authorization it not set", async () => {
    const mockRes = httpMocks.createResponse();
    const mockReq = httpMocks.createRequest({
      headers: {},
    });
    const mockNext = jest.fn();
    const resJsonSpy = jest.spyOn(mockRes, "json");
    const resStatusSpy = jest.spyOn(mockRes, "status");

    await authChecker(mockReq, mockRes, mockNext);

    expect(resJsonSpy).toHaveBeenCalledWith({
      success: false,
      message: "Access Denied! Plesse provide a valid token.",
      data: null,
    });
    expect(resStatusSpy).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should reject Authorization it not valid", async () => {
    const mockRes = httpMocks.createResponse();
    const mockReq = httpMocks.createRequest({
      headers: {
        Authorization: mockedToken
      },
    });
    const mockNext = jest.fn();
    const resJsonSpy = jest.spyOn(mockRes, "json");
    const resStatusSpy = jest.spyOn(mockRes, "status");
    const jwtSpy = jest
    .spyOn(jwt, "verify")
    .mockImplementationOnce(() => { throw Error("Invalid token") })

    await authChecker(mockReq, mockRes, mockNext);

    expect(jwtSpy).toHaveBeenCalledWith(mockedToken, getJwtSecret())
    expect(resJsonSpy).toHaveBeenCalledWith({
      success: false,
      message: "Access Denied! Plesse provide a valid token.",
      data: null,
    });
    expect(resStatusSpy).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });


  test("should authenticate use", async () => {
    const mockRes = httpMocks.createResponse();
    const mockReq = httpMocks.createRequest({
      headers: {
        Authorization: mockedToken
      },
      headersDistinct: {

      }
    });
    const mockNext = jest.fn();
    const resJsonSpy = jest.spyOn(mockRes, "json");
    const jwtSpy = jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
            return { foo: "bar" }
    });

    await authChecker(mockReq, mockRes, mockNext);

    expect(jwtSpy).toHaveBeenCalledWith(mockedToken, getJwtSecret())
    expect(resJsonSpy).not.toHaveBeenCalled()
    expect(mockNext).toHaveBeenCalled();
    expect(mockReq.headersDistinct["payload"]).toEqual({ foo: "bar" });
  });
});
