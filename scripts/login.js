// var date = new Date();
// date.setDate(date.getDate() + 5);


$(document).ready(function(){


	$("#button").click(function(){
        var username=$("#userId").val();
        var password=$("#passWord").val();
        if (username=="" | password==""){
        	alert("username or password cannot be empty");
        }else{
        $.ajax({
	        url:"/login",
	        type:"POST",
	        dataType:"JSON",
	    	contentType:"application/json; charset=utf-8",
	    	data:JSON.stringify({
				"userName":username,
				"password":password
			}),
	    	success:function(response){
				$.getScript("./scripts/main.js", function() {
					createCookie(username);
				});
				var isadmin = response[1];
				$.getScript("./scripts/main.js", function() {
					createIsAdminCookie(response);
				});
			// document.cookie = "curUser=" + username + ";expires="
				// 								+ date.toUTCString();
				if (response[1]) window.location = "./Admin.html";
				else window.location = "./CustomerIndex.html";
	    		// window.location = "./CustomerIndex.html?username="+username;
            },
            error:function(xhr){
            	alert(xhr.responseText);
            }
	    });
    	}

    });


})
