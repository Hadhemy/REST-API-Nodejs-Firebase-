	1	Open firebase, select database on the left hand side.
	2	Now on the right hand side, select [Realtime database] from the dropdown and change the rules to: { "rules": { ".read": true, ".write": true } }
	3	node app.js
	4	Test APIs using postman
	5	make configurations at Header (KEY:Content-Type    VALUE:application/json)
	6	(post) in Body the info : 
	7	{
	8	   “fname”:”aaaaa”,
	9	   “lname”:”tttttttttt”,
	10	   “email”:”nnnnnn@icloud.com”
	11	}
