import React, { Component } from 'react';
import './SMSForm.css';

class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        numbers: '',
        body: '',
        //file: null
        //selectedFile: null
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
    fetch('/api/bulk', {
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
              numbers: '',
              body: ''
            }
          });
          alert("Done");
        } else {
          this.setState({
            error: true,
            submitting: false
          });
          alert("Error");
        }
      });
  }

  readFile(event) {
    var file = event.target.files[0];
    if (file) {
      new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (evt) {
          resolve(evt.target.result);
        };
        reader.readAsText(file);
        reader.onerror = reject;
      })
      .then(processFileContent.bind(this))
      .catch(function(err) {
        console.log(err)
      });
    }
    function processFileContent(data) {
      this.setState({
        message: { ...this.state.message, numbers: data.split("\n") },
      });
      console.log(this.state);
    }
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
      <div className="card-header">Send Bulk SMS</div>
      <div className="card-body">
      <form
        onSubmit={this.onSubmit}
        className={this.state.error ? 'error sms-form' : 'sms-form'}
      >
        <div>
          <label htmlFor="file">Upload File:</label>
          <input type="file" name="numbers" 
            onChange={this.readFile.bind(this)}/>
        </div> 
        {/* <div>
          <label htmlFor="to">To:</label>
          <input
            type="tel"
            name="to"
            className="form-control from-control-lg"
            id="to"
            value={this.state.message.to}
            onChange={this.onHandleChange}
          />
        </div> */}
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
        <button className="btn btn-light btn-block" type="submit" disabled={this.state.submitting}>
          Send messages
        </button>
      </form>
      </div>
  </div>

    );
  }
}

export default SMSForm;
