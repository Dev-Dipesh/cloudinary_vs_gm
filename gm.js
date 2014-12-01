var fs = require('fs')
  , gm = require('gm')
  , knox = require('knox')
  , async = require('async');

var s3 = knox.createClient({
  key: "AKIAJQ3GHAUU4RNIT75Q",
  secret: "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",
  bucket: "s3gm"
});

var gmSmall_O = "/img/small/battlefield4.jpg"
	, gmSmall_R = "/img/small/temp/gm_small.jpg";

var gmMedium_O = "/img/medium/Spec_Ops_The_Line.png"
	, gmMedium_R = "/img/medium/temp/gm_medium.jpg";

var gmLarge_O = "/img/large/108Wing.jpg"
	, gmLarge_R = "/img/large/temp/gm_large.jpg";

var gmHuge_O = "/img/huge/Pizigani_Chart.jpg"
	, gmHuge_R = "/img/huge/temp/gm_huge.jpg";


function gmImgProcess(gmImgPath, gmResizePath, size, callback) {
	console.time(size);
	var imgPath = __dirname + gmImgPath
			resizePath = __dirname + gmResizePath;
	var s3Headers = {
  	'Content-Type': 'image/jpg',
  	'x-amz-acl': 'public-read'
	};
	console.log(imgPath);
	gm(imgPath).size(function(err, img) {
		var ratio = Math.min(1200 / img.width, 630 / img.height);
	  if (img.width * ratio < 1200) {
	    var nWidth = 1200, nHeight = 630;
	  } else {
	    var nWidth = img.width * ratio, nHeight = img.height * ratio;
	  }
		gm(imgPath)
		.resize(nWidth, nHeight)
		.noProfile()
		.autoOrient()
		.write(resizePath, function (err) {
			if (!err) {
				s3.putFile(resizePath, resizePath.split('/').pop(), s3Headers, function (error, s3response) {
					if (!error) console.log(s3response.req.url);
			  	else console.log(error);
			  	console.timeEnd(size);
			  	return;
				});
			}
		  else console.log(err);
		});
	});
}

async.series([
	function gmSmall(callback) {
		gmImgProcess(gmSmall_O, gmSmall_R, "GM Small", function(err) {
			if(!err) callback(null, 'gmSmall');
		});
	},

	function gmMedium(callback) {
		gmImgProcess(gmMedium_O, gmMedium_R, "GM Medium", function(err) {
			if(!err) callback(null, 'gmMedium');
		});
	},

	function gmLarge(callback) {
		gmImgProcess(gmLarge_O, gmLarge_R, "GM Large", function(err) {
			if(!err) callback(null, 'gmLarge');
		});
	},

	function gmHuge(callback) {
		gmImgProcess(gmHuge_O, gmHuge_R, "GM Huge", function(err) {
			if(!err) callback(null, 'gmHuge');
		});
	},
],
function(err, results){
  console.log(err, results);
});