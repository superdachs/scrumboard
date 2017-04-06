import React from 'react'

const TaskCard = React.createClass({

  propTypes: {
    task: {
      title: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired,
      points: React.PropTypes.number.isRequired,
      status: React.PropTypes.string.isRequired,
      pk: React.PropTypes.number.isRequired
    },
    prev: React.PropTypes.func,
    next: React.PropTypes.func
  },

  render () {
    const { title, description, points, status, pk } = this.props.task
    return (
      <div className='taskcard'>
        <h3 className='header'>{pk} {title}</h3>
        <h3 className='storypoints'>{points}</h3>
        <p className='description'>{description}</p>
        <p className='taskstatus'>{status}</p>
        <button onClick={this.props.prev}>previous</button>
        <button onClick={this.props.next}>next</button>
      </div>
    )
  }
})

export default TaskCard
