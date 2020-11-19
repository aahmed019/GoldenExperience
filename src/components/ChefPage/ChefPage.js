import React, { Component } from 'react';
import './ChefPage.css'
import Footer from '../Footer/Footer.js';
import Fire, { TestsFire } from '../../firebaseConfig';

class ChefPage extends Component {
    constructor(props) {
        super(props);
        this.state = {value: props.user};
        this.db = Fire.db;
      }

    async getMarker() {
        const snapshot = await this.db.getCollection('SignUp').get();
        console.log(snapshot.docs.map(doc => doc.data()));
    }

    uploadFile(e){
        const file = e.target.files[0];
        console.log(file.name)
        const storageRef = Fire.db.getStorage()
        const menuRef = storageRef.child(file.name)
        menuRef.put(file)

       menuRef.getDownloadURL().then(function(url){
           var img = document.getElementById('imgTest')
           img.src = url
       }).catch(function(error){
           console.log(error)
       }) 
    }

    render(){
        return (
            <div>
                <div className ='background-boi'>
                    <div className ='container'>
                    <br/>
                            <br/>
                        <input type ="file" onChange = {this.uploadFile}></input>
                        <div>
                        <img id="imgTest" style ={{paddingTop:'20px' ,width: '800px', height:'600px'}} src='' alt ="You have not uploaded any menus yet"/>
                        </div>
                    </div>
                </div>
                <Footer />  
            </div>

        );

    }
}
export default ChefPage;