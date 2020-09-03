import React from 'react';
import { ReactComponent } from '*.svg';

class ErrorBoundary extends React.Component{
    constructor(props){
        super(props)
        this.state={hasError: false}
    }
    static getDerivedStateFromError(error){
        return {hasError: true}
    }

    render (){
        return(
            <div>
                something went wrong
            </div>
        )
    }
}
 
export default ErrorBoundary;
