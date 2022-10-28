const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    renderScene("Start1")
}

function renderScene(Scene_id){
    const Scene = Scenes.find(Scene => Scene.id === Scene_id)
    document.body.style.backgroundImage = Scene.tlo
    textElement.innerText = Scene.text /*ustala tekst okienka*/
    while (optionButtonsElement.firstChild){ /*usuwa guziki*/
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    Scene.options.forEach(option => { /*Tworzy guziki*/
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requierdState == null || option.requierdState(state)
}

function selectOption(option){
    const next_Scene_id = option.nextText
    if(next_Scene_id <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    renderScene(next_Scene_id)
}

const Scenes = [
    {
        id: "Start1",
        text: 'Idziesz sobie korytarzem i nie wadzisz nikomu. Nie masz żadnego problemu.',
        tlo: 'url("img/Korytarz.png")',
        options: [
            {
                text: 'Skręć za róg! (ruch)',
                nextText: "Start2"
            }
        ]
    },
    {
        id: "Start2",
        text: 'Nie mając problemu skręcasz za róg, a tam stoją dwie kibolki',
        tlo: 'url("img/Kibolki.png")',
        options: [
            {
                text: '"O NIE!" (panikujesz)',
                nextText: "Start3"
            }
        ]
    },
    {
        id: "Start3",
        text: '"HEJ TY, MASZ JAKIŚ PROBLEM? ZA KIM JESTEŚ?"',
        tlo: 'url("img/Kibolki.png")',
        options: [
            {
                text: '"LECH POZNAŃ, LECH POZNAŃ!" (rozmowa)',
                nextText: "Źle1"
            },
            {
                text: '"ZA LINDE, SZKOŁA LINDE!" (rozmowa)',
                nextText: "Kim_jesteś"
            },
            {
                text: 'LEWANDOWSKI KRÓLEM POLSKI! (rozmowa)',
                nextText: "Źle1"
            },
            {
                text: 'A ZA KIM MAM BYĆ? (rozmowa)',
                nextText: "Źle1"
            }
        ]
    },
    {
        id: "Źle1",
        text: 'Dostajesz cios w nos. "Lepiej dobrze się zastanów!',
        tlo: 'url("img/Kibolki.png")',
        options: [
            {
                text: 'Spróbuj ponownie',
                nextText: "Start3"
            }
        ]
    },
    {
        id: "Kim_jesteś",
        text: '"DOBRZE DOBRZE, TYLKO LINDE!" Oddychasz z ulgą "Ciesz się, że nie dostałeś prawdziwego lania!"',
        tlo: 'url("img/Kibolki.png")',
        options: [
            {
                text: '"To nie było prawdziwe lanie?" (rozmowa)',
                nextText: "Lanie"
            }
        ]
    },
    {
        id: "Lanie",
        text: '"Co Ty, prawdziwe lanie jest za konretne powody!"',
        tlo: 'url("img/Kibolki.png")',
        options: [
            {
                text: '"Jak uniknąć lania?" (rozmowa)',
                nextText: "Lanie2"
            }
        ]
    },
    {
        id: "Lanie2",
        text: '"Trzeba przestrzegać zasad klubu na meczach Dy-Raa!"',
        tlo: 'url("img/Kibolki.png")',
        options: [
            {
                text: '"Jakie są zasady?" (rozmowa)',
                nextText: "Zasady"
            },
            {
                text: '"To Dy-Roo w coś gra?" (rozmowa)',
                nextText: "W_co_gra"
            },
            {
                text: '"Dy-Roo ma własny klub?" (rozmowa)',
                nextText: "Klub"
            },
            {
                text: '"Ale ja jestem ponad zasadami!" (rozmowa)',
                nextText: "Źle2"
            }
        ]
    },
    {
        id: "Klub",
        text: '"No halo, klub Linde!"',
        tlo: 'url("img/Kibolki.png")',
        options: [
            {
                text: '"Faktycznie, głupi ja. Jakie są barwy klubu?" (rozmowa)',
                nextText: "Barwy"
            }
        ]
    },
    {
        id: "Źle2",
        text: 'Dostajesz kopa w wątrobę "NIKT NIE JEST PONAD ZASADAMI!"',
        tlo: 'url("img/Kibolki.png")',
        options: [
            {
                text: '"Dobra dobra, zasady są święte! A jakie są?" (rozmowa)',
                nextText: "Zasady"
            }
        ]
    },
    {
        id: "Zasady",
        text: '"Są dwie: Nie wolno śmiecić na korytarzu szkoły i na meczach trzeba być w barwach na meczach!"',
        tlo: 'url("img/Kibolki.png")',
        options: [
            {
                text: '"Oczywiście! Właśnie mi się przypomniało, że widziałem pustą puszkę po energolu piętro wyżej, idę ją sprzątnąć! (ucieczka)"',
                nextText: "Ucieczka"
            },
            {
                text: '"Jakie są barwy?" (rozmowa)',
                nextText: "Barwy"
            }
        ]
    },
    {
        id: "Barwy",
        text: '"To chyba oczywiste: Takie jak skóra ogra!"',
        tlo: 'url("img/Kibolki.png")',
        options: [
            {
                text: '"No jasne! Idę się przebrać, mam koszulki w szafce piętrze!" Uciekasz',
                nextText: "Ucieczka"
            }
        ]
    },
    {
        id: "W_co_gra",
        text: '"Najbliższy mecz jest za tydzień - Dy-Roo gra z Królikiem Bugsem kosmiczny mecz!"',
        tlo: 'url("img/Kibolki.png")',
        options: [
            {
                text: '"O kurczę, zapomniałem! Biegnę do sali informatycznej kupić bilety!" (ucieczka)"',
                nextText: "Ucieczka"
            },
            {
                text: '"Dy-Roo móglby spokojnie wystartować na olimpiadzie!" (rozmowa)"',
                nextText: "Olimpiada"
            }
        ]
    },
    {
        id: "Olimpiada",
        text: '"7 lat temu zdobył złoto, ale nie w kosza, tylko w Wystawianiu Jedynek na Czas!"',
        tlo: 'url("img/Kibolki.png")',
        options: [
            {
                text: '"Serio? Biegnę do blibioteki o tym poczytać! (ucieczka)',
                nextText: "Ucieczka"
            }
        ]
    },
    {
        id: "Ucieczka",
        text: '"Dobrze dobrze, zmiataj z tąd!" Udaje Ci się uciec kibolkom!',
        tlo: 'url("img/Kibolki.png")',
        options: [
            {
                text: 'Zagraj jeszcze raz!',
                nextText: "Start1"
            }
        ]
    }
]

startGame()