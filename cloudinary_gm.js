var fs = require('fs')
	, cloudinary = require('cloudinary')
	, sizeOf = require('image-size')
  , gm = require('gm');

var clSmall_O = "/img/small/battlefield4.jpg"
  , clSmall_R = "/img/small/temp/clgm_small.jpg";

var clMedium_O = "/img/medium/Spec_Ops_The_Line.png"
  , clMedium_R = "/img/medium/temp/clgm_medium.jpg";

var clLarge_O = "/img/large/108Wing.jpg"
  , clLarge_R = "/img/large/temp/clgm_large.jpg";

var clHuge_O = "/img/huge/Pizigani_Chart.jpg"
  , clHuge_R = "/img/huge/temp/clgm_huge.jpg";

// Cloudinary Config
cloudinary.config({ 
  cloud_name: "friendzy", 
  api_key: "915397476822254", 
  api_secret: "YaikBH5Wf-RJkqkn2Y8MsF_qEsI" 
});

function clImgProcess(clImgPath, clResizePath, size) {
	console.time(size);
	var imgPath = __dirname + clImgPath
    , resizePath = __dirname + clResizePath;

	// Image Size with Aspect Ratio
  var dimensions = sizeOf(imgPath);
  var ratio = Math.min(1200 / dimensions.width, 630 / dimensions.height);
  if (dimensions.width * ratio < 1200) {
    var nWidth = 1200, nHeight = 630;
  } else {
    var nWidth = dimensions.width * ratio, nHeight = dimensions.height * ratio;
  };

  gm(imgPath)
    .resize(nWidth, nHeight)
    .noProfile()
    .autoOrient()
    .write(resizePath, function (err) {
      cloudinary.uploader.upload(resizePath, function(result) { console.log(result); console.timeEnd(size); },
      {
        eager: [
          { angle: "auto", format: "jpg", quality: "jpegmini" }                                   
        ]
      });
    });
}

function cl_Small(imgPath, resizePath) {
	clImgProcess(imgPath, resizePath, "CL Small");
}

function cl_Medium(imgPath, resizePath) {
	clImgProcess(imgPath, resizePath, "CL Medium");
}

function cl_Large(imgPath, resizePath) {
	clImgProcess(imgPath, resizePath, "CL Large");
}

function cl_Huge(imgPath, resizePath) {
	clImgProcess(imgPath, resizePath, "CL Huge");
}

cl_Small(clSmall_O, clSmall_R);
cl_Medium(clMedium_O, clMedium_R);
cl_Large(clLarge_O, clLarge_R);
cl_Huge(clHuge_O, clHuge_R);