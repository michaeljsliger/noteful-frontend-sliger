import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }



    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Items not properly sourced from server. Check that you have it set up properly.</h2>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;