import { $host } from "@http"

export async function getTracks(limit, page) {
    const {data} = await $host.get('api/tracks', {
        params: {
            limit: limit,
            page: page,
        }
    })
    return data
}

export async function createTrack(trackData) {
    const response = await $host.post('api/tracks', trackData)
    return response
}
