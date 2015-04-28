(function () {
	"use strict";
	var main = function () {
		var apikey = "qb9c44s7qjv8ta6jacnhrdqx",
			baseUrl = "http://api.rottentomatoes.com/api/public/v1.0",
			// construct the uri with our apikey
			moviesSearchUrl = baseUrl + '/movies.json?apikey=' + apikey,
            moviesInTheatersUrl = baseUrl + '/lists/movies/in_theaters.json?apikey=' + apikey,
			query = "";
      
      //  AJAX/JSON query on event
      //  Search for a movie
		$('#buttonSearch').on('click', function () {
			query = $('#movieSearch').val();
			// send off the query
			$.ajax({
				url: moviesSearchUrl + '&q=' + encodeURI(query),
				dataType: "jsonp",
				success: searchCallback
			});
		});
          
          
		// callback for when we get back the results
		function searchCallback(data) {
			$('#content').empty();
			$('#content').append('<p>Found ' + data.total + ' results for ' + query + '</p>');
			var movies = data.movies;
			$.each(movies, function (index, movie) {
                $('#content').append('<div class="movieBox"><a href="' + movie.links.alternate + '" target="_blank">' + movie.title + '<img src="http://img.omdbapi.com/?i=tt' + movie.alternate_ids.imdb + '&r=json&apikey=a3fbcd1c&" /></a></div>');
			});
		};
      
      
      //  AJAX/JSON query on event
      //  Show current movies
      $('#inTheaters').on('click', function () {
        $.ajax({
          url: moviesInTheatersUrl,
          dataType: "jsonp",
          success: inTheatersCallback
        });
      });
      //  callback for inTheaters
      function inTheatersCallback(data) {
			$('#content').empty();
			$('#content').append('<p>Found ' + data.movies.length + ' movies playing now.</p>');
			var movies = data.movies;
			$.each(movies, function (index, movie) {
                $('#content').append('<div class="movieBox"><a href="' + movie.links.alternate + '" target="_blank">' + movie.title + '<br /><img src="' + movie.posters.thumbnail + '" /></a></div>');
			});
      } ;
      

      
	};
	$(document).ready(main);
}());