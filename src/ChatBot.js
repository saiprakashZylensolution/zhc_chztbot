import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import ReactMarkdown from "react-markdown";
function ChatBot() {
    const [status, setStatus] = useState(true)
    const [ques, setQues] = useState('')
    const [chatHistory, setChatHistory] = useState([]);
    const apiKey ='AIzaSyBee6pXZw6rc-qhHy1M-xswPsy3IqxHIyo'
    const genAI = new GoogleGenerativeAI(apiKey);

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };
    
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        generationConfig:generationConfig,
        systemInstruction:"ZHC stand for zylen health care.zylen is a small scale company in chennai,Zylen has extensive experience developing innovative software solutions for the health tech and pharma industries. Leverage cutting-edge technologies to improve patient outcomes, optimize workflows, and enhance security and compliance. Get a free consultation now to achieve higher levels of healthcare automation.EHR and EMR Software Telemedicine and Telehealth Platforms Drug Discovery and Development Patient Monitoring System Hospital Management System Clinical Trials Management.The financial success of healthcare service providers depends on effective revenue cycle management (RCM) in the constantly changing healthcare landscape. SeaBreeze, a renowned healthcare service provider in a Florida, USA, realized the importance of having a comprehensive RCM solution to improve their operations and financial outcomes. This case study examines how Zylen healthcare works.",
    
    });

    const sendMessage = async ()=>{
        if (ques.trim() === "") return;
        try {
            const result = await model.generateContent(ques);
            const response = await result.response;
            console.log(response);
            setChatHistory([
              ...chatHistory,
              { type: "user", message: ques },
              { type: "bot", message: response.text() },
            ]);
          } catch {
            console.error("Error sending message");
          } finally {
            setQues("");
            // setIsLoading(false);
          }
    }
    return (
        <div>
            {
                status ? (<div className=' position-fixed bot-icon' onClick={() => { setStatus(false) }}>
                    <FontAwesomeIcon icon={faComments} className='faComments' />
                </div>) : (<div className='chatBox'>
                    <div className='d-flex header justify-content-between align-items-center'>
                        <p className='fs-4 fw-bold mb-0'>Zylen AI assistant &#10024;</p>
                        <p className='mt-2 mb-0' onClick={() => [setStatus(true)]}><FontAwesomeIcon icon={faXmark} className='xmark' /></p>
                    </div>
                    <div className='outerDiv'>
                    <div className='textarea d-flex justify-content-end flex-column'>
                        {chatHistory.map((message, index) => (
                            <div
                                key={index}
                                className={`d-flex mx-2 ${message.type === "user"
                                        ? " justify-content-end"
                                        : " justify-content-start"
                                    }`}
                            >
                                <div className='text-round'>
                                    <ReactMarkdown >{message.message}</ReactMarkdown>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                    <div className='footer position-relative'>
                        <input type='text' value={ques} className='chat-input' onChange={(e) => {
                            setQues(e.target.value)
                        }} />
                        <FontAwesomeIcon className=' position-absolute' icon={faPaperPlane} style={{
                            color: "#0563dd", height: '35px',
                            top: '15px',
                            right: '15px'
                        }} onClick={() => {sendMessage()}} />
                    </div>
                </div>)
            }
        </div>
    )
}

export default ChatBot