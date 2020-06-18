import React, { Component } from 'react';
import './BulkSMS.css';

class SingleSMS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '',
        body: ''
      },
      submitting: false,
      error: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState({ submitting: true });
    fetch('/api/single', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.message)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: '',
              body: ''
            }
          });
          alert("Sent Successfully");
        } else {
          this.setState({
            error: true,
            submitting: false
          });
          alert("Error Occurred, Try Again Later");
          window.location.reload(false);
        }
      });
  }
 
  

  onHandleChange(event) {
    const name = event.target.getAttribute('name');
    this.setState({
      message: { ...this.state.message, [name]: event.target.value },
    });
  }

  render() {
    return (
      <div className="card mb-3">
      <div className="card-header">Send Single SMS</div>
      <div className="card-body">
      <form
        onSubmit={this.onSubmit}
        className={this.state.error ? 'error sms-form' : 'sms-form'}
      >
        
        <div>
          <label htmlFor="to">To:</label>
          <input
            type="tel"
            name="to"
            className="form-control from-control-lg"
            id="to"
            value={this.state.message.to}
            onChange={this.onHandleChange}
          />
        </div> 
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            name="body"
            id="body"
            className="form-control from-control-lg"
            value={this.state.message.body}
            onChange={this.onHandleChange}
          />
        </div>
        <button style={{color: "white", backgroundColor: "#17a2b8"}} className="btn btn-light btn-block" type="submit" disabled={this.state.submitting}>
          Send messages
        </button>
      </form>
      </div>
  </div>

    );
  }
}

export default SingleSMS;
