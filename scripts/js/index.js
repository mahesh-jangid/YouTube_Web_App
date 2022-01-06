// ------------------------------ Searchbar for Small Device-----------------------------------//

const search_button = document.querySelector(".search button");
const nav = document.querySelector("nav");
const previous = nav.querySelector(".previous");

search_button.addEventListener("click", () => {
  if (window.innerWidth <= 660) {
    nav.classList.add("open");
  }
});
previous.addEventListener("click", () => {
  nav.classList.remove("open");
});
window.onresize = function (event) {
  if (window.innerWidth > 660) {
    nav.classList.remove("open");
  }
};
// curl \https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=date&q=${video_query}&type=video&videoEmbeddable=true&key=AIzaSyAsHjcyAZve7e4n2gOBeF6Z48PTgFlr0ic`
//   'https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=india&maxResults=100&order=relevance&q${video_query}=tesla&relevanceLanguage=zh-ind&type=video&videoCaption=any&videoLicense=any&videoType=any&key=AIzaSyAsHjcyAZve7e4n2gOBeF6Z48PTgFlr0ic' \
//   --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
//   --header 'Accept: application/json' \
//   --compressed

// ------------------------------ End of Searchbar for Small Device-----------------------------------//

window.onload = () => {
  searchVideo();
};
const main_div = document.querySelector(".grid");

async function searchVideo() {
  try {
    let video_query = document.querySelector("#video").value;
    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=date&q=${video_query}&type=video&videoEmbeddable=true&key=AIzaSyAjLgxHRzYZCEPjnTvvi6uAdbBXlAYLeT0`
    );

    let data = await res.json();
    let videos = data.items;
    appendData(videos);
    console.log(videos);
  } catch (err) {
    console.log(err);
  }
}

const appendData = (results) => {
  main_div.innerHTML = "";
  results.forEach((el) => {
    let {
      snippet,
      id: { videoId },
    } = el;

    const grid_items = document.createElement("div");
    grid_items.classList.add("grid-item");
    const htmlData = `<div class="video-img">
                <img
                  src="${snippet.thumbnails.medium.url}"
                  alt=""
                />
                <span class="time">8:38</span>
              </div>
              <div class="video-heading">
                <div class="video-creator">
                  <div class="video-creator-img">
                    <img
                      src="https://yt3.ggpht.com/a-/AOh14Ggp32ojA3Yot9a7El6RHh72heaPm4Ilr9eEEA=s68-c-k-c0x00ffffff-no-rj-mo"
                      alt=""
                    />
                  </div>
                </div>
                <div class="video-title">
                  ${snippet.title}
                </div>
                <div class="dots">
                  <i class="fa fa-ellipsis-v"></i>
                </div>
              </div>
              <div class="video-details">
                <div class="temp"></div>
                <div class="channel">
                  <span class="channel-name">${snippet.channelTitle}</span>
                </div>
              </div>`;

    grid_items.insertAdjacentHTML("afterbegin", htmlData);
    main_div.append(grid_items);

    const data_to_send = {
      snippet,
      videoId,
    };

    grid_items.onclick = () => {
      showVideos(data_to_send);
    };
  });
};

const showVideos = (data_to_send) => {
  localStorage.setItem("clickedVideos", JSON.stringify(data_to_send));
  window.location.href = "youtube.html";
};
