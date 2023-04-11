const router=require('express').Router();
module.exports=router;
// Schemas
// ...
// Middlewares
const verify=require('../middlewares/verify');



router.get('/home', verify, async (req, res) => {
    // Use homeSuggestion algorithm to get posts

    // Send posts (as list of objects)
});
