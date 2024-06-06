import { getJwtSecret } from "../../src/utils/jwt-secret";

describe("#getJwtSecret()", () => {
  const originalEnv = process.env;
  const customSecret = "customSecret";

  afterEach(() => {
    process.env = originalEnv;
  });
  test("should return default secret", () => {
    const secret = getJwtSecret();
    expect(secret).toBe("defaultSecret");
  });

  test("should return env secret", () => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      jwtSecret: customSecret,
    };

    const secret = getJwtSecret();
    expect(secret).toBe(customSecret);
  });
});
