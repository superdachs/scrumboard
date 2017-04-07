import React from 'react'
import {render} from 'react-dom'
import TaskCard from './TaskCard'
import '../public/style.css'
import axios from 'axios'

const token = '78e9516220700adba69f28b1fcdc2b684b48762e'

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
          console.log(response.data)
          this.setTasks(response.data)
        }
    ).catch(
        (error) => {
          console.log(error)
        }
    )
    console.log()
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
                    <TaskCard task={task} prev={this.prev} next={this.next} />
                  )
                }
                            )
                            }
              </td>
              <td>
                {doTasks.map((task) => {
                  return (
                    <TaskCard task={task} prev={this.prev} next={this.next} />
                  )
                }
                            )
                            }
              </td>
              <td>
                {doneTasks.map((task) => {
                  return (
                    <TaskCard task={task} prev={this.prev} next={this.next} />
                  )
                }
                            )
                            }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
})

render(<Scrumboard />, document.getElementById('scrumboard'))
