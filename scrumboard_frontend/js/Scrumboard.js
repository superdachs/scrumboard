import React from 'react'
import {render} from 'react-dom'
import TaskCard from './TaskCard'
import preload from '../data.json'
import '../public/style.css'

const Scrumboard = React.createClass({

  getInitialState () {
    return {
      tasks: preload.tasks
    }
  },

  prev (evt) {
    let id = evt.target.className
    console.log(evt.target.className)
    let tasks = this.state.tasks
    console.log(tasks)
    let task = tasks.filter((task) => {
      console.log(task.pk === id)
      if (task.pk === id) { return task }
    })
    console.log(task)
    tasks.pop(task)
    if (task.status === 'DONE') { task.status = 'DO' } else { task.status = 'NEW' }
    tasks.push(task)

    this.setState({
      tasks: tasks
    })
  },

  next (evt) {
    let id = evt.target.className
    console.log(evt.target.className)
    let tasks = this.state.tasks
    console.log(tasks)
    let task = tasks.filter((task) => {
      if (task.pk === id) { return task }
    }
    )
    console.log(task)
    tasks.pop(task)
    if (task.status === 'NEW') { task.status = 'DO' } else { task.status = 'DONE' }
    tasks.push(task)

    this.setState({
      tasks: tasks
    })
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
        </table>
      </div>
    )
  }
})

render(<Scrumboard />, document.getElementById('scrumboard'))
