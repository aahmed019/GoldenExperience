import React, { useEffect, useState } from 'react';
import './Menu.css'
import Fire from '../../firebaseConfig';
import Footer from '../Footer/Footer';

const storage = Fire.db.getStorage();

export default function Menu(){
    const[morningMenu, setMorningMenu] = useState('')
    const[eveningMenu, setEveningMenu] = useState('')
    //similar to componentDidMount

    const getData = async() =>{
        storage.child('morningMenu.jpg').getDownloadURL().then((url) => {
            setMorningMenu(url)
            }).catch(function(error){
                console.log(error)
            }) 
    }

    useEffect(() =>{
        storage.child('eveningMenu.jpg').getDownloadURL().then((url) => {
            setEveningMenu(url)
            }).catch(function(error){
                console.log(error)
            })
            getData()      
    },[])

    return(
        <div className='chef-background-boi'> 
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <div>
                    <h2>Morning Menu</h2>
                    <img id="menu" style ={{paddingTop:'20px', paddingRight:'20%', width: '800px', height:'800px'}} src={morningMenu} alt =""/>
                </div>
                <div>
                    <h2>Evening Menu</h2>
                    <img id="menu" style ={{paddingTop:'20px' ,width: '800px', height:'900px'}} src={eveningMenu} alt =""/>
                </div>
                
            </div>
            <br/>
                <br/>
                <br/>
                <br/>
                <Footer/>
        </div>
    )
}