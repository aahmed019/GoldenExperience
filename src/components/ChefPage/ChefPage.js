import React, { Component } from 'react';
import './ChefPage.css'
import Footer from '../Footer/Footer.js';
import Fire from '../../firebaseConfig';
import {Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import Menu from '../Menu/Menu';

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
                            </div>
                            
                        </TabPanel>

                        <TabPanel>
                            <Menu />
                            
                        </TabPanel>

                        <TabPanel>
                            <h1>Orders</h1>
                            
                        </TabPanel>

                        <TabPanel>
                        <h1>Disputes</h1>
                            
                        </TabPanel>
                    </Tabs>
                </div>
                <Footer />
            </div>

        );

    }
}
export default ChefPage;