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

// ------------------------------ End of Searchbar for Small Device-----------------------------------//

const {
  snippet: { title, channelTitle },
  videoId,
} = JSON.parse(localStorage.getItem("clickedVideos"));

const video_DOM = document.querySelector("#video_details");

function showVideo(videoId, channelTitle, title) {
  video_DOM.innerHTML = "";
  let iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}`;

  iframe.width = "100%";
  iframe.height = "100%";
  iframe.setAttribute("allowfullscreen", "true");

  let video_info = document.createElement("div");
  video_info.classList.add("video_info");

  let videoOtherHtml = `  <div class="video_info">
          <div class="video-heading">
            <div class="video-title">
              ${title}
            </div>
            <div class="dots">
              <i class="fa fa-ellipsis-v"></i>
            </div>
          </div>
          <div class="video-details">
            <div class="channel">
              <span class="channelTitle">${channelTitle}</span>
            </div>
          </div>
        </div>
        <hr>`;
  video_info.insertAdjacentHTML("afterbegin", videoOtherHtml);
  video_DOM.append(iframe, video_info);
}

// -------------------------------------------Recommended Videos----------------------------------------------------/////
let getSearch = JSON.parse(localStorage.getItem("serchVideos"));
window.onload = () => {
  RecommendedVideos(getSearch);
  showVideo(videoId, channelTitle, title);
};
async function RecommendedVideos(getSearch) {
  try {
    // let video_query = document.querySelector("#video").value;
    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&type=video&q=${getSearch}&maxResults=100&videoEmbeddable=true&key=AIzaSyA6heb66nzctlZHQAufckYrWxYVj-iUnTw`
    );

    let data = await res.json();
    let videos = data.items;
    displayRecommendedVideo(videos);
  } catch (err) {
    console.log(err);
  }
}

const displayRecommendedVideo = (videos) => {
  console.log(videos);
  videos.forEach((video) => {
    let {
      snippet: { title, channelTitle, thumbnails },
      id: { videoId },
    } = video;

    let DOM_wrapper = document.querySelector(".wrapper");

    let recommendVid_div = document.createElement("div");
    recommendVid_div.classList.add("recommend_videos");
    recommendVid_div.style.cursor = "pointer";

    let otherHtml = `  <img
              src="${thumbnails.medium.url}"
              class="img"
              alt=""
            />
            <div class="info">
              <div class="video-title">
                ${title}
              </div>
              <span class="channel-name">${channelTitle}</span>
            </div>
             `;

    recommendVid_div.insertAdjacentHTML("afterbegin", otherHtml);
    recommendVid_div.onclick = () => {
      // window.location.href = "youtube.html";
      showVideo(videoId, channelTitle, title);
    };
    DOM_wrapper.append(recommendVid_div);
  });
};
// -------------------------------------------Recommended Videos----------------------------------------------------/////
