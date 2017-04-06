import React from 'react'
import { render } from 'react-dom'
import TaskCard from './TaskCard'
import preload from '../data.json'
import '../public/style.css'

const Scrumboard = React.createClass({
  render () {
    return (
      <div className='scrumboard'>
        <table>
          <tr><th>NEW</th><th>DOING</th><th>DONE</th></tr>
          <tr><td>
            {preload.tasks.map((task) => {
              if (task.status === 'NEW') {
                return (

                  <TaskCard task={task} />
                )
              }
            })
        }
          </td><td>
            {preload.tasks.map((task) => {
              if (task.status === 'DO') {
                return (

                  <TaskCard task={task} />
                )
              }
            })
        }
          </td><td className='lastCol'>
            {preload.tasks.map((task) => {
              if (task.status === 'DONE') {
                return (

                  <TaskCard task={task} />
                )
              }
            })
        }
          </td></tr>
        </table>

      </div>
    )
  }
})

render(<Scrumboard />, document.getElementById('scrumboard'))
