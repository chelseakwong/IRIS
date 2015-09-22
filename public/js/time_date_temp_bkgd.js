// exports.work = function(){
console.log("in time_date_temp_bkgd.js PUBLIC");

//TIME AND DATE
var places = ['Mamaroneck,NY','Pittsburgh,PA'];
var placesIndex = 0;
var searchResults = [];

function searchImagesImgur(pageNum){
    //fetch images from imgur and return them in list as objects
    $.ajax({
        url: "https://api.imgur.com/3/gallery/search.json",
        type: "GET",
        headers: {
            Authorization: 'Client-ID 88615fd52398ff1',
        },
        data: {
            q_any: "earthporn, cityscape, mountains, lake, ocean,sky,landscape,volcano",
            q_size_px: "lrg",
            sort: "viral",
            page: (Math.round(Math.random()*10)+1)%3
        },
        dataType: "json",
        success: function(json){
            $.each(json.data, function(i, item){
                if (!item.is_album 
                    && (item.topic==="Design & Art" 
                        || item.ups >=10)){
                    var obj = {src: item.link};
                    searchResults.push(obj)}
            })
            $("body").vegas({
                slides: searchResults,
                timer: false,
                delay: 1800000, //half hour
                shuffle: true
            }); 
        }
    });

};

//weather
function updateWeather(location,woeid){
    console.log("update weather")
	$.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(temp) {
    tempHtml = '<i id="img" class="icon-'+temp.code+'"></i> '
      	+'<h2>'+temp.temp+'</h2>'
      	+'<h3>&deg;'+temp.units.temp+'</h3>'
      	+'<h4>'+temp.city+', '+temp.region+'</h4>';
    $("#temp").html(tempHtml);
    foreHtml = '<h3>'+temp.text+'</h3>'
    +"<h3> HI: "+temp.high+"    LO:"+temp.low+"</h3>";
    $("#forecast").html(foreHtml);
        
    },
    error: function(error) {
      $("#temp").html('<p>'+error+'</p>');
    }
	});
};



// PIXABAY
function getImages(){
    var list = []
    var USERNAME = 'chelseakct0';
    var API_KEY = 'b145a5fd4301795bfca9';
    var IMGTYPE = 'photo';
    var ResGroup = "image_details";
    var URL = "https://pixabay.com/api/?username="+USERNAME+"&key="+API_KEY+"&response_group="+encodeURIComponent(ResGroup)+"&q="+encodeURIComponent('landscape cityscape')+"&image_type="+encodeURIComponent(IMGTYPE)+"&orientation="+encodeURIComponent("horizontal")+"&editors_choice"+encodeURIComponent("true")+"&min_width="+encodeURIComponent("1000")+"&min_height="+encodeURIComponent("800");
    $.getJSON(URL, function(data){
        console.log(data);
        if (parseInt(data.totalHits) > 0){
            $.each(data.hits, function(i, hit){
                var obj = {src: hit.webformatURL};
                list.push(obj)})
//            console.log(list);
//            console.log("completed");
//            $(function() {
//                $("body").vegas({
//                    slides: list,
//                    timer: false,
//                    shuffle: true,
//                    delay: 60000,
//                    overlay:true
//                });
//                return list;
//            });
}})};


$(document).ready(function(){
	//date,time
	var now = moment();
	function updateTime(){
		var moment = now.format('hh:mm');
		var date = now.format('MMMM D');
		var apm = now.format('a');
		document.getElementById("date").innerHTML=date;
		document.getElementById("time").innerHTML = moment;
		document.getElementById("apm").innerHTML = apm;
	}
	updateTime();
	var nowUpdate = setInterval(
		function(){
			now = moment();
		}, 50000);
	var tid = setInterval(updateTime,60000);


	updateWeather(places[placesIndex],"");
	var nowUpdateWeather = setInterval(updateWeather,10800000,places[placesIndex],'');
    
    //IMGUR METHOD
    searchImagesImgur();

    //click location and changes it
    $('#temp').on('click', function() {
        placesIndex += 1;
        placesIndex = placesIndex % places.length;
        updateWeather(places[placesIndex],"");
     })
});

// }

