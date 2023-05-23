import { Router, Request, Response } from "express";
const router: Router = Router();
export default router;
// Schemas
// ...
// Middlewares
import verify from '../middlewares/verify.middleware';
// const verify=require('../middlewares/verify.middleware');
import { homeLimiter } from '../middlewares/limit.middleware';
router.use(homeLimiter);


router.get('/', verify, async (_req: Request, _res: Response) => {
    // Use homeSuggestion algorithm to get posts

    // Send posts (as list of objects)
});
