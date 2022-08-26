function getActors() {
	let selectedId = location.search.split("=")[1];
	request(
		"GET",
		`
    https://api.themoviedb.org/3/movie/${selectedId}/credits?${apiKey}`
	).then((result) => {
		// console.log(result.cast);
		showActors(result.cast);
	});
}
getActors();
// ${imgUrl + act.profile_path}
function showActors(actor) {
	try {
		let actorsParentDiv = document.querySelector(".swiper-wrapper");
		actor.forEach((act) => {
			let oneActorDiv = document.createElement("div");
			oneActorDiv.setAttribute("class", "swiper-slide");
			actorsParentDiv.appendChild(oneActorDiv);
			oneActorDiv.innerHTML = `
			<div class="imgDivSlide">
							<img src="${
								act.profile_path
									? imgUrl + act.profile_path
									: "../css/imageNotFound.jpg"
							}" alt="" class="imgact">
						</div>
						<h1 class="actorNameH1">${act.original_name}</h1>
		`;
		});
	} catch (error) {
		console.log("there is error in printing actors");
	}
}

function showMovies() {
	let selectedId = location.search.split("=")[1];
	request(
		"GET",
		`
    https://api.themoviedb.org/3/movie/${selectedId}?${apiKey}`
	).then((result) => {
		// console.log(result);
		printMovie(result);
	});
}
showMovies();

function printMovie(movie) {
	let mainPart = document.querySelector("#movieMain");
	mainPart.innerHTML = `
            <div class="backDiv" style ="background-image:url(${
							imgUrl + movie.backdrop_path
						})"></div>
            
    	    <div class="chosenMovieImg">
			     <img src="${imgUrl + movie.poster_path}" alt="movieImg" class="chosenImg"> 
			</div>
			<div class="aboutChosenMovie">
				<h1 class="chosenName">${movie.title}</h1>
				<p class="chosenGanre">${movie.genres[0].name}</p>
				<div class="someListAndWatch">
					<i class="fa-solid fa-heart" class="groupicon"></i>
					<i class="fa-solid fa-star" class="groupicon"></i>
					<i class="fa-solid fa-flag" class="groupicon"></i>
					<div class="playDiv" onClick="popUpOpen()">
						<i class="fa-solid fa-play"></i>
						<p class="playp" >Watch Trailer</p>
					</div>
				</div>
				<div class="overviewDiv">
					<h3 class="overviewh3">Overwiew</h3>
					<p class="movieOverview">
						${movie.overview}
					</p>
				</div>
    `;
}

function popUpOpen() {
	let popUp = document.querySelector(".popUp");
	popUp.style.display = "flex";
	popUp.style.animation = "zoomIn .3s";
}
function closePopUp() {
	let popUp = document.querySelector(".popUp");
	let closeButton = document
		.querySelector("#closePopUp")
		.addEventListener("click", (e) => {
			setTimeout(() => {
				popUp.style.display = "none";
			}, 350);

			popUp.style.animation = "zoomOut .4s";
		});
}
closePopUp();

function getTrailerVideo() {
	let selectedId = location.search.split("=")[1];
	request(
		"GET",
		`
    https://api.themoviedb.org/3/movie/${selectedId}/videos?${apiKey}`
	).then((result) => {
		console.log(result);
		printVideo(result.results[0].key);
	});
}
getTrailerVideo();

function printVideo(video) {
	let videoDiv = document.querySelector(".videoDiv");
	videoDiv.innerHTML = `
	<iframe width="100%" height="100%" src="${
		videoUrl + video
	}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;
}
