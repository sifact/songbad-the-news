const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();

    displayCategory(data.data.news_category);
};

const displayCategory = (newses) => {
    const newsContainer = document.getElementById("news-container");

    newses.forEach((news) => {
        const newsDiv = document.createElement("div");
        newsDiv.innerHTML = `
		<a onclick="loadCategoryApi(${news.category_id})" class="nav-link text-white" style="cursor:pointer">${news.category_name}</a>
		`;
        newsContainer.appendChild(newsDiv);
    });
};

const loadCategoryApi = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${
        "0" + id
    }`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayCategoryApi(data.data));
};

const displayCategoryApi = (profiles) => {
    const profilesContainer = document.getElementById("cards-container");
    profilesContainer.innerHTML = ``;
    profiles.forEach((profile) => {
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("card");
        profileDiv.classList.add("mb-3");
        profileDiv.classList.add("bg-clr");
        profileDiv.classList.add("light-shadow");
        profileDiv.innerHTML = `
		<div class="row g-0">
		<div class="col-md-3 p-3">
		  <img src="${profile.thumbnail_url}" class="img-fluid rounded-start" alt="...">
		</div>
		<div class="col-md-9">
		  <div class="card-body">
			<h5 class="card-title">${profile.title}</h5>
			<p class="card-text">${profile.details}</p>
			<div class="d-flex">
			<img src="${profile.author.img}" class="img-fluid rounded-circle" alt="..." style="width: 50px">
			<div class="d-flex flex-column ms-3">
				<span><small >${profile.author.name}</small></span>

				<span><small >${profile.author.published_date}</small></span>
			</div>
			</div>
			
			<p class="card-text"></p>
		  </div>
		</div>
		
		
	  </div>
		`;
        profilesContainer.appendChild(profileDiv);
    });
};
loadCategory();
