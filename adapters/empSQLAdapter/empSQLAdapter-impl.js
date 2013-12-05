/*
 *  Licensed Materials - Property of IBM
 *  5725-G92 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/************************************************************************
 * Implementation code for procedure - 'procedure1'
 *
 *
 * @return - invocationResult
 */
 
var getUserDetailsStatement = WL.Server.createSQLStatement("select * from employee");
function getUserDetails() {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getUserDetailsStatement
	});
}

