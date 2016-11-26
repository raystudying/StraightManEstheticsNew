var Users = require('../models/users');


/**
 * Finds a user by given user name.
 * @param  {Object} req request from front end
 * @param  {Object} res respond to front end
 * @return {Object}
 */
 function findByUsername(req, res){
	console.log("finds by user name");
	Users.findOne({userName:req.query.userName}, function(err, user){
		if(!user){
			res.status(400).json("Error: no such user");
		}
		console.log(user);
		var result = Object.assign({},user._doc);
		delete result.password;
		return res.json(result);
	})
}

/**
 * Finds a user info when the user is on his own main page.
 * @param  {Object} req request from front end
 * @param  {Object} res respond to front end
 * @return {Object}
 */
function findSelfOnMainPage(req, res){
	console.log("on main page");
	Users.findOne({userName:req.query.userName}, function(err, user){
		if(!user){
			res.status(400).json("Error: no such user");
		}
		Users.find({userName:{"$in":user._doc.follow}},function(err, followedByCurrent){
			var result = user._doc;
			result.postsOnPage=[];
			console.log(followedByCurrent);
			for(index in followedByCurrent){
				result.postsOnPage=result.postsOnPage.concat(followedByCurrent[index]._doc.posts);
			}
			console.log(result);
			delete result.password;
			return res.json(result);
		})	
	})
}

/**
 * Finds all users by given username key words.
 * If keywords is not given, send all users list to
 * front end.
 * @param  {Object} req request from front end
 * @param  {Object} res respond to front end
 * @return {Object}
 */
function findByNameKeyWords(req, res){
	console.log("finds by user name key words");
	if(req.query.searchName){
		var searchName = req.query.searchName;
	}else{
		var searchName = "";
	}
	Users.find({userName:{$regex:searchName}}, function(err, users){
		var result=[];
		for(index in users){
			result.push({userName:users[index]._doc.userName,
				gender:users[index]._doc.gender,
				introduction:users[index]._doc.introduction});
		}
		console.log(result);
		res.send(result);
	})
}

/** 
 * Handles GET request on \users
 * @param  {Object} req request from front end
 * @param  {Object} res respond to front end
 * @return {Object}
 */
exports.find=function(req, res){
	if(req.query.userName){
		if(req.query.mainPage){
			return findSelfOnMainPage(req, res);
		}else{
			return findByUsername(req, res);
		}
	}else{
		return findByNameKeyWords(req,res);
	}
}
