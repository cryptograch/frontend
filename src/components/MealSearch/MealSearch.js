import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from '../../LazyLoad/LazyLoad';
import { fetchMealList, meallistclear } from '../../actions/mealaction';

import { connect } from 'react-redux';

class MealSearch extends Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }
    componentDidMount(){
        this.props.fetchMealList();
    }
    refresh() {
        // клиар запилы
        this.props.fetchMealList();
    }
    renderList(){
        if (meallist) {
            return this.props.meallist.meallist.map((item, key) => {
                return (
                    <div key={key}>
                        
                    </div>
                )
            });
        }
    }
    renderLazyLoad() {
        if (!this.props.mealData.all) {
            return <LazyLoad loading={this.props.mealData.loading} do={() => { this.props.fetchMealList() }} />
        }
        return null;
    }

    render(){
        return (
            <div>
                <div className={style.MealHead}>
                    <h1>AVAILABLE MEALS</h1>
                    <div className={profilestyle.refreshBtn} onClick={this.refresh.bind(this)}>
                        <img src={refreshsvg} alt='refresh'/>
                    </div>
                </div>
                <div className={style.MealList}>
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

    MealSearch.PropTypes = {
        meallData: PropTypes.object,
        meallistclear: PropTypes.func,
        fetchMealList: PropTypes.func,

    }
    mapStateToProps = state => ({
        meallData: state.mealData,
    });
    mapDispatchtoProps = dispatch => ({
        fetchMealList: () => {dispatch(fetchMealList())},
        meallistclear: () => {dispatch(meallistclear())}
    });

export default (mapStateToProps, mapDispatchtoProps)(MealSearch);