import React from 'react'
import './studentregel.css'

class Studentregel extends React.Component
{


  render()
  { return(
    <li className="studentregel"> 
       <input onChange={(e)=>this.props.onchange(this.props.index)} type="radio" name="gekozenStudent"/> 
       {this.props.naamStudent}  
    </li>
  )
  }
}

export default Studentregel

