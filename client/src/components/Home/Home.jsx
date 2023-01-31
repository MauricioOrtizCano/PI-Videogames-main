import React from "react";
import NavBar from "../NavBar/NavBar";
import AllCards from "../AllCards/AllCards";




const Home = () => {
    
    return (
        <div className="Home">
            <div>
                <NavBar />
            </div>
            <div>
                <AllCards />
            </div>
        </div>
    )
};


export default Home;