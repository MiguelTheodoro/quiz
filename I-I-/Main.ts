
import { Answer } from "./Class/Answer.js"
import { Assessment } from "./Class/Assessment.js"
import { Bank } from "./Class/Bank.js"
import { Question } from "./Class/Question.js"
import { Score } from "./Class/Score.js"
import { Segment } from "./Class/Segment.js"
import { Switch } from "./Class/Switch.js"

import { $BankQuestion } from "./Type/BankQuestion"


function Theme(theme: string | undefined | null ){

    if(!theme)
        return

    window.document.body.removeAttribute("class")

    window.document.body.setAttribute("class", theme)


}

async function Main(){


    Theme(window.localStorage.getItem("theme"))

    const Color = new Switch("div", "style-switch").Append(window.document.querySelector("body") as HTMLElement)


    Color.Text('<span class="material-symbols-outlined style-invert-color">invert_colors</span>')


    Color.Action("click", (state: boolean) => {

        const className = window.document.body.className.replace(/(style\-theme\-color\-dark|style\-theme\-color\-light)/g, '')

        const theme     = ( state ? "style-theme-color-dark" : "style-theme-color-light" ) + ' ' + className

        window.localStorage.setItem("theme", theme)

        Theme(theme)

    })


    const Database: $BankQuestion[] = await fetch("./Bank.json").then(response => response.json())

    const MaxScore = Database.reduce((max: number, current: $BankQuestion) => max + current.score, 0)



    const Hourglass   = (new Segment("height", (scale) => (1 - scale) * 100, '<span class="material-symbols-outlined">hourglass</span>', { symbol: "style-symbol", progress: "style-dust", segment: "style-gless", container: "style-hourglass" }))

    const Performance = (new Segment("height", (scale) => (scale * 100) / MaxScore , '<span class="material-symbols-outlined">check</span>', { symbol: "style-symbol", progress: "style-number", segment: "style-interval", container: "style-counter" }))



    const Quiz     = new Assessment("div", "style-content", new Question("h1", "style-question"), new Answer("ul", "style-answers"), new Bank(Database), new Score(0, MaxScore, Performance), Hourglass)


    Quiz.Append(window.document.querySelector(".style-assessment") as HTMLElement)

    Hourglass.Append(window.document.querySelector(".style-assessment") as HTMLElement)

    Performance.Append(window.document.querySelector(".style-assessment") as HTMLElement)


}

window.addEventListener("DOMContentLoaded", Main)