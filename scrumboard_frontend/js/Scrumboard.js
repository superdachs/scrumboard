import React from 'react'
import {render} from 'react-dom'
import TaskCard from './TaskCard'
import '../static/style.css'
import axios from 'axios'

const token = '2960f0bb266cce6e2d0834c348f9b8912bee9245'

const Scrumboard = React.createClass({

  setTasks (tasks) {
    this.setState(
      {
        tasks: tasks
      }
    )
  },

  getDataFromApi () {
    axios.get('http://127.0.0.1:8000/tasks/').then(
        (response) => {
          this.setTasks(response.data)
        }
    ).catch(
        (error) => {
          console.log(error)
        }
    )
  },

  updateTaskToApi (task) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + token
    axios.patch('http://127.0.0.1:8000/tasks/' + task.pk.toString() + '/', task)
  },

  getInitialState () {
    this.getDataFromApi()
    return {
      tasks: []
    }
  },

  addTask (evt) {
    console.log('adding task')
    let title = document.getElementById('addTitle').value
    let description = document.getElementById('addDescription').value
    let points = document.getElementById('addPoints').value
    let task = {
      'title': title,
      'description': description,
      'points': points,
      'status': 'NEW'
    }
    axios.defaults.headers.common['Authorization'] = 'Token ' + token
    axios.post('http://127.0.0.1:8000/tasks/', task)
  },

  removeTask (evt) {
    let id = evt.target.className
    let tasks = this.state.tasks
    let task = tasks.filter((t) => {
      if (t.pk.toString() === id.toString()) { return t }
    })[0]
    tasks.pop(task)
    axios.defaults.headers.common['Authorization'] = 'Token ' + token
    axios.delete('http://127.0.0.1:8000/tasks/' + task.pk.toString() + '/')

    this.setState({
      tasks: tasks
    })
  },

  prev (evt) {
    let id = evt.target.className
    let tasks = this.state.tasks
    let task = tasks.filter((t) => {
      if (t.pk.toString() === id.toString()) { return t }
    })[0]
    if (task.status === 'DONE') { task.status = 'DO' } else { task.status = 'NEW' }

    this.setState({
      tasks: tasks
    })
    this.updateTaskToApi(task)
  },

  next (evt) {
    let id = evt.target.className
    let tasks = this.state.tasks
    let task = tasks.filter((t) => {
      if (t.pk.toString() === id.toString()) { return t }
    }
    )[0]
    if (task.status === 'NEW') { task.status = 'DO' } else { task.status = 'DONE' }

    this.setState({
      tasks: tasks
    })
    this.updateTaskToApi(task)
  },

  render () {
    let newTasks = []
    let doTasks = []
    let doneTasks = []
    this.state.tasks.map((task) => {
      if (task.status === 'NEW') {
        newTasks.push(task)
      } else if (task.status === 'DO') {
        doTasks.push(task)
      } else if (task.status === 'DONE') {
        doneTasks.push(task)
      }
    }
        )

    return (

      <div className='scrumboard'>
        <table>
          <tbody>
            <tr>
              <th>NEW</th>
              <th>DOING</th>
              <th>DONE</th>
            </tr>
            <tr>
              <td>
                {newTasks.map((task) => {
                  return (
                    <TaskCard task={task} prev={this.prev} next={this.next} delete={this.removeTask} />
                  )
                }
                            )
                            }
              </td>
              <td>
                {doTasks.map((task) => {
                  return (
                    <TaskCard task={task} prev={this.prev} next={this.next} delete={this.removeTask} />
                  )
                }
                            )
                            }
              </td>
              <td>
                {doneTasks.map((task) => {
                  return (
                    <TaskCard task={task} prev={this.prev} next={this.next} delete={this.removeTask} />
                  )
                }
                            )
                            }
              </td>
            </tr>
          </tbody>
        </table>
        <div className='addTask'>
          <form id='addTaskForm'>
            <a>title: </a><input id='addTitle' type='text' label='title' /><br />
            <a>description: </a><input id='addDescription' type='text' label='description' /><br />
            <a>points: </a><input id='addPoints' type='text' label='points' /><br />
            <button className='addButton' onClick={this.addTask}>ADD</button>
          </form>
        </div>
      </div>
    )
  }
})

render(<Scrumboard />, document.getElementById('scrumboard'))
