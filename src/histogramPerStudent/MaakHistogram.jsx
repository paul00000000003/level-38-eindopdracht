import React from 'react'
import {BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip} from 'recharts'

class MaakHistogram extends React.Component{

  
  render(){ switch (this.props.scoreKeuze)
            {      
              case "Beide": return (<div> 
                                       <h1>{this.props.student}</h1>
                                       <BarChart width={730} height={250} data={this.props.scoresHistogram}>
                                          <XAxis dataKey="opdracht" />
                                          <YAxis />
                                          <Tooltip />
                                          <Bar dataKey="moeilijkGrade" fill="#8884d8" />
                                          <Bar dataKey="leukGrade" fill="#98FF98"/>
                                       </BarChart>
                                    </div>)
              case "Moeilijk": return (<div> 
                                          <h1>{this.props.student}</h1>
                                          <BarChart width={730} height={250} data={this.props.scoresHistogram}>
                                            <XAxis dataKey="opdracht" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="moeilijkGrade" fill="#8884d8" />
                                          </BarChart>
                                      </div>)
              case "Leuk" : return (<div> 
                                          <h1>{this.props.student}</h1>
                                          <BarChart width={730} height={250} data={this.props.scoresHistogram}>
                                             <XAxis dataKey="opdracht" />
                                             <YAxis />
                                             <Tooltip />
                                             <Bar dataKey="leukGrade" fill="#98FF98" />
                                          </BarChart>
                                       </div>)
              case "default" : return (<h1>Onverwachte keuze</h1>)
            } 
            
}
}
export default MaakHistogram