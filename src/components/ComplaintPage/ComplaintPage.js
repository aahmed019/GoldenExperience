import React, { Component } from 'react';
import Footer from '../Footer/Footer.js'
import {Link} from 'react-router-dom';
import {Row} from "react-bootstrap";
import './ComplaintPage.css'
import queryString from 'query-string'

class ComplaintPage extends Component{
    render(){
        const value = queryString.parse(this.props.location.search);
        const usertype = value.usertype;
        const username = value.username;
        console.log(usertype);
        console.log(username);
        console.log(this.state);
        var showComplimentForm = false;
        var showComplaintForm = false;
        if(usertype === "manager"){

        }else{
            return(
                <div>
                <div className ='background-boi'>
                    <div className = "container">
                        <div class="row" style = {{backgroundColor: "green"}}>
                            <div class="column" style = {{backgroundColor: "blue"}} >
                                <h2>Submit Compliment</h2>
                                <form>
                                    <h3>username:</h3>
                                    <input type="text" compliment_user="compliment_user"/><br></br>
                                    <input type="button" value="Submit" onClick={() => showComplimentForm = true}/>
                                </form>
                                <div id="compliment_form" style={{ display: showComplimentForm ? "block" : "none" }}>
                                    <p>postulant periculis vel an, mea modus similique no.</p><br></br>
                                    <p>Eam oporteat oportere scribentur ad, mel ea oporteat probatus.</p><br></br>
                                    <p>At offendit suscipiantur pri, dicant corrumpit id vis.</p><br></br>
                                    <p>Odio fierent imperdiet duo cu, ad democritum appellantur duo, ex ancillae conceptam pri.</p><br></br>
                                </div>
                            </div>
                            <div class="column" style = {{backgroundColor: "purple"}}>
                                <h2>Submit Complaint</h2>
                                <form>
                                    <h3>username:</h3>
                                    <input type="text" complaint_user="complaint_user"/><br></br>
                                    <input type="button" value="Submit" onClick={() => showComplaintForm = true}/>
                                </form>
                                <div id="complaint_form" style={{ display: showComplaintForm ? "block" : "none" }}>
                                    <p>postulant periculis vel an, mea modus similique no.</p><br></br>
                                    <p>Eam oporteat oportere scribentur ad, mel ea oporteat probatus.</p><br></br>
                                    <p>At offendit suscipiantur pri, dicant corrumpit id vis.</p><br></br>
                                    <p>Odio fierent imperdiet duo cu, ad democritum appellantur duo, ex ancillae conceptam pri.</p><br></br>
                                </div>
                            </div>
                        </div>
                        <div style = {{backgroundColor: "red"}}>
                                <h1 style = {{verticalAlign: "top"}}>Display active complaint threads here</h1>
                        </div>
                    </div>
                </div>
                <Footer/>
                </div>
            )
        }
    }
}
export default ComplaintPage