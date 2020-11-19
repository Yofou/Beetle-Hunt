
const players = [
    new Player(),
    new Player(),
]

// give all player names through the randomuser api
fetch(`https://randomuser.me/api/?results=${players.length}`)
    .then( res => res.json() )
    .then( ({ results }) => {
        results.forEach( ({ name }, index) => {
            players[ index ].name.innerText = name.first
        } )
    } )

function failedAttempt(card) {
    card.parent.classList.add('animate__animated', 'animate__shakeX')

    setTimeout( () => {
        card.parent.classList.remove('animate__animated', 'animate__shakeX')
        document.body.dispatchEvent(action)
    }, 1500 )
}

let currentPlayer = Math.floor( Math.random() * players.length )

function showCurrentPlayer() {
    players.forEach( (player, index) => {
        if ( index != currentPlayer ) {
            player.parent.classList.remove('active')
        } else {
            player.parent.classList.add('active')
        }
    } )
}

const action = new Event( 'action' )
document.body.addEventListener( 'action', () => {
    
    currentPlayer++
    if ( currentPlayer >= players.length ) currentPlayer = 0

    showCurrentPlayer()

} )

showCurrentPlayer()

