import React from 'react'
import { Redirect } from 'react-router-dom'
import uuid from 'uuid/v4'
import { ColorContext } from '../context/colorcontext' 
const socket  = require('../connection/socket').socket



/**
 * Onboard is where we create the game room.
 */
 



class CreateNewGame extends React.Component {
    state = {
        didGetUserName: false,
        inputText: "",
        gameId: ""
    }

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }
    
    send = () => {
        /**
         * This method should create a new room in the '/' namespace
         * with a unique identifier. 
         */
        const newGameRoomId = uuid()

        // set the state of this component with the gameId so that we can
        // redirect the user to that URL later. 
        this.setState({
            gameId: newGameRoomId
        })

        // emit an event to the server to create a new room 
        socket.emit('createNewGame', newGameRoomId)
    }

    typingUserName = () => {
        // grab the input text from the field from the DOM 
        const typedText = this.textArea.current.value
        
        // set the state with that text
        this.setState({
            inputText: typedText
        })
    }

    render() {
        // !!! TODO: edit this later once you have bought your own domain. 

        return (<React.Fragment>
            {
                this.state.didGetUserName ? 

                <Redirect to = {"/game/" + this.state.gameId}><button className="btn btn-success" style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px"}}>Start Game</button></Redirect>

            :
                

               <body>
                   
                    <link rel="stylesheet" type="text/css" href="/css/styles.css"></link>
                    <div class="topnav">
                    <div class="topnav-left">
                    <a href="#search"><b>Kubix<span class="square">Square</span></b></a>
                    </div>
                    <a class="active" href="#"><i class="fa fa-fw fa-home"></i> Home</a> 
                    <a href="#"><i class="fa fa-fw fa-search"></i> Search</a> 
                    <a href="#"><i class="fa fa-fw fa-envelope"></i> Contact</a> 
                    <a href="#"><i class="fa fa-fw fa-user"></i> Login</a>
                     </div>
                    <h5 style={{textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px"}}><b>Enter Username</b></h5>
                    <input style={{marginLeft: String((window.innerWidth / 2) - 120) + "px", width: "240px"}} 
                           ref = {this.textArea}
                           onInput = {this.typingUserName}></input>
                           
                    <button className="btn btn-primary" 
                        style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "22px",marginBottom: "250px"}} 
                        disabled = {!(this.state.inputText.length > 0)} 
                        onClick = {() => {
                            // When the 'Submit' button gets pressed from the username screen,
                            // We should send a request to the server to create a new room with
                            // the uuid we generate here.
                            this.props.didRedirect() 
                            this.props.setUserName(this.state.inputText) 
                            this.setState({
                                didGetUserName: true
                            })
                            this.send()
                        }}>Continue</button>
                        <footer class="footer">
<div class="l-footer">
<h1>
KubixSquare</h1>
<div>
    <ul>
  <li><a class="active" href="#"><i class="	fas fa-phone-square"></i>+91 88558 55269</a></li>
  <li><a href="#"><i class="fa fa-fw fa-envelope"></i>kubixsquare@gmail.com</a></li>
  <li><a href="#"><i class="fa fa-fw fa-home"></i>Mira Road(East),Thane,Maharashtra,India</a></li></ul>
</div>
</div>
<ul class="r-footer">
<li>
  <h2>
<b>Social</b></h2>
<ul class="box">
<li><a href="#"><b>Facebook</b></a></li>
<li><a href="#"><b>Twitter</b></a></li>
<li><a href="#"><b>Instagram</b></a></li>
<li><a href="#"><b>Linkedin</b></a></li>
</ul>
</li>
<li class="features">
  <h2>
<b>Information</b></h2>
<ul class="box h-box">
<li><a href="#"><b>Blogs</b></a></li>
<li><a href="#"><b>Technical Training</b></a></li>
<li><a href="#"><b>Website Development</b></a></li>
<li><a href="#"><b>Software Development</b></a></li>
<li><a href="#"><b>Certifications</b></a></li>
<li><a href="#"><b>Customer Service</b></a></li>
</ul>
</li>
<li>
  <h2>
<b>Legal</b></h2>
<ul class="box">
<li><a href="#"><b>Privacy Policy</b></a></li>
<li><a href="#"><b>Terms of Use</b></a></li>
<li><a href="#"><b>Contact</b></a></li>
</ul>
</li>
</ul>

<div class="b-footer">
<p>
<b>All rights reserved by ©KubixSquare 2020 </b></p>
</div>
</footer>
                        
                </body>
            
            }
            </React.Fragment>)
    }
}

const Onboard = (props) => {
    const color = React.useContext(ColorContext)

    return <CreateNewGame didRedirect = {color.playerDidRedirect} setUserName = {props.setUserName}/>
    
}

export default Onboard
