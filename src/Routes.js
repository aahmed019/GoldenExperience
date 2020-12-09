import React,{useState} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import { useAuth } from './contexts/AuthContext';
import Fire from './firebaseConfig';
import ChefPage from './components/ChefPage/ChefPage';
import DeliveryPage from './components/DeliveryPage/DeliveryPage';
import ManagerPage from './components/Manager/Manager';
import LandingPage from './components/LandingPage/Landingpage';
export default function Routes(){
    const {currentUser} = useAuth();
    const [user, setUser] = useState("");
    let database = Fire.db
    database.getCollection('Staff').doc(currentUser.email).get().then(function(doc){
        if(doc.exists){
            setUser(doc.data().Position)
        }
    })

    return(
        <>
            <Switch>
                {user === 'Chef' || user === 'Manager' ? (<Route exact path = '/Chef' component={ChefPage}/>):
                (<Route exact path="/" component={LandingPage} />)}

                {user === 'Driver' || user === 'Manager' ? (<Route exact path = '/DeliveryPage' component={DeliveryPage}/>):
                <Route exact path="/" component={LandingPage} />}

                {user === 'Manager' ? (<Route exact path = '/Manager' component={ManagerPage}/>):
                (<Route exact path="/" component={LandingPage} />)}
            </Switch>
        </>
    )

} 