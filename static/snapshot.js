
var cameraPositions = [
    [0,18,55],
    [55,18,0],
    [0,18,-55],
    [-55,18,0],
    [-36,20,40]
];

var PHOTOINDEX = 0;
var PHOTOS = [];
var strDownloadMime = "image/octet-stream";
var ORIGINALPOSITION = undefined;


function takePhoto(){
    PHOTOS = [];
    var imgData, imgNode;
    ORIGINALPOSITION = CAMERA.position;

    uploadPhoto('');
}

function uploadPhoto(link){
    if (link != ''){
        PHOTOS.push(link);
    }
    if (PHOTOINDEX < cameraPositions.length){
        var cameraPosition = cameraPositions[PHOTOINDEX];

        var maxEdge = parseFloat(HOUSE.size.split('x')[0]);
        var length = parseFloat(HOUSE.size.split('x')[1]);
        if (length > maxEdge){maxEdge = length;}
        maxEdge = maxEdge/12;


        CAMERA.position.set(
            cameraPosition[0] * maxEdge,
            cameraPosition[1] * maxEdge,
            cameraPosition[2] * maxEdge
        )
        console.log(CAMERA.position);

        setTimeout(function(){
            var strMime = "image/jpeg";
            imgData = RENDERER.domElement.toDataURL(strMime);

            PHOTOINDEX += 1
            savePhoto(imgData, uploadPhoto);
            //saveFile(imgData.replace(strMime, strDownloadMime), "test.jpg");
        }, 100);
    } else {
        CAMERA.position.set(ORIGINALPOSITION.x, ORIGINALPOSITION.y, ORIGINALPOSITION.z);
        sendEmail();
    }
}

function savePhoto(imgData, returnFunc) {

    $.ajax({
        type: 'POST',
        //url: "http://sheds.jthiesen1.webfactional.com/api/Base64Upload/",
        url: "http://shedvisualizer.webtekdevelopment.com/savephotos.php",
        data: {data:imgData},
        statusCode: {
            200: function(value) {
                returnFunc(value);
            },
            400: function(value) {
                value = {'error': 'Bad Request'};
            },
            401: function(xhr) {
                console.log(xhr);
            }
        },
    });
}


function sendEmail(){

	var photostoemail = [];
	
    for (var i in PHOTOS){
        var link = PHOTOS[i];
		console.log(link);
        text += '<img width="300" src="http://shedvisualizer.webtekdevelopment.com/'+ link +'" />';
		photostoemail.push(link); // Adding to array to send to email processing
		//console.log(photostoemail);
    }
	
	var data = {data: JSON.stringify(photostoemail)};
    var text = "";
	var url = "http://shedvisualizer.webtekdevelopment.com/sendmail.php";
   // var url = "http://sheds.jthiesen1.webfactional.com/api/email/"; 

    var context = $('.emailcover');

    text += '<br/><b>Customer Contact Information</b>';
    text += '<br/>Name: ' + context.find('[name=first]').val() + ' ' + context.find('[name=last]').val();
    text += '<br/>Email: ' + context.find('[name=email]').val();
    text += '<br/>Phone: ' + context.find('[name=phone]').val();
    text += '<br/><br/>';
    text += '<b>Delivery Information</b>';
    text += '<br/>Delivery Address: ' + context.find('[name=address]').val();
    text += '<br/>Delivery City: ' + context.find('[name=city]').val();
    text += '<br/>Delivery State: ' + context.find('[name=state]').val();
    text += '<br/>Delivery ZIP: ' + context.find('[name=zip]').val();
    text += '<br/>Delivery Accessible: ';
    if (context.find('[name=accessible]').val() == '0'){
        text += 'No';
    } else {
        text += 'Yes';
    }
    text += '<br/>Notes: ' + context.find('[name=notes]').val();

    text += '<br/><br/>';
    text += 'The information below is an estimate only.';
    text += '<br/>Final pricing - including pricing adjustments, discounts, delivery, ';
    text += 'and taxes - will be provided with final quote prior to purchase.';
    text += '<br/><br/>';

    text += $('.totalcost').html();

    data['to_email'] = context.find('[name=email]').val();
    data['text'] = text;
	data['photos'] = PHOTOS;
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        statusCode: {
            200: function(value) {
                console.log(value);
                $('.emailcover .emailContent').hide();
                $('.emailcover .thanksContent').show();
                setTimeout(function(){
                    closeCover();
                }, 4000);
            },
            400: function(value) {
                value = {'error': 'Bad Request'};
                returnFunc(value);
            },
            401: function(xhr) {
                refreshToken(type,url,data,returnFunc);
            }
        },
    });
}