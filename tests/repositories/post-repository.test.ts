import { postRepository } from "../../src/repositories/post-repository";
import { Post } from '../../src/models';

describe("PostRepositoryTest", () => {
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

    describe("#getById()", () => {
        test("should get post by Id", async () => {
            const id = "1"
            const findOneSpy = jest.spyOn(Post, "findOne").mockResolvedValue(mockedPosts[0])

            await postRepository.getById(id)

            expect(findOneSpy).toHaveBeenCalledWith({
                where: { id }
            })
        })
    })

    describe("#getAll()", () => {
        test("should return all posts", async () => {
            const findSPy = jest.spyOn(Post, "findAll").mockResolvedValue(mockedPosts)
            const response = await postRepository.getAll()

            expect(findSPy).toHaveBeenCalledTimes(1)
            expect(response).toEqual(mockedPosts)
        })
    })

    describe("#delete()", () => {
        test("should delete post and return value", async () => {
            const id = "1"
            const mockedPost = mockedPosts[0]
            const destroySpy = jest.spyOn(mockedPost, "destroy").mockResolvedValueOnce()
            const getByIdSpy = jest.spyOn(postRepository, "getById").mockResolvedValueOnce(mockedPost)

            const response = await postRepository.delete(id)

            expect(getByIdSpy).toHaveBeenCalledWith(id)
            expect(destroySpy).toHaveBeenCalledTimes(1)
            expect(response).toEqual(mockedPost)
        })

        test("should return null when post does not exist", async () => {
            const id = "1"
            const mockedPost = mockedPosts[0]
            const destroySpy = jest.spyOn(mockedPost, "destroy").mockClear()
            const getByIdSpy = jest.spyOn(postRepository, "getById").mockResolvedValueOnce(null)

            const response = await postRepository.delete(id)

            expect(getByIdSpy).toHaveBeenCalledWith(id)
            expect(destroySpy).not.toHaveBeenCalled()
            expect(response).toEqual(null)
        })
    })
})