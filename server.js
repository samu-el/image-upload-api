const mongoose = require('mongoose'); 
const app = require('./app');

//set port to 3000 if it is not provided
var port = process.env.PORT || 3000;
var mongoUrl = process.env.DB;

//connect to mongodb using the url provided by the environment variables
//if url is empty exit with status code 1
if(mongoUrl !== "") {
    mongoose.connect(mongoUrl);
} else {
    console.error("Database url not provided");
    process.exit(1);
}

//start the server and listen on the specified port
app.listen(port, ()=>{
    console.log("server started at port " + port);
});