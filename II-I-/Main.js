"use strict";
class Dimension {
    element;
    constructor(element, style) {
        this.element = window.document.createElement(element);
        this.Aesthetic(style);
    }
    Event(type, callback, remove = false) {
        if (remove)
            return this.element.removeEventListener(type, callback);
        this.element.addEventListener(type, callback);
    }
    get Element() { return this.element; }
    Text(value) { this.element.innerHTML = value; }
    Append(father) { father.appendChild(this.element); return this; }
    Mask(style) { for (const property in style)
        this.element.style[property] = style[property]; }
    Mark(property, value) { this.element.setAttribute(property, value); }
    Aesthetic(style) { typeof style === "string" ? this.Mark("class", style) : this.Mask(style); }
}
class Bank {
    value;
    present;
    interator;
    constructor(value, present, interator) {
        this.value = value;
        this.present = present;
        this.interator = interator;
        this.interator = this.Generator();
    }
    *Generator() { for (const content of this.value)
        yield content; }
    Present() { return this.present; }
    Next() { return this.present = this.interator?.next(); }
}
class Score {
    value;
    max;
    segment;
    constructor(value, max, segment) {
        this.value = value;
        this.max = max;
        this.segment = segment;
    }
    More(value) {
        this.value += value;
        this.segment.Mute(value);
    }
    Zero() { this.value = 0; }
    get Max() { return this.max; }
    get Value() { return this.value; }
}
class Assessment extends Dimension {
    question;
    answer;
    bank;
    score;
    time;
    constructor(element, style, question, answer, bank, score, time) {
        super(element, style);
        this.question = question;
        this.answer = answer;
        this.bank = bank;
        this.score = score;
        this.time = time;
        this.Become();
        this.Next();
    }
    Become() {
        for (const entity of ["question", "answer"])
            this[entity].Append(this.element);
    }
    View(entity, target) {
        this[entity].Append(window.document.querySelector(target));
    }
    Rate(part) {
        this.time.Stop();
        const { value, done } = this.bank.Present();
        const state = part.Identity == value.correct;
        if (state)
            this.score.More(value.score);
        else
            part.State(0);
        this.Result(1);
    }
    Result(state) {
        const { value, done } = this.bank.Present();
        this.answer.Part(value.correct).State(state);
        this.answer.Break(this);
        setTimeout(this.Next.bind(this), 2000);
    }
    Overflow() {
        this.answer.AutoDeconstruct();
        this.question.Deconstruct();
        this.time.Descontruct();
        this.Mask({ flexDirection: "row" });
        this.Text(`

            <table class="style-table">
                <tbody>
                    <tr class="style-property">
                        <td class="style-key">Total</td>
                        <td class="style-value">${this.score.Max}</td>
                    </tr>
                    <tr class="style-property">
                        <td class="style-table-head-cell">Correct</td>
                        <td class="style-table-head-cell">Porcent</td>

                    </tr>
                    <tr class="style-property">
                        <td class="style-table-cell">${this.score.Value}</td>
                        <td class="style-table-cell">${(this.score.Value / this.score.Max * 100).toFixed(2)}%</td>
                    </tr>
                </tbody>

            </table>




        `);
    }
    Next() {
        this.answer.Deconstruct();
        const { value, done } = this.bank.Next();
        if (done)
            return this.Overflow();
        this.question.Content(value.question);
        this.answer.Content(value.answer);
        this.answer.Bind(this);
        this.time.Emit(this.Result.bind(this), -1);
        this.time.Animation(value.time);
    }
}
class Question extends Dimension {
    content;
    constructor(element, style, content) {
        super("h1", style);
        this.content = content;
    }
    Content(value) {
        this.content = value;
        this.element.innerHTML = value;
    }
    Deconstruct() { this.element.remove(); }
}
class Answer extends Dimension {
    content;
    part;
    constructor(element, style, content, part = {}) {
        super(element, style);
        this.content = content;
        this.part = part;
    }
    Content(value) {
        for (const identity in value)
            this.part[identity] = new Part("li", "style-answer", identity, value[identity]);
        for (const identity in value)
            this.part[identity].Append(this.element);
        this.content = value;
    }
    Bind(assessment) {
        for (const identity in this.part)
            this.part[identity].Event("click", () => assessment.Rate.bind(assessment)(this.part[identity]));
    }
    Break(assessment) {
        for (const identity in this.part)
            this.part[identity].Mask({ pointerEvents: "none" });
    }
    Part(identity) {
        return this.part[identity];
    }
    Deconstruct() {
        for (const identity in this.part)
            this.part[identity].Deconstruct();
    }
    AutoDeconstruct() {
        this.element.remove();
    }
}
class Part extends Dimension {
    identitiy;
    content;
    constructor(element, style, identitiy, content) {
        super(element, style);
        this.identitiy = identitiy;
        this.content = content;
        this.element.innerHTML = content;
    }
    get Identity() { return this.identitiy; }
    get Content() { return this.content; }
    State(value) {
        if (!value)
            return this.Incorrect();
        if (value == 1)
            return this.Correct();
        return this.Empty();
    }
    Empty() { this.Mask({ backgroundColor: "var(--theme-scarse-empty)", color: "var( --theme-plentiful-empty)" }); }
    Correct() { this.Mask({ backgroundColor: "var(--theme-scarse-welcome)", color: "var( --theme-plentiful-welcome)" }); }
    Incorrect() { this.Mask({ backgroundColor: "var( --theme-scarse-error)", color: "var( --theme-plentiful-error)" }); }
    Deconstruct() { this.element.remove(); }
}
class Segment extends Dimension {
    direction;
    rule;
    symbol;
    style;
    property = { scale: 0, size: '', identity: 0, emit: { callback: () => null, parameter: null } };
    components = { symbol: null, segment: null, progress: null };
    constructor(direction, rule, symbol, style) {
        super("ul", style.container);
        this.direction = direction;
        this.rule = rule;
        this.symbol = symbol;
        this.style = style;
        this.Become();
    }
    Become() {
        this.components.symbol = new Dimension("li", this.style.symbol);
        this.components.segment = new Dimension("li", this.style.segment);
        this.components.progress = new Dimension("div", this.style.progress);
        this.Mute(this.property.scale);
        this.components.progress.Append(this.components.segment.Element);
        this.components.segment.Append(this.element);
        this.components.symbol.Append(this.element);
        this.components.symbol.Text(this.symbol);
    }
    Symbol(value) {
        this.components.symbol?.Text(value);
    }
    Mute(scale) {
        this.Scale(scale);
        this.Render();
    }
    Scale(value) {
        this.property.scale += value;
    }
    Render() {
        this.components.progress?.Mask({ [this.direction]: `${this.Porcent(this.property.scale)}%` });
    }
    Porcent(scale) {
        return this.rule(scale);
    }
    Stop() {
        clearInterval(this.property.identity);
        this.property.identity = -1;
    }
    Animation(time) {
        this.Reset();
        const duration = time * 10 ** 3;
        const interval = 5;
        const increment = 1 / (duration / interval);
        this.property.identity = setInterval(() => {
            this.Mute(increment);
            if (this.property.scale > 0 && this.property.scale < 1)
                return;
            this.property.emit.callback(...this.property.emit.parameter);
            this.Stop();
        }, interval);
    }
    Emit(callback, ...parameter) {
        this.property.emit = { callback, parameter };
    }
    Reset() {
        this.Mask({ [this.direction]: this.property.size });
        this.property.scale = 0;
        this.property.size = this.element.style.height;
    }
    Descontruct() { this.element.remove(); }
}
class Switch extends Dimension {
    state;
    action = (state) => null;
    constructor(element, style, state = false) {
        super(element, style);
        this.state = state;
    }
    Swap() { return this.state = !this.state; }
    Action(event, method) {
        this.action = method;
        this.Event(event, this.Method.bind(this));
    }
    Method(event) {
        if (!this.action)
            return;
        return this.action(this.Swap());
    }
}
function Theme(theme) {
    if (!theme)
        return;
    window.document.body.removeAttribute("class");
    window.document.body.setAttribute("class", theme);
}
async function Main() {
    Theme(window.localStorage.getItem("theme"));
    const Color = new Switch("div", "style-switch").Append(window.document.querySelector("body"));
    Color.Text('<span class="material-symbols-outlined">invert_colors</span>');
    Color.Action("click", (state) => {
        const className = window.document.body.className.replace(/(style\-theme\-color\-dark|style\-theme\-color\-light)/g, '');
        const theme = (state ? "style-theme-color-dark" : "style-theme-color-light") + ' ' + className;
        window.localStorage.setItem("theme", theme);
        Theme(theme);
    });
    const Database = await fetch("./Bank.json").then(response => response.json());
    const MaxScore = Database.reduce((max, current) => max + current.score, 0);
    const Hourglass = (new Segment("height", (scale) => (1 - scale) * 100, '<span class="material-symbols-outlined">hourglass</span>', { symbol: "style-symbol", progress: "style-dust", segment: "style-gless", container: "style-hourglass" }));
    const Performance = (new Segment("height", (scale) => (scale * 100) / MaxScore, '<span class="material-symbols-outlined">check</span>', { symbol: "style-symbol", progress: "style-number", segment: "style-interval", container: "style-counter" }));
    const Quiz = new Assessment("div", "style-content", new Question("h1", "style-question"), new Answer("ul", "style-answers"), new Bank(Database), new Score(0, MaxScore, Performance), Hourglass);
    Quiz.Append(window.document.querySelector(".style-assessment"));
    Hourglass.Append(window.document.querySelector(".style-assessment"));
    Performance.Append(window.document.querySelector(".style-assessment"));
}
window.addEventListener("DOMContentLoaded", Main);
