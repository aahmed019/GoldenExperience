import React from 'react';
import './Manager.css'
import Footer from '../Footer/Footer.js';
//import Fire from '../../firebaseConfig';
import {Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import NewUsers from './NewUsers'
import Staff from './Staff';
import Menu from '../Menu/Menu';
import Users from './Users'
import TabooWords from './Taboo'


export default function ManagerPage() {
    
    return (     
        <div style={{textAlign:'center'}}>
            <div className='background-boi'>
                    <Tabs defaultIndex={5} onSelect={index => console.log(index)}>
                        <TabList>
                            <Tab>New Users</Tab>
                            <Tab>Users</Tab>
                            <Tab>Meun</Tab>
                            <Tab>Staff</Tab>
                            <Tab>Complaints</Tab>
                            <Tab>Taboo words</Tab>
                        </TabList>

                        <TabPanel>
                            <NewUsers/>
                        </TabPanel>

                        <TabPanel>
                            <Users/>
                        </TabPanel>

                        <TabPanel>
                            <Menu/>
                        </TabPanel>
                        
                        <TabPanel>
                           <Staff/>
                        </TabPanel>

                        <TabPanel>
                            <h1>Complaints</h1>
                        </TabPanel>

                        <TabPanel>
                            <TabooWords/>
                        </TabPanel>
                    </Tabs>
                    
                </div>
                <Footer />
        </div>
        );

    
}


/*
 
*/