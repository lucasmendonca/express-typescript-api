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
            const id = 1
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
            const id = 3
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
            const id = 1
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
            const id = 3
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

    describe("#create()", () => {
        test("should create a post", async () => {
            const userId = 1
            const mockRes = httpMocks.createResponse();
            const mockReq = httpMocks.createRequest({
                headersDistinct: {
                    payload: {
                        id: userId
                    }
                },
                body: {
                    title: "Post title",
                    body: "Post body",
                    AuthorId: userId,
                }
            });
            const resJsonSpy = jest.spyOn(mockRes, "json")
            const createSpy = jest.spyOn(postRepository, "create").mockResolvedValue(mockedPosts[0])
            const response = await postController.create(mockReq, mockRes)

            expect(resJsonSpy).toHaveBeenCalledWith({
                success: true,
                data: mockedPosts[0],
                message: "Post created with success"
            })
            expect(createSpy).toHaveBeenCalled()
            expect(response.statusCode).toEqual(200)
        })

        test("should not cretate post of behalf of another author(user)", async () => {
            const userId = 1
            const anotherUserId = 2
            const mockRes = httpMocks.createResponse();
            const mockReq = httpMocks.createRequest({
                headersDistinct: {
                    payload: {
                        id: userId
                    }
                },
                body: {
                    title: "Post title",
                    body: "Post body",
                    AuthorId: anotherUserId,
                }
            });
            const resJsonSpy = jest.spyOn(mockRes, "json")
            const createSpy = jest.spyOn(postRepository, "create").mockReset()
            const response = await postController.create(mockReq, mockRes)

            expect(resJsonSpy).toHaveBeenCalledWith({
                success: false,
                data: null,
                message: "Use cannot create posts on behalf of another author"
            })
            expect(createSpy).not.toHaveBeenCalled()
            expect(response.statusCode).toEqual(403)
        })
    })

    describe("#update()", () => {
        test("should update post", async () => {
            const id = 1
            const mockRes = httpMocks.createResponse();
            const mockReq = httpMocks.createRequest({
                params : {
                    id: 1
                },
                body: {
                    title: mockedPosts[1].title,
                    body: mockedPosts[1].body,
                    AuthorId: mockedPosts[1].AuthorId,
                }
            });
            const resJsonSpy = jest.spyOn(mockRes, "json")
            const updateSpy = jest.spyOn(postRepository, "update").mockResolvedValue(mockedPosts[1])
            const response = await postController.update(mockReq, mockRes)

            expect(resJsonSpy).toHaveBeenCalledWith({
                success: true,
                data: mockedPosts[1],
                message: "Post updated with success"
            })
            expect(updateSpy).toHaveBeenCalledWith(1, mockedPosts[1].title, mockedPosts[1].body, mockedPosts[1].AuthorId)
            expect(response.statusCode).toEqual(200)
        })

        test("should return error when post does not exist", async () => {
            const id = 1
            const mockRes = httpMocks.createResponse();
            const mockReq = httpMocks.createRequest({
                params : {
                    id: 1
                },
                body: {
                    title: mockedPosts[1].title,
                    body: mockedPosts[1].body,
                    AuthorId: mockedPosts[1].AuthorId,
                }
            });
            const resJsonSpy = jest.spyOn(mockRes, "json")
            const updateSpy = jest.spyOn(postRepository, "update").mockResolvedValue(null)
            const response = await postController.update(mockReq, mockRes)

            expect(updateSpy).toHaveBeenCalledWith(1, mockedPosts[1].title, mockedPosts[1].body, mockedPosts[1].AuthorId)
            expect(resJsonSpy).toHaveBeenCalledWith({
                success: false,
                message: 'Entity not found',
                data: null
            })
            expect(response.statusCode).toEqual(404)
        })
    })
})