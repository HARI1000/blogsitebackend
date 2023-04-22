const express=require('express');
const app = express();
const dotenv= require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoriesRoute =require("./routes/categories");
const multer= require("multer");
const path =require("path");
var cors = require('cors')
app.use(cors())
dotenv.config();


// app.use is a method in Express.js that adds middleware to the application's request handling pipeline.
// "/images" is the URL path that will be used to access the static files. For example, if the image is named "my-image.jpg" and is located in the "/images" directory, it can be accessed at "http://example.com/images/my-image.jpg".
// express.static is a built-in middleware function in Express.js that serves static files. It takes one argument, which is the directory from which to serve the files.
// path.join(__dirname, "/images") is used to construct an absolute path to the "/images" directory relative to the current file's directory. __dirname is a global variable in Node.js that represents the absolute path of the directory that contains the currently executing file.
// So, when a client makes a request to the specified URL path (e.g. "http://example.com/images/my-image.jpg"), the express.static middleware will look for the file in the "/images" directory and serve it back to the client if it exists
app.use("/images",express.static(path.join(__dirname,"/images")))

app.use(express.json());
//it tells the app to json object format inside body must be enamble for json post
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('connected successfully');}).catch((err)=>{console.log(err);});

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,"images")},
    filename:(req,file,cb)=>{cb(null,req.body.name)}
});

const upload = multer({storage:storage});
 
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File sent successfully");
})

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoriesRoute);
app.listen("5000",() => {
    console.log("Hi it is running");
})


////////////////////////////////////////////////////////////////////////////////////////////////
//docs
// app.use() is a method in the Express.js framework used to mount middleware functions at a specified path. Middleware functions are functions that execute in between processing an incoming request and sending a response back to the client. They can perform tasks such as logging, parsing request bodies, and authenticating users.

// Here's an example of how app.use() can be used in an Express.js application:

//Example
// const express = require('express');
// const app = express();

// // Middleware function
// const logRequests = (req, res, next) => {
//   console.log(`Request received: ${req.method} ${req.url}`);
//   next();
// }

// // Mounting the middleware function at a specific path
// app.use('/api', logRequests);

// // Route handler
// app.get('/api/users', (req, res) => {
//   res.send('List of users');
// });

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });
// In this example, we define a middleware function logRequests that logs the details of the incoming request to the console. We then mount this middleware function to the /api path using app.use(). This means that any requests to routes that start with /api will execute this middleware function before proceeding to the route handler.

// Finally, we define a route handler for the /api/users path that simply sends a response back to the client. When a request is made to /api/users, the logRequests middleware function is executed first, followed by the route handler.