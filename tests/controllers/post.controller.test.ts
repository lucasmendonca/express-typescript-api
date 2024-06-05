import { postController } from "../../src/controllers/post-controller"
import httpMocks from 'node-mocks-http';

describe("PostControllerTest", () => {
  
    describe("#list()", () => {
        test("should return reponse", () => {
            const mockRes = httpMocks.createResponse();
            const mockReq = httpMocks.createRequest();
            const resJsonSpy  = jest.spyOn(mockRes, "json")

            const response = postController.list(mockReq, mockRes)

            expect(resJsonSpy).toHaveBeenCalledWith({
                response: "Hello World - List"
            })

            expect(response.statusCode).toEqual(200)
        })
    })

})