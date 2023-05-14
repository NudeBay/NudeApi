const router=require('express').Router();
module.exports=router;
// Schemas
// ...
// Middlewares
const verify=require('../middlewares/verify.middleware');
const { searchLimiter }=require('../middlewares/limit.middleware');
router.use(searchLimiter);


router.get('/', verify, async (req, res) => {
    // Use searchSuggestion algorithm to get { posts, accounts, hashtags }
});

router.get('/:text', verify, async (req, res) => {   // !Remember to not display posts from blocked users and with compartment
    // Get users (by name)

    // Get users (by email)

    // Get users (by description)

    // Get posts (by text)

    // Get posts (by tags)

    // Get posts (by users)

    // Mix results

    // Send results (as list of objects)
});

router.get('/#:tag', verify, async (req, res) => {   // !Remember to not display posts from blocked users and with compartment
    // Get posts (by tag)

    // Send results (as list of objects)
});

router.get('/@:user', verify, async (req, res) => {  // !Remember to not display posts from blocked users and with compartment
    // Get posts (by user)

    // Send results (as list of objects)
});