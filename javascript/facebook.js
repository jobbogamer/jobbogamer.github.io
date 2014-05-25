window.fbAsyncInit = function() {
	FB.init({
		appId	: '700174693381750',
		xfbml	: true,
		version	: 'v2.0'
	});
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function sharePage(url) {
	
	url = url.substring(0, url.length - 1);
	console.log(url);

	FB.ui(
		{
			method: 'share_open_graph',
			href: url,
		}
	);
}