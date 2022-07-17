// traer datos
const BASE_URL = 'https://api.pexels.com'

const _videosService = {
  getVideosAsyncAwait: async (videosQuantity) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/videos/popular?per_page=${videosQuantity}`
        , {
          headers: {
            "Authorization": process_env_API_KEY
          }
        }
      )
      const videos = response.data.videos
      return videos
    } catch (e) {
      console.error(e)
    }
  },
  getVideosPromises: (videosQuantity) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", process_env_API_KEY); return new Promise((resolve, reject) => {
      fetch(
        `${BASE_URL}/videos/popular?per_page=${videosQuantity}`,
        {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        }
      )
        .then(response => {
          // console.log(response)
          response.json()
            .then(data => {
              // console.log(data.videos)
              resolve(data.videos)
            })
            .catch(err => reject(err))
        })
        .catch(err => reject(err))
    })
  }
}

// crear componentes

const renderVideos = (videos, targetElement) => {
  const videosCards = videos.map((video) => {
    return `
    <div class="movies-collection__card">
      <img
        class="movies-collection__card--image"
        src="${video.image}"
      />
      <div class="movies-collection__card--info">
        <p class="movies-collection__card--info-title">${video.id}</p>
        <p class="movies-collection__card--info-prota">${video.user.name}</p>
        <p class="movies-collection__card--info-duration">${video.duration} seg</p>
        <div class="movies-collection__card--info-actions">
          <a href="${video.url}" target='_blank'><i class="fa-solid fa-play"></i></a>         
          <i class="fa-solid fa-thumbs-up"></i>
        </div>
      </div>
    </div>
    `
  }).join('')

  targetElement.innerHTML = `
    <div class="carousel__container">
      ${videosCards}
    </div>
  `
}

// renderizar en HTML

async function triggerMovies() {
  const videos = await _videosService.getVideosAsyncAwait(20)
  const videosSection = document.getElementById('videosSection')
  renderVideos(videos, videosSection)
}

// Runners
triggerMovies()




// _videosService.getVideosAsyncAwait(20)
// _videosService.getVideosPromises(20)