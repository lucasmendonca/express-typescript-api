import { Router } from 'express';
import { postController } from  '../controllers/post-controller';
import { userController } from  '../controllers/user-controller';
import { postSchema, loginSchema } from '../validators'
import { schemaValidator } from '../middlewares/validator'
import { authChecker } from '../middlewares/auth';

const router: Router = Router();

// Post routes
router.get("/posts", postController.list);
router.get("/posts/:id", postController.get);
router.post("/posts", authChecker, schemaValidator(postSchema), postController.create);
router.put("/posts/:id", authChecker, schemaValidator(postSchema), postController.update);
router.delete("/posts/:id", authChecker, postController.delete);

// Users routes
router.post("/users/login", schemaValidator(loginSchema), userController.login);

export { router };