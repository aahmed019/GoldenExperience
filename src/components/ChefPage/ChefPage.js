import React, { Component } from 'react';
import './ChefPage.css'
import Footer from '../Footer/Footer.js';
import Fire from '../../firebaseConfig';
import {Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import Menu from '../Menu/Menu';

const storage = Fire.db.getStorage();

class ChefPage extends Component {
    constructor(props) {
        super(props);
        this.state = {menu: ''};
        this.db = Fire.db;
      }

    async getMarker() {
        const snapshot = await this.db.getCollection('SignUp').get();
        console.log(snapshot.docs.map(doc => doc.data()));
    }

    async uploadFile(e){
        const file = e.target.files[0];
        console.log(file.name)
        const storageRef = Fire.db.getStorage()
        const menuRef = storageRef.child(file.name)
        menuRef.put(file)

       await menuRef.getDownloadURL().then(function(url){
           var img = document.getElementById('imgTest')
           img.src = url
       }).catch(function(error){
           console.log(error)
       }) 
    }

    

    render(){
        return (
            <div>
                <div className='background-boi'>
                    <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
                        <TabList>
                            <Tab>Upload Menu</Tab>
                            <Tab>Menu</Tab>
                            <Tab>Orders</Tab>
                            <Tab>Disputes</Tab>
                        </TabList>
                        <TabPanel>

                            <div className='container'>
                                <br />
                                <br />
                                <input type="file" onChange={this.uploadFile}></input>
                                <div>
                                    <img id="imgTest" style={{ paddingTop: '20px', width: '800px', height: '600px' }} src='' alt="" />
                                </div>

                            </div>

                            <Footer />
                        </TabPanel>

                        <TabPanel>
                            <Menu />
                            <Footer />
                        </TabPanel>

                        <TabPanel>
                            <h1>Orders</h1>
                            <Footer />
                        </TabPanel>

                        <TabPanel>
                        <h1>Disputes</h1>
                            <Footer />
                        </TabPanel>





                    </Tabs>
                </div>
            </div>

        );

    }
}
export default ChefPage;

/* <div className ='background-boi'>
                    <div className ='container'>
                    <br/>
                            <br/>
                        <input type ="file" onChange = {this.uploadFile}></input>
                        <div>
                        <img id="imgTest" style ={{paddingTop:'20px' ,width: '800px', height:'600px'}} src='' alt ="You have not uploaded any menus yet"/>
                        </div>
                    </div>
                </div>
                <Footer />  */