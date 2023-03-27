import React, { useEffect, useState } from "react";


const Card = ({name, image, count}) => {

    return (
        <>
        <div id={count} style={ {position: "absolute", left: `${count * 15}px`, top: "15%"}}>
            <img src={image}></img>
            <span style={{backgroundColor:"white", display: "block"}}>
                <p>{name}</p>
                <p>{count}</p>
            </span>
        </div>
        
        </>
    )


}


export default Card; 