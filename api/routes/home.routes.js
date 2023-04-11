const router=require('express').Router();
module.exports=router;
// Schemas
// ...
// Middlewares
const verify=require('../middlewares/verify');



router.get('/home', verify, async (req, res) => {   // !Remember to not display posts from blocked users and with compartment
    // Get posts (from followed users)

    // Get posts (from friends)

    // Get posts (from favorite tags)
    
    // Get posts (from favorite users)
    
    // Mix posts

    // Send posts (as list of objects)
});
