import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Scores from './app/Scores'
import Home from './Home'
import HistogramPerStudent from './histogramPerStudent/HistogramPerStudent'
import HistogramPerOpdracht from './histogramPerOpdracht/HistogramPerOpdracht'
import LinechartsPerStudent from './linechartsPerStudent/LinechartsPerStudent'
import LinechartsPerOpdracht from './linechartsPerOpdracht/LinechartsPerOpdracht'


class App extends Component {
    constructor(){super()
                  this.state={}         
                  }       
    render() {
        return (<Router>
            <nav >
            <ul >
            <li > < Link to = { '/' } className = "nav-link" >home</Link></li >
            <li > < Link to = {'./histogramPerStudent'} >histogram per student</Link></li>
            <li > < Link to = {'./histogramPerOpdracht' } className = "nav-link" > histogram per opdracht </Link></li >
            <li > < Link to = {'./lineChartsPerStudent' } className = "nav-link" > linecharts per student </Link></li >
            <li > < Link to = {'./lineChartsPerOpdracht' } > linecharts per opdracht  </Link></li >
            </ul> 
            </nav > 
            <hr / >
            <Switch >
            <Route exact path = '/' >
            <Home / >
            </Route>  
            <Route path = '/histogramPerStudent'>
            <HistogramPerStudent/>
            </Route>  
            <Route path = '/histogramPerOpdracht' >
            <HistogramPerOpdracht/>
            </Route> 
            <Route path = '/lineChartsPerStudent' >
            <LinechartsPerStudent/>
            </Route>   
            <Route path = '/lineChartsPerOpdracht' >
            <LinechartsPerOpdracht/>
            </Route>   
            </Switch > 
            </Router>
        )
    }
}

export default App
