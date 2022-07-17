// traer datos
const BASE_URL = 'https://api.pexels.com'

const _videosService = {
  getVideosAsyncAwait: async (videosQuantity) => {
    const response = await axios.get(`${BASE_URL}/videos/popular?per_page=${videosQuantity}`)
    const videos = response.videos
    return videos
  },
  getVideosPromises: {}
}

// crear componentes

// renderizar en HTML

_videosService.getVideosAsyncAwait(20)