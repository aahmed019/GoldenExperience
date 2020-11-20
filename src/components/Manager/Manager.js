import React from 'react';
import './Manager.css'
import Footer from '../Footer/Footer.js';
//import Fire from '../../firebaseConfig';
import {Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import NewUsers from './NewUsers'
import Staff from './Staff';


export default function ManagerPage() {
    
    return (     
        <div style={{textAlign:'center'}}>
            <div className='background-boi'>
                    <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
                        <TabList>
                            <Tab>New Users</Tab>
                            <Tab>Staff</Tab>
                            <Tab>Complaints</Tab>    
                        </TabList>

                        <TabPanel>
                            <NewUsers/>
                        </TabPanel>
                        
                        <TabPanel>
                           <Staff/>
                        </TabPanel>

                        <TabPanel>
                            <h1>Complaints</h1>
                        </TabPanel>
                    </Tabs>
                    
                </div>
                <Footer />
        </div>
        );

    
}


/*
 

*/