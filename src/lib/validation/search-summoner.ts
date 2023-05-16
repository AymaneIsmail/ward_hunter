import { z } from 'zod'

export const searchSummonerValidator = z.object({
  summonerName: z.string(),
  region: z.string(),
})

export const findTeammatesValidator = z.object({
  championName: z.string(),
  role: z.string()
})


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { summoner } = context.query;

  return {
    props: {
      summoner: summoner || null
    }
  };
};