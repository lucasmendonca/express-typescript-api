import httpMocks from 'node-mocks-http';

import { AuthenticatedUser } from '../../src/models';
import { getAuthenticatedUser } from '../../src/utils/helpers';

describe("#getAuthenticatedUser()", () => {
    const authenticatedUser : AuthenticatedUser = {
        id: 1,
        email: "lucas@test.com",
        name: "Lucas",
        iat: 10000,
        exp: 10000
    }
    test("should return authenticate user", async () => {
        const reqContent: any = {
            headers:  {}
        }
        reqContent["headers"]["payload"] = authenticatedUser;

        const mockReq = httpMocks.createRequest(reqContent);
      
      expect(getAuthenticatedUser(mockReq)).toEqual(authenticatedUser);
    });

    test("should return authenticate user (undefined)", async () => {
        const reqContent: any = {
            headers:  {}
        }
        const mockReq = httpMocks.createRequest(reqContent);
      
      expect(getAuthenticatedUser(mockReq)).toEqual(undefined);
    });
  });
  