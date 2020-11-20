import React, { useEffect, useState } from 'react';
import './Menu.css'
import Fire from '../../firebaseConfig';

const storage = Fire.db.getStorage();

export default function Menu(){
    const[menu, setMenu] = useState('')
    //similar to componentDidMount
    useEffect(() =>{
        storage.child('menu.jpg').getDownloadURL().then((url) => {
            setMenu(url)
            }).catch(function(error){
                console.log(error)
            }) 
            
    })

    return(
        <div className ='container'>
            <div>
                <h2>Menu</h2>
                <img id="menu" style ={{paddingTop:'20px' ,width: '800px', height:'600px'}} src={menu} alt =""/>
            </div>
                       
        </div>
    )
}