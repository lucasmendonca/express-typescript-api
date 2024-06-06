import httpMocks from "node-mocks-http";
import jwt from "jsonwebtoken";
import { userController } from "../../src/controllers/user-controller";
import { userRepository } from "../../src/repositories/user-repository";
import { User } from "../../src/models";
import { getJwtSecret } from "../../src/utils/jwt-secret";

describe("UserControllerTest", () => {
  const mockedUser = new User({
    id: 1,
    name: "Lucas",
    email: "lucasnix@gmail.com",
    createdAt: "2024-06-05T14:36:40.160Z",
    updatedAt: "2024-06-05T14:36:40.160Z",
    deletedAt: null,
    password: "$2b$10$fFa6PfDWisccVH08mT0zl.eaJjSuTaB9c91sWBODacgdqymqCxAJm",
  });

  const password = "12345";
  const mockedToken = "anyToken";

  describe("#login()", () => {
    test("should authenticate user by email", async () => {
      const mockRes = httpMocks.createResponse();
      const mockReq = httpMocks.createRequest({
        body: {
          email: mockedUser.email,
          password: password,
        },
      });
      const resJsonSpy = jest.spyOn(mockRes, "json");
      const findByEmailSpy = jest
        .spyOn(userRepository, "findByEmail")
        .mockResolvedValue(mockedUser);

      const signSpy = jest
        .spyOn(jwt, "sign")
        .mockImplementation(() => mockedToken);

      const response = await userController.login(mockReq, mockRes);

      expect(findByEmailSpy).toHaveBeenCalledWith(mockedUser.email);
      expect(signSpy).toHaveBeenCalledWith(
        {
          id: mockedUser.id,
          email: mockedUser.email,
          name: mockedUser.name,
        },
        getJwtSecret(),
        {
          expiresIn: "1h",
        }
      );

      expect(resJsonSpy).toHaveBeenCalledWith({
        success: true,
        data: {
          id: mockedUser.id,
          email: mockedUser.email,
          name: mockedUser.name,
          token: mockedToken,
        },
      });
      expect(response.statusCode).toEqual(200);
    });

    test("should return invalid password", async () => {
        const mockRes = httpMocks.createResponse();
        const mockReq = httpMocks.createRequest({
          body: {
            email: mockedUser.email,
            password: "wrongPassword",
          },
        });
        const resJsonSpy = jest.spyOn(mockRes, "json")
        const findByEmailSpy = jest
          .spyOn(userRepository, "findByEmail")
          .mockResolvedValue(mockedUser);

        const signSpy = jest
          .spyOn(jwt, "sign").mockClear()
  
        const response = await userController.login(mockReq, mockRes);
  
        expect(findByEmailSpy).toHaveBeenCalledWith(mockedUser.email);
        expect(signSpy).not.toHaveBeenCalled()
        expect(resJsonSpy).toHaveBeenCalledWith({
          success: false,
          data: null,
          message: "Invalid password",
        });
        
        expect(response.statusCode).toEqual(401);
    });

    test("should return 404 when user does not exist", async () => {
        const mockRes = httpMocks.createResponse();
        const mockReq = httpMocks.createRequest({
          body: {
            email: mockedUser.email,
            password: password,
          },
        });
        const resJsonSpy = jest.spyOn(mockRes, "json")
        const findByEmailSpy = jest
          .spyOn(userRepository, "findByEmail")
          .mockResolvedValue(null);

        const signSpy = jest
          .spyOn(jwt, "sign")
          .mockClear()
  
        const response = await userController.login(mockReq, mockRes);
  
        expect(findByEmailSpy).toHaveBeenCalledWith(mockedUser.email);
        expect(signSpy).not.toHaveBeenCalled()
        expect(resJsonSpy).toHaveBeenCalledWith({
          success: false,
          data: null,
          message: "Entity not found",
        });
        expect(response.statusCode).toEqual(404);
      });
  });
});
