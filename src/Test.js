import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

class Test extends React.Component {
    render() {
        return (
            <div>
                <div>Hello</div>
                <button onClick={()=>{this.props.history.push('/')}}>Click</button>
            </div>

        )
    }
}

export default connect(store => ({store: store}))(withRouter(Test))