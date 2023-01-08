import { parse as parseHTMl } from "node-html-parser"
import axios from "axios"

async function fetchData() {
    const url = "https://leagueoflegends.fandom.com/wiki/Seraphine/LoL?so=search"

    const res = await axios.get(url)

    const page = parseHTMl(res.data)
    const champStats = page.querySelectorAll("div[class^=skill_]")

    const listOfDings = champStats.map(element => {
        const currObj = {}
        const key = element.parentNode.classNames.slice(-1)
        const content = element.querySelectorAll("div.skill_leveling dd").map(element => element.rawText)
        if (content.length === 0 || key === "") {
            return null
        }
        currObj[key] = content
        return currObj

    }).filter(element => element !== null)

    console.log(listOfDings)

}

const main = async () => await fetchData()

main()

