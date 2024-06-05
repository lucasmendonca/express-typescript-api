import { Router } from 'express';
import { postController } from  '../controllers/post-controller';

const router: Router = Router();

// import { loginSchema, signupSchema } from '../../validations/auth.validation';
// authRouter.post('/signup', validate(signupSchema), authController.handleSignUp); -> https://github.com/Louis3797/express-ts-auth-service/blob/main/src/routes/v1/auth.route.ts

// Post routes
router.get("/posts", postController.list);
router.get("/posts/:id", postController.get);
router.post("/posts", postController.create);
router.put("/posts/:id", postController.update);
router.delete("/posts/:id", postController.delete);

// Users routes
// router.get("/users/", userController.list); // list all users
// router.get("/user/:id", userController.get); // list posts of one user

export { router };