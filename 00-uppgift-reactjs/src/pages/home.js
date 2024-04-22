import React, { Component} from "react";


export class Home extends Component{
    //constructor checks if there has been a value stored in session for darkmode, if not then the default is light mode
    constructor(props){
        super(props);
        const darkmode = sessionStorage.getItem("darkmode")
        this.state = {
            on: darkmode === "true" 
        }
        console.log(this.state.on);
    }
    //updates color of body on checkbox toggle
    componentDidUpdate() {
        this.updateBody();
      }
    //updates color of body after rendering
    componentDidMount() {
        this.updateBody();
    }
    updateBody = () => {
        const _body = document.body;
        if(this.state.on){
            _body.classList.add("bg-dark");
        }
        else{
            _body.classList.remove("bg-dark")
            sessionStorage.removeItem("darkmode");
        }}
    //saves darkmode preference in callback function
    useDarkmodeToggle = (e) => {
            this.setState({
                on: !this.state.on
            }, ()=> sessionStorage.setItem("darkmode", this.state.on))
            
    }
render(){
    return (
        <>
        <main>

            <div className="container px-4 py-4" id="home">
                <div className="p-5 rounded" id = "middleBody">
                    <div className="col-sm-8 py-5 mx-auto">
                        <h1 className="display-5 fw-normal">Welcome to my music app</h1>
                            <p className="fs-5">This is an application that displays music groups and is written by Torsten Ek</p>
                    </div>
                </div>
                <div class="col-sm-8 py-5 mx-auto">
                    <p class="fs-5">Dark Mode</p>
                    <label class="switch">
                        <input type="checkbox" id="darkmodeSwitch" 
                                onClick = {this.useDarkmodeToggle} 
                                defaultChecked = {this.state.on}>
                        </input>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>

        </main>
        </>
    )
}
}
export default Home