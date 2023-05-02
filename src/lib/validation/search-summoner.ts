import {z} from "zod"

export const searchSummonerValidator = z.object({
    summonerName: z.string(),
    region: z.string()
})