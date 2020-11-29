import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'

export default class SuccessPage extends Component{

            continue= e=>{
                e.preventDefault();
                this.props.NextStep();
            }
            goBack= e=>{
                e.preventDefault();
                this.props.PrevStep();
            }
            render(){
                return(
                    <div className="CheckOut">
                    <h1>Success Page</h1>
                    <div>
                    <Button variant="primary"  onClick={this.goBack}>Prev</Button>
                    </div>
                </div>
                )
            }
            
        
        }
