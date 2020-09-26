import React, { PureComponent, ReactNode } from 'react'

interface Props { }
interface State {
  start: string
}

class App extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      start: 'hi world!'
    }
  }

  render(): ReactNode {
    return (
      <h1> {this.state.start} </h1>
    )
  }
}

export default App
