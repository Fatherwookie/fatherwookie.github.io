// Setting your AWS credentials and region
AWS.config.update({
  accessKeyId: "AKIATSPXKCK44FYCOBGO",
  secretAccessKey: "NN5vopfOq4EiSsGIgKVMpVFJu012n9mCUp64re4g",
  region: "us-east-2"
});

// Creating a new S3 object
var s3 = new AWS.S3();

// Setting your bucket name and region
var bucketName = "frameme-architecture";

// Getting a reference to the HTML element with the id "images"
var imagesDiv = document.getElementById("images");

// Checking if imagesDiv is null
if (imagesDiv == null) {
  // Handling the error
  console.log("Error: imagesDiv is null");
} else {
  // Listing all objects in your bucket
  s3.listObjects({Bucket: 'frameme-architecture'}, function(err, data) {
    // Checking if there is an error
    if (err) {
      // Handling the error
      console.log("Error:", err);
    } else {
      // Looping through all objects in your bucket
      for (var i = 0; i < data.Contents.length; i++) {
        // Getting the object key (name)
        var objectKey = data.Contents[i].Key;
        // Creating a new image element
        var image = document.createElement('img');
        // Setting the image source to be a signed URL of your object
        image.src = s3.getSignedUrl('getObject', {Bucket: 'frameme-architecture', Key: objectKey});
        // Appending the image element to imagesDiv
        imagesDiv.appendChild(image);
      }
    }
  });
}
