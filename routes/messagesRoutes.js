

const {addMsg,getMsg} = require("../controllers/messagesController.js")

const router = require("express").Router();

router.post("/addMsg",addMsg)
router.post("/getMsg",getMsg); 


module.exports = router;
