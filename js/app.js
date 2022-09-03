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
		<a onclick="loadCategoryNews(${news.category_id})" class="nav-link text-white" style="cursor:pointer">${news.category_name}</a>
		`;
        newsContainer.appendChild(newsDiv);
    });
};

const loadCategoryNews = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${
        "0" + id
    }`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayCategoryNews(data.data));
};

const displayCategoryNews = (profiles) => {
    const profilesContainer = document.getElementById("cards-container");
    profilesContainer.innerHTML = ``;
    profiles.forEach((profile) => {
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("card", "mb-3", "bg-clr", "light-shadow");

        profileDiv.innerHTML = `
		<div onclick="loadNewsDetails('${
            profile._id
        }')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="row g-0">
		<div class="col-md-3 p-3">
		  <img src="${profile.thumbnail_url}" class="img-fluid rounded-start" alt="...">
		</div>
		<div class="col-md-9">
		  <div class="card-body">
			<h5 class="card-title">${profile.title}</h5>
			<p class="card-text mt-3">${profile.details.slice(0, 500)} ...</p>
			<div class="d-flex justify-content-between mt-3">
			<div class="d-flex">
			<img src="${
                profile.author.img
            }" class="img-fluid rounded-circle" alt="..." style="width: 50px">
			<div class="d-flex flex-column ms-3 justify-content-center">
				<span><small >${profile.author.name}</small></span>

				<span><small >${profile.author.published_date}</small></span>
			</div>
			</div>
			
			<div class="d-flex justify-content-center align-items-center">
			<i class='bx bxs-video me-2'></i>
			<span>${profile.total_view}</span>
			</div>
			<div class="d-flex justify-content-center align-items-center">
			<a><i class='bx bx-right-arrow-alt fs-4'></i></a>
			</div>
			</div>
			
			
		  </div>
		</div>
		
		
	  </div>
		`;
        profilesContainer.appendChild(profileDiv);
    });
};

const loadNewsDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDitails(data.data);
};

const displayNewsDitails = (newses) => {
    const modalContainer = document.getElementById("modal-container");
    console.log(modalContainer);
    modalContainer.innerHTML = ``;

    newses.forEach((news) => {
        const modalDiv = document.createElement("div");
        modalDiv.classList.add("modal-content", "bg-clr");
        console.log(modalDiv);
        modalDiv.innerHTML = `
		
		
		<div class="card bg-clr">
		<img src="${news.image_url}" class="card-img-top" alt="...">
		<div class="card-body">
		  <h5 class="card-title">Card title</h5>
		  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
		  <a href="#" class="btn btn-primary">Go somewhere</a>
		</div>
		<div class="modal-header border-0">
		  
		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	  </div>
		</div>
		
		
		`;
        modalContainer.appendChild(modalDiv);
    });
};
loadCategory();
