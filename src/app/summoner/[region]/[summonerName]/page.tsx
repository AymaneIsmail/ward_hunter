
interface SummonerDataPageProps {
  params: {
    summonerName: string,
    region: string
  }
}

const SummonerDataPage = async ({params}: SummonerDataPageProps) => {
  const {summonerName, region} = params

  // fetch data here

  return (
    <div>
      <p>{summonerName} - {region}</p>
    </div>
  )
}

export default SummonerDataPage