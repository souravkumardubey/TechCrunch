const cardContainer = document.querySelector(".card-container");
const loader = document.querySelector(".loader");
const errorMessage = document.querySelector(".error-message");

loader.style.display = "block";
  
axios.get("https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed")
  .then((response) => {
    const posts = response.data;

    if (posts.length === 0) {
      errorMessage.textContent = "No results found.";
      errorMessage.style.display = "block";
      return;
    }

    console.log(posts);

    posts.forEach((post) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const image = document.createElement("img");
      image.src = post.jetpack_featured_media_url;

      const title = document.createElement("h2");
      title.innerHTML = `<h2> ${post.title.rendered} </h2>`;

      const excerpt = document.createElement("p");
      excerpt.innerHTML = post.excerpt.rendered;

      //   console.log(`${}`);
      const author = document.createElement("p");
      author.classList.add("meta");
      author.textContent = `By ${post.parselyMeta["parsely-author"][0]}`;

      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(excerpt);
      card.appendChild(author);
      cardContainer.appendChild(card);

      card.addEventListener("click", () => {
        window.location = post.link;
      });
    });

    loader.style.display = "none";
  })
  .catch((error) => {
    console.log(error);

    if (error.response && error.response.status === 404) {
      errorMessage.textContent = "API not found.";
    } else {
      errorMessage.textContent = "An error occurred.";
    }

    errorMessage.style.display = "block";
    loader.style.display = "none";
  });
