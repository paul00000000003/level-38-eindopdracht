import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Scores from './Scores'
import Home from '../home/Home'
import WeergavePerStudent from '../weergavePerStudent/WeergavePerStudent'
import WeergavePerOpdracht from '../opdrachtenWeergave/WeergavePerOpdracht'


class App extends Component {
    constructor(){super()
                  this.state={scores:[],
                              schermGeladen:false}         
                  }  
                  

    componentDidMount()
    {
        this.setState({scores:Scores,
                       schermGeladen:true })
    }


    render() {

        if (this.state.schermGeladen)
        {
           return (<Router>
            <nav >
            <ul >
            <li > < Link to = { '/' } className = "nav-link" >home</Link></li >
            <li > < Link to = {'./weergavePerStudent'} >Weergave per student</Link></li>
            <li > < Link to = {'./weergavePerOpdracht' } > Weergave per opdracht  </Link></li >
            </ul> 
            </nav > 
            <hr / >
            <Switch >
            <Route exact path = '/' >
            <Home scores={this.state.scores}/>
            </Route>  
            <Route path = '/weergavePerStudent'>
            <WeergavePerStudent scores={this.state.scores}  />
            </Route>  
            <Route path = '/weergavePerOpdracht' >
            <WeergavePerOpdracht scores={this.state.scores}/>
            </Route>   
            </Switch > 
            </Router>
        )
        }
        else return(<h1>Moment geduld. Gegevens worden geladen</h1>)
    }

}

export default App
