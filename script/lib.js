const apiKey = "api_key=f7d65e059593a0f3812fa8f984d7cb57";
const baseUrl = "https://api.themoviedb.org/3";
const apiUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imgUrl = "https://image.tmdb.org/t/p/w500";
const searchUrl = baseUrl + "/search/movie?" + apiKey;
let ganreUrl = apiUrl + "&with_genres=";
let videoUrl = "https://www.youtube.com/embed/";
const ganre = [
	{ id: 28, name: "Action" },
	{ id: 12, name: "Adventure" },
	{ id: 16, name: "Animation" },
	{ id: 35, name: "Comedy" },
	{ id: 80, name: "Crime" },
	{ id: 99, name: "Documentary" },
	{ id: 18, name: "Drama" },
	{ id: 10751, name: "Family" },
	{ id: 14, name: "Fantasy" },
	{ id: 36, name: "History" },
	{ id: 27, name: "Horror" },
	{ id: 10402, name: "Music" },
	{ id: 9648, name: "Mystery" },
	{ id: 10749, name: "Romance" },
	{ id: 878, name: "Science Fiction" },
	{ id: 10770, name: "TV Movie" },
	{ id: 53, name: "Thriller" },
	{ id: 10752, name: "War" },
	{ id: 37, name: "Western" }
];

function request(method, url) {
	return new Promise((resolve, reject) => {
		let ajax = new XMLHttpRequest();
		ajax.open(method, url);
		ajax.send();
		loading("flex");
		ajax.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				loading("none");
				resolve(JSON.parse(this.responseText));
			}
		};
	});
}
function loading(display) {
	let loadDiv = document.querySelector(".loadingDiv");
	loadDiv.style.display = `${display}`;
}
