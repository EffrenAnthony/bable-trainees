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
        <p class="movies-collection__card--info-title" style="margin-bottom: 0px;">${video.id}</p>
        <p class="movies-collection__card--info-prota" style="margin-bottom: 0px;">${video.user.name}</p>
        <p class="movies-collection__card--info-duration" style="margin-bottom: 0px;">${video.duration} seg</p>
        <div class="movies-collection__card--info-actions">
          <a href="" target='_blank' data-bs-toggle="modal" data-bs-target="#modal${video.id}"><i class="fa-solid fa-play"></i></a>         
          <i class="fa-solid fa-thumbs-up"></i>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div  class="modal fade" id="modal${video.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div  class="modal-dialog modal-dialog-centered" role="document" style="display: flex;  justify-content: center;">
        <div class="modal-content" style="width: 900px; height: 500px;">
          
          <div class="modal-body" style="background-color: rgb(20, 20, 20);">           
            <iframe
              src="${video.video_files[2].link}"
              width="860px"
              height="460px"
              frameborder="0"
              allow="autoplay; fullscreen"
              allowfullscreen
            ></iframe>
          </div>      
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

async function triggerMovies(n, id) {
  const videos = await _videosService.getVideosAsyncAwait(n)
  const videosSection = document.getElementById(id)
  renderVideos(videos, videosSection)
}

// Runners
triggerMovies(8,'videosSection')
triggerMovies(8,'videosSection2')

// _videosService.getVideosAsyncAwait(20)
// _videosService.getVideosPromises(20)