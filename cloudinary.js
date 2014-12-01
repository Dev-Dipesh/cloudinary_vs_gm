var fs = require('fs')
	, cloudinary = require('cloudinary')
	, sizeOf = require('image-size');

var clSmall = "/img/small/battlefield4.jpg"
	, clMedium = "/img/medium/Spec_Ops_The_Line.png"
	, clLarge = "/img/large/108Wing.jpg"
	, clHuge = "/img/huge/Pizigani_Chart.jpg";

// Cloudinary Config
cloudinary.config({ 
  cloud_name: "friendzy", 
  api_key: "915397476822254", 
  api_secret: "YaikBH5Wf-RJkqkn2Y8MsF_qEsI" 
});

function clImgProcess(clImgPath, size) {
	console.time(size);
	var imgPath = __dirname + clImgPath;

	// Image Size with Aspect Ratio
  var dimensions = sizeOf(imgPath);
  var ratio = Math.min(1200 / dimensions.width, 630 / dimensions.height);
  if (dimensions.width * ratio < 1200) {
    var nWidth = 1200, nHeight = 630;
  } else {
    var nWidth = dimensions.width * ratio, nHeight = dimensions.height * ratio;
  };

	cloudinary.uploader.upload(imgPath, function(result) { console.log(result); console.timeEnd(size); },
  {
    eager: [
      { width: nWidth, height: nHeight, 
      angle: "auto", format: "jpg", quality: "jpegmini" }                                   
    ]
  });
}

function cl_Small(imgPath) {
	clImgProcess(imgPath, "CL Small");
}

function cl_Medium(imgPath) {
	clImgProcess(imgPath, "CL Medium");
}

function cl_Large(imgPath) {
	clImgProcess(imgPath, "CL Large");
}

function cl_Huge(imgPath) {
	clImgProcess(imgPath, "CL Huge");
}

cl_Small(clSmall);
cl_Medium(clMedium);
cl_Large(clLarge);
cl_Huge(clHuge);