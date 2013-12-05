/*
*  Licensed Materials - Property of IBM
*  5725-G92 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
*  US Government Users Restricted Rights - Use, duplication or
*  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

var userDetails;
var USERS = "users";
var EMPLOYEES = "employees";
var collections ={};

function wlCommonInit(){

	$("#AppBody").load("pages/login.html", function(){
		//WL.logger.debug("loaded index page");
	});
}


function login(){

	var userName = $('#txtUserName').val();
	var userPwd = $('#txtPassword').val();
	writeToconsole(userName+userPwd);
	
	if(userName == '' || userPwd == '' || userName == null || userPwd == null){
		showErrorMessage();
	}else{
		//Create the optional options object passed to init
		var options = {};
		options.username = userName;
		options.password = userPwd;
		
		/*userDetails = {
				adapter : "empSQLAdapter",
				procedure : "getUserDetails",
				parameters : [userName]
		};
		
		WL.Client.invokeProcedure(userDetails, {
			onSuccess: validateloggedUser, 
			onFailure: showError
		});*/
		
		collections[USERS] = {
				searchFields : { name: 'string' },
				adapter : {
					name : 'offlineDataAdapter',
					add: 'addData',
					remove: 'deleteData',
					replace: 'updateData',
					load:{
						procedure : 'getOfflineData',
						params: [],
						key : 'people'
					}
				}
				};
		
		//Initialize the people collection
		WL.JSONStore.init(collections, options).then(
				function(){
					WL.Logger.debug("Initializing");
					WL.JSONStore.get(USERS).load().then(function(res){
								writeToconsole("Load Success: "+res);
								getJSONStoreData(userName);
								//getEmployees(userName,userPwd);
							}).fail(function(errorObj){
								writeToconsole("Load Failed: "+errorObj.msg);
							});
				}).fail(
						function(errorObj){
							writeToconsole("Initializing Failed: "+errorObj.msg);
							showErrorMessage();
						});
	}
}

function getJSONStoreData(userName){
	var query = {};
	var options = {exact: true};
	query.name = userName;
	WL.JSONStore.get(USERS).find(query,options).then(function (result){
		writeToconsole("Search success");
		writeToconsole(result);
		validateUser(result);
	}).fail(function (errorObject){
		writeToconsole("Search failed");
		writeToconsole(errorObject.msg);
		showErrorMessage();
		destroyJsonStore();
	});
}

function validateUser(result){
	if(result.length > 0){
		userDetails = result[0].json;
		showTaskList();
	}else{
		showErrorMessage();
		destroyJsonStore();
	}
}

function showErrorMessage(){
	$("#message").text("Invalid UserName/Password");
}

function writeToconsole(message){
	//WL.Logger.debug(message);
	WL.Logger.ctx({stringify: true, pretty: true}).info(message);
}

function logout(){
	destroyJsonStore();
	$("#AppBody").load("pages/login.html", function(){
	});
}

function destroyJsonStore(){
	WL.JSONStore.destroy().then(function(){
		writeToconsole("JSONStore Destroyed.");
	}).fail(function(errorObj){
		writeToconsole("JSONStote Object not found : "+errorObj.msg);
	});
}

function showTaskList(){
	$("#AppBody").load("pages/tasklist.html", function(){
		loadDetails();
	});
}



function loadDetails(){
	var query = {};
	var options = {exact: true};
	query.name = WL.JSONStore.get(USERS).username;
	WL.JSONStore.get(USERS).find(query,options).then(function (result){
		var userDetails = result[0].json;
		$("#taskDetailsDiv").text("");
		userDetails.complaints.forEach(function(comp){
			$("#taskDetailsDiv").append("<div id='taskOverviewDiv'><div><a href='#' data-transition='slide' onclick='getComplaintDetails("+comp.comp_id+");'>"+comp.comp_id+":"+comp.appliance_type+"</a></div><div>"+comp.description+"</div></div>");
		});
		
	}).fail(function (errorObject){
		writeToconsole("Search failed");
		writeToconsole(errorObject.msg);
	});
}

function getComplaintDetails(id){
	$("#AppBody").load("pages/taskdetails.html", function(){
		var query = {};
		var options = {exact: true};
		query.name = WL.JSONStore.get(USERS).username;
		WL.JSONStore.get(USERS).find(query,options).then(function (result){
			var userDetails = result[0].json;
			var collection_id = result[0]._id;
			$("#taskDetailsDiv").text("");
			$("#collectionid").val(collection_id);
			userDetails.complaints.forEach(function(comp){
				if(comp.comp_id == id){
					$("#taskDetailsDiv").append("<div>"+comp.appliance_type+"</div><div>"+comp.description+"</div>");
					$("#taskremarks").val(comp.remark);
					$("#compid").val(id);
					$("#compStatus").val(comp.status);
					$("#ownerAddress").append("<div>"+comp.customer.name+"</div>");
					$("#ownerAddress").append("<div>"+comp.customer.email+"</div>");
					$("#ownerAddress").append("<div>"+comp.customer.address+"</div>");
					$("#ownerAddress").append("<div>"+comp.customer.phone+"</div>");
				}
			});
			
		}).fail(function (errorObject){
			writeToconsole("Search failed");
			writeToconsole(errorObject.msg);
		});
		
	});
}

function saveDetails(){
	var remarkAdded = $("#taskremarks").val();
	var statusSelected = $("#compStatus").val();
	var id = $("#compid").val();
	var collection_id = $("#collectionid").val();
	userDetails.complaints.forEach(function(comp){
		if(comp.comp_id == id){
			comp.remark = remarkAdded;
			comp.status = statusSelected;
		}
	});
	
	var doc = {_id: collection_id, json: {}};
	doc.json = userDetails;
	WL.JSONStore.get(USERS).replace(doc).then(function (result) {
		writeToconsole("Data Updated: "+result);
	}).fail(function (errorObject) {
		writeToconsole("Fail to Update: "+errorObject.msg);
	});
}


function syncChanges(){
	WL.JSONStore.get(USERS).push().then(function(result){
		writeToconsole("Push operation successful: "+result);
	}).fail(function(error){
		writeToconsole("Push operation failed: "+error.msg);
	});
}

function goToChangePasswordPage(){
	$("#AppBody").load("pages/changepwd.html", function(){
		$('#txtUserName').val(WL.JSONStore.get(USERS).username);
	});
}

function changePassword(){
	var oldPassword = $('#txtOldPwd').val();
	var newPassword = $('#txtNewPwd').val();
	WL.JSONStore.changePassword(oldPassword, newPassword, WL.JSONStore.get(USERS).username).then(function(){
		$("#message").text("Password Changed.");
	}).fail(function(){
		$("#message").text("Please re-enter your old password.");
	});
}

function showError(){
	writeToconsole("Error in fetching the deatils");
	userDetails = {
			adapter : "offlineDataAdapter",
			procedure : "getOfflineData",
			parameters : []
	};
	
	WL.Client.invokeProcedure(userDetails, {
		onFailure: goToErrorPage,
		onSuccess:validateUser
	});
}

function goToErrorPage(){
	$("#AppBody").load("pages/error.html", function(){
	});
}

function getEmployees(userName,userPwd){
	var options = {};
	var colle = {};
	options.username = userName;
	options.password = userPwd;
	colle[EMPLOYEES] = {
			searchFields : { 'emp_name': 'string', 'emp_roll_number': 'string'},
			adapter : {
				name : 'empSQLAdapter',
				load:{
					procedure : 'getUserDetails',
					params: [],
					key: 'resultSet'
				}
			}
			};
	
	//Initialize the people collection
	WL.JSONStore.init(colle, options).then(
			function(){
				WL.Logger.debug("Initializing");
				WL.JSONStore.get(EMPLOYEES).load().then(function(res){
							writeToconsole("Load Success: "+res);
						}).fail(function(errorObj){
							writeToconsole("Load Failed: "+errorObj.msg);
						});
			}).fail(
					function(errorObj){
						writeToconsole("Initializing Failed: "+errorObj.msg);
					});
}

