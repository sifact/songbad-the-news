const loadNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayNews(data.data.news_category);
};

const displayNews = (newses) => {
    console.log(newses);
    const newsContainer = document.getElementById("news-container");
    console.log(newsContainer);

    newses.forEach((news) => {
        console.log(news.category_name);
        const newsDiv = document.createElement("div");
        newsDiv.innerHTML = `
		<a class="nav-link text-white" href="#">${news.category_name}</a>
		`;
        newsContainer.appendChild(newsDiv);
    });
};

loadNews();
