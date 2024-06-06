import { encrypt } from "../../src/utils/encrypt";
import * as bcrypt from "bcrypt";

jest.mock("bcrypt");

describe("#encrypt()", () => {
  test("should call bcrypt", async () => {
    const value = "anyValue";
    const hashValue = "****";
    const bcryptSpy = jest.spyOn(bcrypt, "hash").mockImplementation(() => {
      return Promise.resolve(hashValue);
    });
    const secret = await encrypt(value);

    expect(bcryptSpy).toHaveBeenCalledWith(value, 10);
    expect(secret).toEqual(hashValue);
  });
});
