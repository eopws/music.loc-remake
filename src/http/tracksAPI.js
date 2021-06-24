import { $host } from "@http"

export async function createTrack(trackData) {
    const response = await $host.post('api/track', trackData)
    return response
}
