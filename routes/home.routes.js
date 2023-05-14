const router=require('express').Router();
module.exports=router;
// Schemas
// ...
// Middlewares
const verify=require('../middlewares/verify.middleware');
const { homeLimiter }=require('../middlewares/limit.middleware');
router.use(homeLimiter);


router.get('/', verify, async (req, res) => {
    // Use homeSuggestion algorithm to get posts

    // Send posts (as list of objects)
});
