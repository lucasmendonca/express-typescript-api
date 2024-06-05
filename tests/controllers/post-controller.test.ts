import httpMocks from 'node-mocks-http';
import { postController } from "../../src/controllers/post-controller"
import { postRepository } from "../../src/repositories/post-repository";
import { Post } from '../../src/models';

describe("PostControllerTest", () => {
    const mockedPosts = [
        new Post(
            {
                "id": 1,
                "title": "Hello world post",
                "body": "My fist post",
                "createdAt": "2024-06-05T14:36:40.160Z",
                "updatedAt": "2024-06-05T14:36:40.160Z",
                "deletedAt": null,
                "AuthorId": 1
            }
        ),
        new Post(
            {
                "id": 2,
                "title": "Post 2",
                "body": "My 2nd post",
                "createdAt": "2024-06-05T14:36:40.160Z",
                "updatedAt": "2024-06-05T14:36:40.160Z",
                "deletedAt": null,
                "AuthorId": 1
            }
        )
    ]
    
    describe("#list()", () => {
        test("should request all posts", async () => {
            const id = "1"
            const mockRes = httpMocks.createResponse();
            const mockReq = httpMocks.createRequest({
                params: {}
            });
            const resJsonSpy = jest.spyOn(mockRes, "json")
            const getByIdSpy = jest.spyOn(postRepository, "getAll").mockResolvedValue(mockedPosts)
            const response = await postController.list(mockReq, mockRes)
            
            expect(resJsonSpy).toHaveBeenCalledWith({
                success: true,
                data: mockedPosts,
            })
            expect(getByIdSpy).toHaveBeenCalledTimes(1)
        })
    })

    describe("#get()", () => {
        test("should request post by Id", async () => {
            const id = "1"
            const mockRes = httpMocks.createResponse();
            const mockReq = httpMocks.createRequest({
                params: {
                    id: id
                }
            });
            const resJsonSpy = jest.spyOn(mockRes, "json")
            const getByIdSpy = jest.spyOn(postRepository, "getById").mockResolvedValue(mockedPosts[0])
            const response = await postController.get(mockReq, mockRes)

            expect(resJsonSpy).toHaveBeenCalledWith({
                success: true,
                data: mockedPosts[0],
            })
            expect(getByIdSpy).toHaveBeenCalledWith(id)
            expect(response.statusCode).toEqual(200)
        })

        test("should return not found", async () => {
            const id = "3"
            const mockRes = httpMocks.createResponse();
            const mockReq = httpMocks.createRequest({
                params: {
                    id: id
                }
            });
            const resJsonSpy = jest.spyOn(mockRes, "json")
            const getByIdSpy = jest.spyOn(postRepository, "getById").mockResolvedValue(null)
            const response = await postController.get(mockReq, mockRes)

            expect(resJsonSpy).toHaveBeenCalledWith({
                success: false,
                message: 'Entity not found',
                data: null
            })
            expect(getByIdSpy).toHaveBeenCalledWith(id)
            expect(response.statusCode).toEqual(404)
        })
    })

    describe("#delete()", () => {
        test("should delete post by Id", async () => {
            const id = "1"
            const mockRes = httpMocks.createResponse();
            const mockReq = httpMocks.createRequest({
                params: {
                    id: id
                }
            });
            const resJsonSpy = jest.spyOn(mockRes, "json")
            const deleteSpy = jest.spyOn(postRepository, "delete").mockResolvedValue(mockedPosts[0])
            const response = await postController.delete(mockReq, mockRes)

            expect(resJsonSpy).toHaveBeenCalledWith({
                success: true,
                data: mockedPosts[0],
                message: "Post deleted with success"
            })
            expect(deleteSpy).toHaveBeenCalledWith(id)
            expect(response.statusCode).toEqual(200)
        })

        test("should return not found", async () => {
            const id = "3"
            const mockRes = httpMocks.createResponse();
            const mockReq = httpMocks.createRequest({
                params: {
                    id: id
                }
            });
            const resJsonSpy = jest.spyOn(mockRes, "json")
            const deleteSpy = jest.spyOn(postRepository, "delete").mockResolvedValue(null)
            const response = await postController.delete(mockReq, mockRes)

            expect(deleteSpy).toHaveBeenCalledWith(id)
            expect(resJsonSpy).toHaveBeenCalledWith({
                success: false,
                message: 'Entity not found',
                data: null
            })
            expect(response.statusCode).toEqual(404)
        })
    })
})