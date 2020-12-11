import React, { Component } from 'react';
import './ChefPage.css'
import Footer from '../Footer/Footer.js';
import Fire from '../../firebaseConfig';
import {Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import Menu from '../Menu/Menu';
import FoodItems from './FoodItems';
import NewOrders from './NewOrders';

class ChefPage extends Component {
    
    constructor(props) {
        super(props);
        this.db = Fire.db;
        this.state = {menu: ''};

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
            <div className='chef-background-boi'>
                <div>                    
                    <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
                        <TabList>
                            <Tab>Upload Menu</Tab>
                            <Tab>Menu</Tab>
                            <Tab>Orders</Tab>
                            <Tab>Disputes</Tab>
                            <Tab>Food Item</Tab>
                        </TabList>
                        <TabPanel>
                            <h1>Upload menu files should be titled morningMen.jpg or EveningMenu.jpg</h1>
                            <div style={{textAlign:'center'}}>
                                <br />
                                <br />
                                <input type="file" onChange={this.uploadFile}></input>
                            </div>
                            
                        </TabPanel>

                        <TabPanel>
                            <Menu />
                        </TabPanel>

                        <TabPanel>
                            <NewOrders/>
                        </TabPanel>

                        <TabPanel>
                        <h1>Disputes</h1>
                        </TabPanel>

                        <TabPanel>
                        <h1>Food Item</h1>
                           <FoodItems></FoodItems>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>

        );

    }
}
export default ChefPage;