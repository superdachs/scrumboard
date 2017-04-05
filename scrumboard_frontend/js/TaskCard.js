import React from 'react'

const TaskCard = React.createClass({

  propTypes: {
    task: {
      title: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired,
      points: React.PropTypes.number
    }
  },

  render () {
    const { title, description, points } = this.props.task
    return (
      <div className='taskcard'>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{points}</p>
      </div>
    )
  }
})

export default TaskCard
