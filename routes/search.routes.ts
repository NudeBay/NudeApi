import { Router, Request, Response } from 'express';
const router: Router=Router();
export default router;
// Schemas
// ...
// Middlewares
import verify from '../middlewares/verify.middleware';
import { searchLimiter } from '../middlewares/limit.middleware';
router.use(searchLimiter);


router.get('/', verify, async (_req: Request, _res: Response) => {
    // Use searchSuggestion algorithm to get { posts, accounts, hashtags }
});

router.get('/:text', verify, async (_req: Request, _res: Response) => {   // !Remember to not display posts from blocked users and with compartment
    // Get users (by name)

    // Get users (by email)

    // Get users (by description)

    // Get posts (by text)

    // Get posts (by tags)

    // Get posts (by users)

    // Mix results

    // Send results (as list of objects)
});

router.get('/#:tag', verify, async (_req: Request, _res: Response) => {   // !Remember to not display posts from blocked users and with compartment
    // Get posts (by tag)

    // Send results (as list of objects)
});

router.get('/@:user', verify, async (_req: Request, _res: Response) => {  // !Remember to not display posts from blocked users and with compartment
    // Get posts (by user)

    // Send results (as list of objects)
});