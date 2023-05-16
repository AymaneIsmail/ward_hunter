// import Scrapper from '@/lib/Scrapper'

// const data = new Scrapper({
//   url: 'https://www.leagueoflegends.com/fr-fr/news/tags/patch-notes/',
//   selector: 'ol li',
//   domElements: {
//     a: 'href',
//     img: 'src',
//   },
// })

export async function GET(request: Request) {
  // console.log(data.parseData())
  // let json = await data.parseData()
  return new Response('oui')
}
