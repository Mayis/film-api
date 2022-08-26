request("GET", apiUrl).then((result) => {
	result.results.forEach((val) => {
		showMovie(val);
	});
});

function showMovie(movie) {
	try {
		let moviePart = document.getElementById("main");
		let mov = document.createElement("div");
		mov.setAttribute("class", "movieDiv");
		mov.dataset.aos = "zoom-in";
		moviePart.appendChild(mov);
		mov.innerHTML = `
				<div class="imgDiv">
					<img src="${imgUrl + movie.poster_path}" alt="image-movie" class="movieImg" />
				</div>
                <div class="rateDiv"     style="background-color: ${rateColor(
									movie.vote_average
								)}" >
					<p class="rateP">${movie.vote_average}</p>
				</div>
				<div class="movieNameDiv">
					<p class="movieNameP">${movie.title}</p>
				</div>
    `;
		mov.addEventListener("click", (e) => {
			location.href = "../html/movie.html?id=" + movie.id;
		});
	} catch (error) {
		console.log("error");
	}
}

function rateColor(num) {
	if (num > 4 && num < 7) {
		return "orange";
	} else if (num >= 0 && num < 4) {
		return "red";
	} else {
		return "green";
	}
}

function searchFun() {
	try {
		let searchInput = document.querySelector("#search");
		searchInput.addEventListener("keyup", (e) => {
			if (e.key === "Enter" || e.keyCode === 13) {
				let searchWord = searchInput.value;
				let getDiv = document.querySelector("#main");
				getDiv.innerHTML = "";
				if (searchWord) {
					request("GET", searchUrl + "&query=" + searchWord).then((result) => {
						if (result.results.length === 0) {
							getDiv.innerHTML = `<h1 style="margin:120px;font-family:monospace;">sorry there is no film</h1>`;
						}
						result.results.forEach((val) => {
							showMovie(val);
						});
					});
				} else if (!searchWord) {
					request("GET", apiUrl).then((result) => {
						result.results.forEach((val) => {
							showMovie(val);
						});
					});
				}
			}
		});
	} catch (error) {
		console.log(error);
	}
}
searchFun();

function menuAnimation() {
	let getmenu = document.querySelector(".menuDiv");
	let openMenu = document.querySelector(".menuElements");
	getmenu.addEventListener("click", (e) => {
		openMenu.style.display = "grid";
		openMenu.style.animation = "fadeInDown  .7s";
	});
	let closeIcon = document.querySelector("#closeIcon");
	closeIcon.addEventListener("click", () => {
		openMenu.style.animation = "fadeOutUp .7s";
		setTimeout(() => {
			openMenu.style.display = "none";
		}, 680);
	});
}
menuAnimation();

createMenu(ganre);

function createMenu(some) {
	try {
		let fullMenu = document.querySelector(".menuElements");
		some.forEach((val) => {
			let menuItem = document.createElement("p");
			menuItem.setAttribute("class", "menu-item");
			menuItem.id = val.id;
			fullMenu.appendChild(menuItem);
			menuItem.innerHTML = val.name;
			menuItem.addEventListener("click", (e) => {
				Array.from(document.getElementsByClassName("menu-item")).forEach(
					(val) => (val.style.color = "black")
				);
				e.target.style.color = "#FF3600";
				console.log(val.id);

				let moviePart = document.getElementById("main");
				moviePart.innerHTML = "";
				request("GET", ganreUrl + val.id).then((result) => {
					result.results.forEach((val) => {
						showMovie(val);
					});
				});
			});
		});
	} catch (error) {
		console.log("error in create menu");
	}
}
function logoRefresh() {
	try {
		let logo = document.querySelector(".logoDiv");
		logo.addEventListener("click", (e) => {
			if (location.href.includes("movie")) {
				location.href = "../index.html";
			} else {
				location.reload();
			}
		});
	} catch (error) {
		console.log("error in main logo");
	}
}
logoRefresh();
