import React from 'react';
import '../../../public/scss/IconButton.scss';

export default function IconButton({children = <></>, disabled, className = '', onClick=()=>console.log('i\'ve been clicked!') }, ...props) {
    function clickHander(){
        if(!disabled){
            onClick();
        }
    }
    
    return (
        <div
            {...props}
            onClick={clickHander}
            className={`iconButton` + className}
        >
            {children}
        </div>
    )
}
