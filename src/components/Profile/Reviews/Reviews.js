import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class Reviews extends Component {
     
    constructor(props) {
        super(props);
    }


    render(){
        return (
            <div>
            <div>
                <input  type='text' placeholder="add review"  />
                <button  >SUBMIT</button>
            </div>
            <h1>Your reviews</h1>
            
                <ul>
                    <li>a</li>
                    <li>b</li>
                    <li>c</li>
                    <li>d</li>
                </ul>
            
        </div>
        )
    }
}
const mapStateToProps = state => ({
    
})

const mapDispatchtoProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchtoProps)(Reviews);