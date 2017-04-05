import React from 'react'
import { render } from 'react-dom'
import TaskCard from './TaskCard'
import preload from '../data.json'

const Scrumboard = React.createClass({
  render () {
    return (
      <div className='scrumboard'>
        {preload.tasks.map((task) => {
          return (

            <TaskCard task={task} />
          )
        })
        }
      </div>
    )
  }
})

render(<Scrumboard />, document.getElementById('scrumboard'))
