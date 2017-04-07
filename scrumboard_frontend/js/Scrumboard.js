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
    let tasks = this.state.tasks
    let task = tasks.filter((t) => {
      if (t.pk.toString() === id.toString()) { return t }
    })[0]
    if (task.status === 'DONE') { task.status = 'DO' } else { task.status = 'NEW' }

    this.setState({
      tasks: tasks
    })
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
