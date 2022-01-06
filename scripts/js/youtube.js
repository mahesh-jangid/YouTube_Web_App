const {
  snippet: { title, channelTitle },
  videoId,
} = JSON.parse(localStorage.getItem("clickedVideos"));

const video_DOM = document.querySelector("#video_details");

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
              <span class="channel-name">${channelTitle}</span>
            </div>
          </div>
        </div>
        <hr>`;
video_info.insertAdjacentHTML("afterbegin", videoOtherHtml);
video_DOM.append(iframe, video_info);

// -------------------------------------------Recommended Videos----------------------------------------------------/////
window.onload = () => {
  RecommendedVideos();
};
async function RecommendedVideos() {
  try {
    // let video_query = document.querySelector("#video").value;
    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=date&type=video&videoEmbeddable=true&key=AIzaSyAjLgxHRzYZCEPjnTvvi6uAdbBXlAYLeT0`
    );

    let data = await res.json();
    let videos = data.items;
    displayRecommendedVideo(videos);
    console.log(videos);
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
            </div>`;

    recommendVid_div.insertAdjacentHTML("afterbegin", otherHtml);
    // recommendVid_div.onclick = () => {
    //   // localStorage.setItem("clickedVideos", JSON.stringify(video));
    //   RecommendedVideos();
    // };
    DOM_wrapper.append(recommendVid_div);
    console.log(recommendVid_div);
  });
};
// -------------------------------------------Recommended Videos----------------------------------------------------/////
