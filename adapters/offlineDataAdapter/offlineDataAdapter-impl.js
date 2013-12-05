/*
 *  Licensed Materials - Property of IBM
 *  5725-G92 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *  	
 *  	// Optional 
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "javascript", "plain", "xml", "html"  
 *  	returnedContentEncoding : 'encoding', 
 *  	parameters: {name1: value1, ... }, 
 *  	headers: {name1: value1, ... }, 
 *  	cookies: {name1: value1, ... }, 
 *  	body: { 
 *  		contentType: 'text/xml; charset=utf-8' or similar value, 
 *  		content: stringValue 
 *  	}, 
 *  	transformation: { 
 *  		type: 'default', or 'xslFile', 
 *  		xslFile: fileName 
 *  	} 
 *  } 
 */

/**
 * 
 * @returns json list of items
 */
function getOfflineData() {
		
	/*var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : 'userInputRequired'
	};
	
	
	return WL.Server.invokeHttp(input);*/
	var data = {people: [{eng_id: 11,name: "John",email: "john@yahoo.com",phone: 1234567890,complaints: [{comp_id: 11,appliance_type: "Samsaung LED 32 inch",description: "A white line across the screen",remark: "",status: "assigned",customer: {custid: 11,name: "John",email: "john@yahoo.com",address: "address_john",phone: 1234567890}},{comp_id: 22,appliance_type: "Sony Bravia 32 inch",description: "Screen is blinking after 5 minutes",remark: "",status: "assigned",customer: {custid: 33,name: "Samual",email: "samual@yahoo.com",address: "address_john",phone: 1234567890}},{comp_id: 33,appliance_type: "Sony Bravia 32 inch",description: "Dark dots in the middle of the screen",remark: "LCD panel replaced",status: "addressed",customer: {custid: 22,name: "Sam",email: "sam@yahoo.co",address: "address_john",phone: 1234567890}}]},{eng_id: 11,name: "Sam",email: "sam@yahoo.com",phone: 1234567890,complaints: [{comp_id: 44,appliance_type: "Samsaung LED 40 inch",description: "A white line across the screen",remark: "TV replaced",status: "closed",customer: {custid: 44,name: "John",email: "john@yahoo.com",address: "address_john",phone: 1234567890}},{comp_id: 55,appliance_type: "Sony Bravia 32 inch",description: "Screen is blinking after 5 minutes",remark: "",status: "assigned",customer: {custid: 66,name: "Samual",email: "samual@yahoo.com",address: "address_john",phone: 1234567890}},{comp_id: 66,appliance_type: "Sony Bravia 32 inch",description: "Dark dots in the middle of the screen",remark: "LCD panel replaced",status: "addressed",customer: {custid: 77,name: "Sam",email: "sam@yahoo.co",address: "address_john",phone: 1234567890}}]}]};
	WL.Logger.debug('OfflineDataAdapter: procedure: getOfflineData() called.');
	WL.Logger.debug('Sending data: ' + JSON.stringify(data));
	return data;
}

function addData(param1) {
	var data = {message: "Data Added"};
	return data;
}


function updateData(saveData) {
	var data = {message: "Data Saved", incommingData : JSON.parse(saveData)};
	return data;
}


function deleteData(param1) {
	var data = {message: "Data Deleted"};
	return data;
}


