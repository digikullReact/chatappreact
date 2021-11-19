import React,{useEffect,useState} from 'react'
import socketClient, { io } from 'socket.io-client'

const Socket = () => {
    const [message,setMessage]=useState("");
    const [socketObj,setSocketObj]=useState(null);
    const [messageArray,setMessageArray]=useState([]);


    const handleChange=(event)=>{
        setMessage(event.target.value)
    }

    const emitMessage=()=>{
        socketObj.emit("message",message);

    }

    useEffect(() => {
     const io=socketClient("/");



     io.on("connect",()=>{
         console.log("connected");
         setSocketObj(io);
     })

     io.on("receive",(message)=>{
        messageArray.push(message);
        setMessageArray([...messageArray]);

     })
        
        return () => {
            io.disconnect();
        }
    }, [])
    return (
        <div className="container">
            <div className="row" style={{marginTop:"100px"}}>
            <div className="col-4 offset-md-4">
            <input type="text" className="form-control" onChange={handleChange}/>
            <br></br>
            <button className="btn btn-warning" onClick={emitMessage}>
                Send Message
            </button>

            </div>

            
        </div>

        <div className="row" style={{marginTop:"100px"}}>
            <div className="col-4 offset-md-4">
                {
                    messageArray.map((ele,i)=>(
                        <div  key={i} className="alert alert-success" role="alert">{ele}</div>


                    ))
                }


            
        </div>
            </div>
      

        </div>

    
        

        
    )
}

export default Socket
