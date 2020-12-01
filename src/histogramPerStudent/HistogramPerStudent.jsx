import React from 'react'
import Studentregel from './Studentregel'
import MaakHistogram from './MaakHistogram'
import './studentHistogram.css'

let studenten=[]
let studentenGesorteerd=[]

const sorteerStudenten = (studenten) =>  studenten.sort(function(a, b) {
                                                  let student1 = a
                                                  let student2 = b
                                                  if (student1 < student2) {
                                                     return -1;
                                                     }
                                                  if (student1 > student2) {
                                                     return 1;
                                                     }   
                                                  return 0;
                                                  });

const filterScores= (scores) => {studenten=[]
                                 scores.forEach(element => {if (!(studenten.includes(element.student)))
                                                              studenten.push(element.student)})
                                 return studenten
                                }


class HistogramPerStudent extends React.Component{

    constructor(){super()
                  this.state={scoresHistogram : [],
                              scores          : [],
                              scoreKeuze      : "",
                              student         : "", 
                              maakHistogram   : false}
                  this.handleChange=this.handleChange.bind(this)
                  this.handleClick=this.handleClick.bind(this)
                  this.scoreKeuzeHandle=this.scoreKeuzeHandle.bind(this)
                }

    handleChange(index)
    { let scoresGeselecteerd=[]
      this.props.scores.forEach(element => {if (element.student===studentenGesorteerd[index])
                                              scoresGeselecteerd.push(element)})
      console.log("index : "+index+" "+studentenGesorteerd[index])
      this.setState({scoresHistogram: scoresGeselecteerd,
                     student        : studentenGesorteerd[index],
                     maakHistogram  : false})
    } 
      
    handleClick(e)
    { if (this.state.student==="")
        alert("Selecteer eerst een student")
      else
      { if (this.state.scoresHistogram.length === 0)
          alert("Voor deze student zijn geen scores beschikbaar")
        else 
        {
          this.setState({maakHistogram:true})
        }
      }
      e.preventDefault()
    }  

    scoreKeuzeHandle(e)
    {
      this.setState({scoreKeuze    :e.target.value,
                     maakHistogram :false })
    }

    componentDidMount()
    {
        this.setState({scores:this.props.scores})
    }

    render()
    {   studenten=filterScores(this.props.scores)
        studentenGesorteerd=sorteerStudenten(studenten)
        let studentenGemapt=studentenGesorteerd.map((element,index) => <Studentregel key={index} naamStudent={element} index={index} onchange={this.handleChange}/>)
        return (<div> 
                   <ul>
                     {studentenGemapt}
                   </ul>
                   <div>
                      <label>Keuze scores</label>
                      <div className="soortScore">
                         <p className="soortScoreLabel">Beiden</p><input className="radio_score"  
                                                                         type="radio" 
                                                                         name="scorekeuze" 
                                                                         value="Beide" 
                                                                         onChange={this.scoreKeuzeHandle}/>
                         <p className="soortScoreLabel">Score Moeilijkheid</p><input className="radio_score" 
                                                                                     type="radio" 
                                                                                     name="scorekeuze" 
                                                                                     value="Moeilijk" 
                                                                                     onChange={this.scoreKeuzeHandle}/> 
                         <p className="soortScoreLabel">Score Leuk</p><input className="radio_score" 
                                                                             type="radio" 
                                                                             name="scorekeuze" 
                                                                             value="Leuk" 
                                                                             onChange={this.scoreKeuzeHandle}/>
                      </div> 
                   </div>
                   <button onClick={this.handleClick}>maak histogram</button>
                   {this.state.maakHistogram ? <MaakHistogram student={this.state.student}
                                                              scoreKeuze={this.state.scoreKeuze} 
                                                              scoresHistogram={this.state.scoresHistogram}/>:<p></p>}
                </div>)
    }
}

export default HistogramPerStudent