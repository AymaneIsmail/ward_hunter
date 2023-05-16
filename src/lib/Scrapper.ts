const { v4: uuidv4 } = require('uuid')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

interface ScrapperOptions {
  url: string
  selector: string
  domElements: any
}

interface Data {
  id: string
  title: string
  link: string
  image: string
}

class Scrapper {
  private url: string
  private selector: string
  private domElements: any

  constructor({ url, selector, domElements }: ScrapperOptions) {
    this.url = url
    this.selector = selector
    this.domElements = domElements
  }

  private async request() {
    const response = await fetch(this.url)
    const html = await response.text()

    const dom = new JSDOM(html)

    const document = dom.window.document
    return document.querySelectorAll(this.selector)
  }

  public async parseData() {
    const data: Data[] = []

    const documents = await this.request()
    
    let parsedDomElements: any = {}
    
    documents.forEach((element: any) => {
      let id = uuidv4()
      
      console.log(id)
      
      for (let key in this.domElements) {
        parsedDomElements[key] =
          this.domElements[key] == 'textContent'
            ? element.querySelector(key).textContent
            : element.querySelector(key).getAttribute(this.domElements[key])
      }

      data.push({
        id,
        ...parsedDomElements,
      })
    })
    
    console.log(data)
    return data
  }
}

export default Scrapper
