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
    next: React.PropTypes.func,
    delete: React.PropTypes.func
  },

  render () {
    const { title, description, points, pk } = this.props.task
    return (
      <div className='taskcard'>
        <h3 className='header'>#{pk} - {title}</h3>
        <h3 className='storypoints'>{points}</h3>
        <p className='description'>{description}</p>
        <button className={pk} onClick={this.props.prev}>previous</button>
        <button className={pk} onClick={this.props.next}>next</button>
        <button className={pk} onClick={this.props.delete}>DELETE</button>
      </div>
    )
  }
})

export default TaskCard
