import './Chatbox.css';
import { useState, useEffect } from 'react';
import App from './App';
import { MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { RiChatPrivateFill } from 'react-icons/ri';



import firebase from './firebaseConfig';     //ดึงconfigที่เพิ่งจะทำมาเตรียมใช้งาน

const chatroomRef = firebase.database().ref('chatroom-1');

function Chatbox() {

  const [text, setText] = useState("");
  const [lines, setLines] = useState([]);

  const[name, setName] = useState("ELIJA");

  useEffect(() =>{
    chatroomRef.on('child_added', snapshot => {
      let x = snapshot.val();
      setLines(l =>[...l, {
        sender : x.sender,
        message : x.message
        , timestamp : (new Date(x.timestamp))
      }])
    })
  }, []);

  const onTextChange = (event) => {
    setText(event.target.value);
  };

  const onSend = () =>{
   chatroomRef.push({
    sender : name,
    message: text,
    timestamp: firebase.database.ServerValue.TIMESTAMP

   });
 
    setText("");
  };

  // const keypass = (event) =>{
  //   if (event.which ===13){
  //     onSend();
  //   }
  // }

  return (
    <App>
     <div className="App">
       <div className="App-chatroom">
         {
           lines.map(x =>{
               return <div className="App-chatroom-text">
                 <div className="App-message">
                   {x.sender+":"}
                   {x.message}
                 </div>
                  {<div className="App-time">
                      {x.timestamp.toLocaleString()}
                  </div>}
                 </div>
                 
           }
           )
         }
       </div>
       <div className="App-textbox">
       <div className="App-setting">
       <Link to="/friend-list">
             <div>
               <MdSettings size = "2em" color = "white"/> 
               </div>
             </Link>
             <Link to="/DarkChat">
             <div>
               <RiChatPrivateFill size = "2em" color = "white"/> 
               </div>
             </Link>
       </div>
         <input type="text" className="App-textbox-input" value={text} onChange={onTextChange}/>
         <div className="App-textbox-send" onClick={onSend}>Send!</div>
       </div>
     </div>
    </App>
  );
}

export default Chatbox;
