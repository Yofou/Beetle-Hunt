class Player {

    constructor() {

      // Generate player html boilerplate
      this.parent = document.createElement('div')
      this.parent.classList.add('card')
      
      this.button = document.createElement( 'button' )
      this.button.innerHTML = "Draw"
      this.button.onclick = () => this.draw()

      this.header = document.createElement('h2')
      this.header.innerText = 'Not Played'
      this.collected = document.createElement('ul')

      this.name = document.createElement( 'h1' )
      this.name.innerText = 'Player name not picked'

      this.parent.appendChild( this.name )
      this.parent.appendChild( this.header )
      this.parent.appendChild( this.collected )
      this.parent.appendChild( this.button )

      document.querySelector('#game').appendChild( this.parent )
      

      // manages player items
      this.parts = [
          {
              part: "eyes",
              draw: 1,
              total: 2,
              count: 2
          },
          {
              part: "antennaes",
              draw: 2,
              total: 2,
              count: 2
          },
          {
              part: "legs",
              draw: 3,
              total: 6,
              count: 6
          },
          {
              part: "wings",
              draw: 4,
              total: 2,
              count: 2
          },
          {
              part: "head",
              draw: 5,
              total: 1,
              count: 1
          },
          {
              part: "body",
              draw: 6,
              total: 1,
              count: 1
          },
      ]
      this.inventory = []

    }

    renderInventory() {
  
      this.collected.innerHTML = ''
      this.inventory.forEach( item  => {
          this.collected.innerHTML += `<li>${item.part} x${item.count}</li>`
      } )

    }

    collect( item ) {

      // this is to block any collection of items until we atleast get the body first
      if ( this.inventory.length === 0 && item.part != "body" ) return undefined
      const hasHead = this.inventory.findIndex( ({ part }) => part === 'head' )
      if ( hasHead === -1 && ['eyes', 'antennaes'].includes( item.part ) ) return undefined
  
      if ( item.total > 1 ) {
  
        let partIndex = this.inventory.findIndex( ( {part} ) => part === item.part )
        if ( partIndex === -1 ) partIndex = this.inventory.push( { ...item, count: 0 } ) - 1
        this.inventory[ partIndex ].count++
        item.count--

        if ( item.count === 0 ) {
          this.parts = this.parts.filter( ({ part }) => part != item.part )
        }
  
      } else {
        this.inventory.push( item )
        this.parts = this.parts.filter( ({ part }) => part != item.part )
      }
  
      this.renderInventory()
    }

    draw() {
      const draw = Math.floor( Math.random() * (this.parts.length + this.inventory.length) )
      
      if ( !this.parts[draw] ) return failedAttempt( this )
      
      this.header.innerText = `Drawed: ${draw + 1}`
      this.collect( this.parts[draw] ) 
  
      const total = this.inventory.reduce( (acc, curr) => acc + curr.count, 0 )
  
      if ( total === 14 ) {
        alert(`${ this.name.innerText } Won!`)
        location.reload()
      }

      document.body.dispatchEvent(action)
    }

}