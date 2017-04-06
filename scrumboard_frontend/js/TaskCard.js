import React from 'react'

const TaskCard = React.createClass({

  propTypes: {
    task: {
      title: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired,
      points: React.PropTypes.number.isRequired,
      status: React.PropTypes.string.isRequired
    }
  },

  render () {
    const { title, description, points, status } = this.props.task
    return (
      <div className='taskcard'>
        <h3 className='header'>{title}</h3>
        <h3 className='storypoints'>{points}</h3>
        <p className='description'>{description}</p>
        <p>{status}</p>
      </div>
    )
  }
})

export default TaskCard
