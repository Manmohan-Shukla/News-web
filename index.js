const API_KEY = "9148da87ca524980b5e1eef84dabc75f"
const url = "https://newsapi.org/v2/everything?q="
window.addEventListener("load", () => fetchNews("india"))

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data)
    bindData(data.articles);
}

function bindData(articles) {
    const contest = document.getElementById('content');
    const template = document.getElementById('template-news-card');
    contest.innerHTML = '';
    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = template.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        contest.appendChild(cardClone)

    });

}



function fillDataInCard(cardClone, article) {
    const news_img = cardClone.querySelector("#news-img")
    const news_title = cardClone.querySelector("#news-title")
    const news_source = cardClone.querySelector("#news-source")
    const news_desc = cardClone.querySelector("#news-desc")

    news_img.src = article.urlToImage;
    news_title.innerHTML = article.title;
    news_desc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    news_source.innerHTML = `${article.source.name} · ${date}`;
}

const searchButton = document.getElementById("button-addon2");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    
});