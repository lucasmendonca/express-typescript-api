import { userRepository } from "../../src/repositories/user-repository";
import { User } from "../../src/models";

describe("UserRepositoryTest", () => {
  const mockedUser = new User({
    id: 1,
    name: "Lucas",
    email: "lucasnix@gmail.com",
    createdAt: "2024-06-05T14:36:40.160Z",
    updatedAt: "2024-06-05T14:36:40.160Z",
    deletedAt: null,
    password: "****",
  });

  describe("#findByEmail()", () => {
    test("should find user by email", async () => {
      const email = "lucasnix@gmail.com";
      const findOneSpy = jest
        .spyOn(User, "findOne")
        .mockResolvedValue(mockedUser);

      const user = await userRepository.findByEmail(email);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });
});
