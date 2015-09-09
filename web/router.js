//gets the has information when the page loads to have something to compate to.
	var current_location = window.location.hash.substring(1);
	function route(hash){
		try{
			window.routes[hash]();
		}catch(e){
			defaultRoute();
		}
	}
	//location checker to check the current location vs what was stored in the global var
	function locationCheck(){
		var hash = window.location.hash.substring(1);
		if (hash != window.current_location){
			window.current_location = hash;
			route(hash);
		}
	}