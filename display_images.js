// display_images.js

// Setting your AWS credentials
AWS.config.update({
  signatureVersion: 'v4',
  accessKeyId: "AKIATSPXKCK44FYCOBGO",
  secretAccessKey: "NN5vopfOq4EiSsGIgKVMpVFJu012n9mCUp64re4g",
  region: "us-east-2"
});

// Creating an S3 client
var s3 = new AWS.S3();

// Setting your bucket name and region
var bucketName = "frameme-architecture";
var region = "us-east-2";

// Getting a reference to the div element where the images will be displayed
var imagesDiv = document.getElementById("images");

// Getting a list of objects from your bucket
s3.listObjects({Bucket: bucketName}, function(err, data) {
  if (err) {
    console.log(err);
    return;
  }

  // Filtering only the image objects by their extensions
  var imageObjects = data.Contents
  // truncated from EOL above .filter(function(object) {
    // return object.Key.endsWith(".jpg") || object.Key.endsWith(".png") || object.Key.endsWith(".jpeg");
  // });

  // Creating an array of image elements from the image objects
  var images = imageObjects.map(function(object) {
    // Creating an image element
    var image = document.createElement("img");

    // Setting its source attribute to a presigned URL of the object
    var params = {Bucket: bucketName, Key: object.Key};
    var url = s3.getSignedUrl("getObject", params);
    image.setAttribute("src", url);

    // Hiding the image by default
    image.style.display = "none";

    // Returning the image element
    return image;
    
   });

   // Appending all the images to the div element 
   images.forEach(function(image) {
     imagesDiv.appendChild(image);
   });

   // Setting a variable to keep track of the current image index
   var currentIndex = -1;

   // Defining a function that shows one image at a time and loops back after showing all images 
   function showNextImage() {
     // Hiding the previous image if any 
     if (currentIndex >=0) {
       images[currentIndex].style.display = "none";
     }

     // Incrementing or resetting the current index 
     currentIndex++;
     if (currentIndex == images.length) {
       currentIndex =0;
     }

     // Showingthe currentimage 
     images[currentIndex].style.display ="block";
     
     // Calling this function again after3 seconds 
     setTimeout(showNextImage,3000);
     
   }

   // Callingthe function forthe firsttime 
   showNextImage();
   
});
