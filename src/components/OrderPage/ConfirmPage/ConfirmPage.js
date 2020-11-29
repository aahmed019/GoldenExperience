import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'

export default class ConfirmPage extends Component{

 
        
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
                    <h1>Confirm Page</h1>
                    <div>
                    <Button variant="primary"  onClick={this.goBack}>Prev</Button>
                    <Button variant="primary"  onClick={this.continue}>Next</Button>
                    </div>
                </div>
                )
            }
            
        
        }
