import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



class Questions extends Component {

  constructor(props){
    super(props);

    this.state={
      question:[]
    }
  }

  componentDidMount(){

    axios.get('http://localhost:8081/')
    .then((response)=> this.setState({ question: this.state.question.concat(response.data)  }))
    .catch((error)=>console.log(error))
  }
  render() {
    const questions = this.state.question.map((q)=>(
      <div>
        <p>{q.id}</p>
        <p><b>Title: </b>{q.title}</p>
        <p><b>Description: </b>{q.description}</p>
        <p><b>Answer: </b>{q.answer[0]} ...</p>
        <Link to={`/question/${q.id}`}>
        more
        </Link>
      </div>
    ))
    return (
      <div >
      {questions}
      <br/>
      <br/>
      <Link to='/newQuestion'>
      Question ? feel free !
      </Link>
       <h1>Construction going ...</h1>
      </div>
    );
  }
}

export default Questions;
