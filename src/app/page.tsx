import FindTeammates from '@/components/FindTeammates'
import Navbar from '@/components/Navbar'
import SearchSummoner from '@/components/SummonerSearchbar'
import Button from '@/components/ui/Button'


export default function Home() {
  return (
    <div>
      <Navbar />
      <section className="relative bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(/homepage_bg.jpg)`}}>
        <div className="absolute inset-0 bg-black/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-black/95 sm:to-gray-600/25"></div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:justify-around lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-6xl text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-white sm:text-8xl">
              Ward
              <strong className="block font-extrabold text-rose-700">
                Hunter
              </strong>
            </h1>

            <p className="mt-4 max-w-lg xs:mx-auto sm:text-xl sm:leading-relaxed text-white">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>
          </div>
          
            <SearchSummoner />
        </div>
      </section>
      {/* <section className="max-w-xl mx-auto">
      <FindTeammates />
      </section> */}
    </div>
  )
}
