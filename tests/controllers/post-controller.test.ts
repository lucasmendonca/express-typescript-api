import httpMocks from "node-mocks-http";
import { postController } from "../../src/controllers/post-controller";
import { postRepository } from "../../src/repositories/post-repository";
import { AuthenticatedUser, Post } from "../../src/models";

describe("PostControllerTest", () => {
  const mockedPosts = [
    new Post({
      id: 1,
      title: "Hello world post",
      body: "My fist post",
      createdAt: "2024-06-05T14:36:40.160Z",
      updatedAt: "2024-06-05T14:36:40.160Z",
      deletedAt: null,
      AuthorId: 1,
    }),
    new Post({
      id: 2,
      title: "Post 2",
      body: "My 2nd post",
      createdAt: "2024-06-05T14:36:40.160Z",
      updatedAt: "2024-06-05T14:36:40.160Z",
      deletedAt: null,
      AuthorId: 2,
    }),
  ];

  const authenticatedUser: AuthenticatedUser = {
    id: 1,
    email: "lucas@test.com",
    name: "Lucas",
    iat: 10000,
    exp: 10000,
  };

  describe("#list()", () => {
    test("should request all posts", async () => {
      const mockRes = httpMocks.createResponse();
      const mockReq = httpMocks.createRequest({
        headers: {
          payload: authenticatedUser as any,
        },
        params: {},
      });
      const resJsonSpy = jest.spyOn(mockRes, "json");
      const getByIdSpy = jest
        .spyOn(postRepository, "getAll")
        .mockResolvedValue(mockedPosts);
      const response = await postController.list(mockReq, mockRes);

      expect(resJsonSpy).toHaveBeenCalledWith({
        success: true,
        data: mockedPosts,
      });
      expect(getByIdSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("#get()", () => {
    test("should request post by Id", async () => {
      const id = 1;
      const mockRes = httpMocks.createResponse();
      const mockReq = httpMocks.createRequest({
        headers: {
          payload: authenticatedUser as any,
        },
        params: {
          id: id,
        },
      });
      const resJsonSpy = jest.spyOn(mockRes, "json");
      const getByIdSpy = jest
        .spyOn(postRepository, "getById")
        .mockResolvedValue(mockedPosts[0]);
      const response = await postController.get(mockReq, mockRes);

      expect(resJsonSpy).toHaveBeenCalledWith({
        success: true,
        data: mockedPosts[0],
      });
      expect(getByIdSpy).toHaveBeenCalledWith(id);
      expect(response.statusCode).toEqual(200);
    });

    test("should return not found", async () => {
      const id = 3;
      const mockRes = httpMocks.createResponse();
      const mockReq = httpMocks.createRequest({
        headers: {
          payload: authenticatedUser as any,
        },
        params: {
          id: id,
        },
      });
      const resJsonSpy = jest.spyOn(mockRes, "json");
      const getByIdSpy = jest
        .spyOn(postRepository, "getById")
        .mockResolvedValue(null);
      const response = await postController.get(mockReq, mockRes);

      expect(resJsonSpy).toHaveBeenCalledWith({
        success: false,
        message: "Entity not found",
        data: null,
      });
      expect(getByIdSpy).toHaveBeenCalledWith(id);
      expect(response.statusCode).toEqual(404);
    });
  });

  describe("#delete()", () => {
    test("should delete post by Id", async () => {
      const id = 1;
      const mockRes = httpMocks.createResponse();
      const mockReq = httpMocks.createRequest({
        headers: {
          payload: authenticatedUser as any,
        },
        params: {
          id: id,
        },
      });
      const resJsonSpy = jest.spyOn(mockRes, "json");
      const getByIdSpy = jest
        .spyOn(postRepository, "getById")
        .mockResolvedValue(mockedPosts[0]);
      const deleteSpy = jest
        .spyOn(postRepository, "delete")
        .mockResolvedValue(mockedPosts[0]);
      const response = await postController.delete(mockReq, mockRes);

      expect(resJsonSpy).toHaveBeenCalledWith({
        success: true,
        data: mockedPosts[0],
        message: "Post deleted with success",
      });
      expect(getByIdSpy).toHaveBeenCalledWith(id);
      expect(deleteSpy).toHaveBeenCalledWith(id);
      expect(response.statusCode).toEqual(200);
    });

    test("should return not found", async () => {
      const id = 3;
      const mockRes = httpMocks.createResponse();
      const mockReq = httpMocks.createRequest({
        headers: {
          payload: authenticatedUser as any,
        },
        params: {
          id: id,
        },
      });
      const resJsonSpy = jest.spyOn(mockRes, "json");
      const getByIdSpy = jest
        .spyOn(postRepository, "getById")
        .mockResolvedValue(null);
      const response = await postController.delete(mockReq, mockRes);

      expect(getByIdSpy).toHaveBeenCalledWith(id);
      expect(resJsonSpy).toHaveBeenCalledWith({
        success: false,
        message: "Entity not found",
        data: null,
      });
      expect(response.statusCode).toEqual(404);
    });

    test("should validate if user is the author", async () => {
      const id = 3;
      const mockRes = httpMocks.createResponse();
      const mockReq = httpMocks.createRequest({
        headers: {
          payload: authenticatedUser as any,
        },
        params: {
          id: id,
        },
      });
      const resJsonSpy = jest.spyOn(mockRes, "json");
      const getByIdSpy = jest
        .spyOn(postRepository, "getById")
        .mockResolvedValue(mockedPosts[1]);
      const response = await postController.delete(mockReq, mockRes);

      expect(getByIdSpy).toHaveBeenCalledWith(id);
      expect(resJsonSpy).toHaveBeenCalledWith({
        success: false,
        message: "Use cannot delete posts on behalf of another author",
        data: null,
      });
      expect(response.statusCode).toEqual(403);
    });
  });

  describe("#create()", () => {
    test("should create a post", async () => {
      const userId = 1;
      const mockRes = httpMocks.createResponse();
      const mockReq = httpMocks.createRequest({
        headers: {
          payload: authenticatedUser as any,
        },
        body: {
          title: "Post title",
          body: "Post body",
          AuthorId: userId,
        },
      });
      const resJsonSpy = jest.spyOn(mockRes, "json");
      const createSpy = jest
        .spyOn(postRepository, "create")
        .mockResolvedValue(mockedPosts[0]);
      const response = await postController.create(mockReq, mockRes);

      expect(resJsonSpy).toHaveBeenCalledWith({
        success: true,
        data: mockedPosts[0],
        message: "Post created with success",
      });
      expect(createSpy).toHaveBeenCalled();
      expect(response.statusCode).toEqual(200);
    });

    test("should not cretate post of behalf of another author(user)", async () => {
      const anotherUserId = 2;
      const mockRes = httpMocks.createResponse();
      const mockReq = httpMocks.createRequest({
        headers: {
          payload: authenticatedUser as any,
        },
        body: {
          title: "Post title",
          body: "Post body",
          AuthorId: anotherUserId,
        },
      });
      const resJsonSpy = jest.spyOn(mockRes, "json");
      const createSpy = jest.spyOn(postRepository, "create").mockReset();
      const response = await postController.create(mockReq, mockRes);

      expect(resJsonSpy).toHaveBeenCalledWith({
        success: false,
        data: null,
        message: "Use cannot create posts on behalf of another author",
      });
      expect(createSpy).not.toHaveBeenCalled();
      expect(response.statusCode).toEqual(403);
    });
  });

  describe("#update()", () => {
    const newTitle = "New title";
    const updatedPost = new Post({
      id: 1,
      title: newTitle,
      body: "My fist post",
      createdAt: "2024-06-05T14:36:40.160Z",
      updatedAt: "2024-06-05T14:36:40.160Z",
      deletedAt: null,
      AuthorId: 1,
    });
    test("should update post", async () => {
      const mockRes = httpMocks.createResponse();
      const mockReq = httpMocks.createRequest({
        params: {
          id: 1,
        },
        headers: {
          payload: authenticatedUser as any,
        },
        body: {
          title: updatedPost.title,
          body: updatedPost.body,
          AuthorId: updatedPost.AuthorId,
        },
      });
      const resJsonSpy = jest.spyOn(mockRes, "json");
      const updateSpy = jest
        .spyOn(postRepository, "update")
        .mockResolvedValue(updatedPost);
      const getByIdSpy = jest.spyOn(postRepository, "getById").mockResolvedValue(mockedPosts[0]);
      const response = await postController.update(mockReq, mockRes);

      expect(getByIdSpy).toHaveBeenCalled();
      expect(resJsonSpy).toHaveBeenCalledWith({
        success: true,
        data: updatedPost,
        message: "Post updated with success",
      });
      expect(updateSpy).toHaveBeenCalledWith(
        1,
        updatedPost.title,
        updatedPost.body,
        updatedPost.AuthorId
      );
      expect(response.statusCode).toEqual(200);
    });

    test("should return error when post does not exist", async () => {
      const mockRes = httpMocks.createResponse();
      const mockReq = httpMocks.createRequest({
        params: {
          id: 1,
        },
        headers: {
          payload: authenticatedUser as any,
        },
        body: {
          title: updatedPost.title,
          body: updatedPost.body,
          AuthorId: updatedPost.AuthorId,
        },
      });
      const resJsonSpy = jest.spyOn(mockRes, "json");
      const getByIdSpy = jest.spyOn(postRepository, "getById").mockResolvedValue(null);
      const response = await postController.update(mockReq, mockRes);

      expect(getByIdSpy).toHaveBeenCalledWith(1);
      expect(resJsonSpy).toHaveBeenCalledWith({
        success: false,
        message: "Entity not found",
        data: null,
      });
      expect(response.statusCode).toEqual(404);
    });

    test("should validate if user is the post author", async () => {
        const mockRes = httpMocks.createResponse();
        const mockReq = httpMocks.createRequest({
          params: {
            id: 1,
          },
          headers: {
            payload: authenticatedUser as any,
          },
          body: {
            title: updatedPost.title,
            body: updatedPost.body,
            AuthorId: updatedPost.AuthorId,
          },
        });
        const resJsonSpy = jest.spyOn(mockRes, "json");
        const getByIdSpy = jest.spyOn(postRepository, "getById").mockResolvedValue(mockedPosts[1]);
        const response = await postController.update(mockReq, mockRes);
  
        expect(getByIdSpy).toHaveBeenCalledWith(1);
        expect(resJsonSpy).toHaveBeenCalledWith({
            success: false,
            message: "Use cannot update posts on behalf of another author",
            data: null,
        });
        expect(response.statusCode).toEqual(403);
      });
  });
});
