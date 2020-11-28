import React, {useEffect, useState } from 'react';
import './Manager.css'
import Fire from '../../firebaseConfig';
import 'react-tabs/style/react-tabs.css';


export default function TabooWords() {
    let tests = Fire.db

    const[BadWords, setBadWords] = useState([])
    const[newWord, setNewWord] = useState('')
    
    const getData = async() =>{
        const badWords = []
        tests.getCollection('TabooWords').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                //let currentId = doc.id
                let data = doc.id
                badWords.push(data)
            });
            setBadWords(badWords)
        }).catch(function(error){
            console.log(error)
        })
    }

    useEffect(() =>{
        getData()
    },[])


    async function deleteWord(word){
        await tests.getCollection('TabooWords').doc(word).delete()
        .then(() =>{
            console.log("User deleted from Database")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }

    async function addWord(){
        await tests.getCollection('TabooWords').doc(newWord).set({word: newWord})
        .then(() =>{
            console.log("Added word to taboo list")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }



    return (     
        <div style={{textAlign:'center'}}>
            <h1>Taboo Words</h1>
            <div style={{display:'flex', flexDirection:'row' }}>
            {BadWords.map(function(item, i){
                return <div style={{paddingRight:'2%'}} key={i}>
                <h2>{item}</h2>
                <button onClick={() => {deleteWord(item)}}>Delete</button>
                <br/>
                <br/>
                </div>
            })}
            <input style={{width: '15%'}}type='text' value={newWord} onChange={e => setNewWord(e.target.value)}></input>
            <button onClick={() => addWord()} style={{position:'bottom'}}>Add word</button>
            </div>
            
        </div>
   

        );

    
}