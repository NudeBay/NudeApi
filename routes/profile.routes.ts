import { Router, Request, Response } from 'express';
const router: Router=Router();
export default router;
// Schemas
// ...
// Middlewares
import verify from '../middlewares/verify.middleware';
import { profileLimiter } from '../middlewares/limit.middleware';
router.use(profileLimiter);


router.get('/:id', verify, async (_req: Request, _res: Response) => {
    // Get user (by id) from req.params.id or if not exists from res.locals.user._id
    
    // return only public data
});



router.get('/:id/posts', verify, async (_req: Request, _res: Response) => {
    // Get posts (by id) from req.params.id or if not exists from res.locals.user._id

    // return posts (as list of objects and if it's public)
});



router.get('/:id/friends', verify, async (_req: Request, _res: Response) => {
    // Get friends (by id) from req.params.id or if not exists from res.locals.user._id

    // return friends (as list of objects and if it's public)
});



router.get('/:id/followers', verify, async (_req: Request, _res: Response) => {
    // Get followers (by id) from req.params.id or if not exists from res.locals.user._id

    // return followers (as list of objects and if it's public)
});



router.get('/:id/following', verify, async (_req: Request, _res: Response) => {
    // Get following (by id) from req.params.id or if not exists from res.locals.user._id

    // return following (as list of objects and if it's public)
});



router.get('/profile/:id/blocked', verify, async (_req: Request, _res: Response) => {
    // Get blocked (by id) from req.params.id or if not exists from res.locals.user._id

    // return blocked (as list of objects and if it's public)
});



router.get('/profile/:id/favorites', verify, async (_req: Request, _res: Response) => {
    // Get favorites (by id) from req.params.id or if not exists from res.locals.user._id

    // return favorites (as list of objects and if it's public)
});