import React, { useState } from 'react';
import User from './components/Todos';
import UniqueID from 'react-html-id';

class App extends React.Component {
  
  constructor(){
    super();
    UniqueID.enableUniqueIds(this);
    this.state = {
        todos:[
          {id:this.nextUniqueId(), todo:'Eat'},
          {id:this.nextUniqueId(), todo:'Sleep'},
          {id:this.nextUniqueId(), todo:'Read'},
        ],
        temp_todo : '',
        temp_edit :''
      };

      console.log(this.state)
      this.updateInput = this.updateInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  //id is a quique key that can track changes and update only the changesd parts
  //so it doesnt have to render the enitrer list


  deleteTodo = (index, e) => {
    console.log(this.nextUniqueId())
    //const users = [...this.state.users];
    const todos = Object.assign([], this.state.todos);
    todos.splice(index, 1);
    this.setState({todos:todos});
  }

  changeUserName = (id, event) => {
    if (event.target.value.length === -1) {
      return;
    }
    const index = this.state.todos.findIndex((todo)=> {
        return (todo.id === id);
    })

    const todo = Object.assign({}, this.state.todos[index]);
    todo.todo = event.target.value;

    const todos = Object.assign([], this.state.todos);
    todos[index] = todo;

    this.setState({todos:todos});
  }
  updateInput(event){
    console.log(event.target.value)
    this.setState({temp_todo : event.target.value})
    }
    
    
    handleSubmit(){
    console.log('Your input value is: ' + this.state.temp_todo)
    if(this.state.temp_todo !== ''){
       /*console.log('data needs to be stored')*/
       const todos = Object.assign([], this.state.todos);
       const new_todo = {id:this.nextUniqueId() , todo : this.state.temp_todo}
       this.setState({todos : [...todos , new_todo]})
    }
    else{
      console.log('no need of storage')
    }
    //Send state to the server code
    }
  render(){
    console.log(this.state.todos);
    return (
      <div>
        <h1>Todo Matic</h1>
        <h2>What needs to be done?</h2>
        <input type="text" onChange={this.updateInput}></input>
        <input type="submit" onClick={this.handleSubmit} ></input><br />
        <button>All</button>
        <button>Completed</button>
        <button>Active</button>
        <ul>
          {
            
            this.state.todos.map((todo, index) => {
              return (<div><User
                delEvent={this.deleteTodo.bind(this,index)}
                changeEvent={this.changeUserName.bind(this, todo.id)}
                key={todo.id } >{todo.todo}</User></div>)
                {/*key is to avoid the warning*/}
            })
          }
        </ul>
      </div>
    )
  }
}
export default App;