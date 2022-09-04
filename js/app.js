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
		<a onclick="loadCategoryNews(${news.category_id}, '${news.category_name}')" class="nav-link text-white" style="cursor:pointer">${news.category_name}</a>
		`;
        newsContainer.appendChild(newsDiv);
    });
};

const loadCategoryNews = (id, categoryName) => {
    // start spinner
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${
        "0" + id
    }`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayCategoryNews(data.data, categoryName));
};

const displayCategoryNews = (profiles, categoryName) => {
    const profilesContainer = document.getElementById("cards-container");
    profilesContainer.innerHTML = ``;

    // display number of cards
    const textContainer = document.getElementById("card-numbers");
    textContainer.innerText = ``;
    const textTag = document.createElement("h5");
    if (profiles.length === 0) {
        textTag.innerText = `No data found in category ${categoryName}`;
    } else {
        textTag.innerText = `${profiles.length} items found in category ${categoryName}`;
    }
    textContainer.appendChild(textTag);
    // sort according to number of view

    profiles.sort(function (a, b) {
        return b.total_view - a.total_view;
    });

    // sortData(profiles);
    profiles.forEach((profile) => {
        // create cards
        const profileDiv = document.createElement("div");

        profileDiv.classList.add("card", "mb-3", "bg-clr", "light-shadow");

        profileDiv.innerHTML = `
		<div onclick="loadNewsDetails('${
            profile._id
        }')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="row g-0">
		<div class="col-md-3 p-3">
		  <img src="${
              profile.thumbnail_url ? profile.thumbnail_url : `no data found`
          }" class="img-fluid rounded-start" alt="...">
		</div>
		<div class="col-md-9">
		  <div class="card-body">
			<h5 class="card-title">${profile.title ? profile.title : `no data found`}</h5>
			<p class="card-text mt-3">${
                profile.details
                    ? profile.details.slice(0, 500)
                    : `no data found`
            } ...</p>
			<div class="d-flex justify-content-between mt-3">
			<div class="d-flex">
			<img src="${
                profile.author.img ? profile.author.img : `no data found`
            }" class="img-fluid rounded-circle" alt="..." style="width: 50px">
			<div class="d-flex flex-column ms-3 justify-content-center">
				<span><small >${
                    profile.author.name ? profile.author.name : `no data found`
                }</small></span>

				<span><small >${
                    profile.author.published_date
                        ? profile.author.published_date
                        : `no data found`
                }</small></span>
			</div>
			</div>
			
			<div class="d-flex justify-content-center align-items-center">
			<i class='bx bxs-video me-2'></i>
			<span>${profile.total_view ? profile.total_view : `no data found`}</span>
			</div>
			<div class="d-flex justify-content-center align-items-center">
			<a style="cursor:pointer;"><i class='bx bx-right-arrow-alt fs-4'></i></a>
			</div>
			</div>
			
			
		  </div>
		</div>
		
		
	  </div>
		`;
        profilesContainer.appendChild(profileDiv);
    });

    // end spinner
    toggleSpinner(false);
};

// toggle spinner
const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById("loader");
    if (isLoading) {
        loaderSection.classList.remove("d-none");
    } else {
        loaderSection.classList.add("d-none");
    }
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

        modalDiv.innerHTML = `
		
		<div class="modal-header border-0">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
	  <div class="row g-0">
	<div class="col-md-3 p-3">
	  <img src="${
          news.thumbnail_url ? news.thumbnail_url : `no data found`
      }" class="img-fluid rounded-start" alt="...">
	</div>
	<div class="col-md-9">
	  <div class="card-body">
		<h5 class="card-title">${news.title ? news.title : `no data found`}</h5>
		<p class="card-text mt-3">${
            news.details ? news.details : `no data found`
        } ...</p>
		<div class="d-flex justify-content-between mt-3">
		<div class="d-flex">
		<img src="${
            news.author.img ? news.author.img : `no data found`
        }" class="img-fluid rounded-circle" alt="..." style="width: 50px">
		<div class="d-flex flex-column ms-3 justify-content-center">
			<span><small >${
                news.author.name ? news.author.name : `no data found`
            }</small></span>

			<span><small >${
                news.author.published_date
                    ? news.author.published_date
                    : `no data found`
            }</small></span>
		</div>
		</div>
		
		<div class="d-flex justify-content-center align-items-center">
		<i class='bx bxs-video me-2'></i>
		<span>${news.total_view ? news.total_view : `no data found`}</span>
		</div>
		
		</div>
		
		
	  </div>
	</div>
	
	
  </div>
      </div>
      <div class="modal-footer border-0">
        
      </div>
		
		
		`;
        modalContainer.appendChild(modalDiv);
    });
};

loadCategory();
