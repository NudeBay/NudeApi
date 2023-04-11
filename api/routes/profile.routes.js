const router=require('express').Router();
module.exports=router;
// Schemas
// ...
// Middlewares
const verify=require('../middlewares/verify');



router.get('/profile/:id', verify, async (req, res) => {
    // Get user (by id) from req.params.id or if not exists from res.locals.user._id
    
    // return only public data
});



router.get('/profile/:id/posts', verify, async (req, res) => {
    // Get posts (by id) from req.params.id or if not exists from res.locals.user._id

    // return posts (as list of objects and if it's public)
});



router.get('/profile/:id/friends', verify, async (req, res) => {
    // Get friends (by id) from req.params.id or if not exists from res.locals.user._id

    // return friends (as list of objects and if it's public)
});



router.get('/profile/:id/followers', verify, async (req, res) => {
    // Get followers (by id) from req.params.id or if not exists from res.locals.user._id

    // return followers (as list of objects and if it's public)
});



router.get('/profile/:id/following', verify, async (req, res) => {
    // Get following (by id) from req.params.id or if not exists from res.locals.user._id

    // return following (as list of objects and if it's public)
});



router.get('/profile/:id/blocked', verify, async (req, res) => {
    // Get blocked (by id) from req.params.id or if not exists from res.locals.user._id

    // return blocked (as list of objects and if it's public)
});



router.get('/profile/:id/favorites', verify, async (req, res) => {
    // Get favorites (by id) from req.params.id or if not exists from res.locals.user._id

    // return favorites (as list of objects and if it's public)
});