import React, { Component } from 'react';
import { Route, Link, Switch, NavLink } from 'react-router-dom';
import api from '.././api';
import wip from '../img/wip.jpg';

class Todolist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opps : [],
      selectedOpp:'',
      selectedNote:'',
      datas:''
    } 
    
  };


   render() {
                
    return (
      <div className="Todolist"> 
        <img src={wip} className= 'imageTodo' alt='Work in Progess'/>
        <div className='text'>Work in Progress</div>

      </div>
   )}
}

export default Todolist;

