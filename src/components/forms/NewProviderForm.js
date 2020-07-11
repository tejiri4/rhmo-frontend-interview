import React from 'react';
import {  validateField} from "../../utils/utils";
import ApiService from "../../utils/apiService";

class NewProviderForm extends React.Component {

  // TASK 5: Add New Provider
  // Add Functionality to the form below
  // On submission it should make a POST request to 
  // the server to create a new provider.
  // Refer to the API documentation for details.

    state = {
        formField: {
            name: '',
            address: '',
            state: '',
            rating: 0,
            provider_type: '',
            active_status: 'Pending'
        },
        error: '',
        imgPreview: "https://via.placeholder.com/1500x840"
    }
    handleFormFieldUpdate = (event) => {
        this.setState({
            ...this.state,
            formField: {
                ...this.state.formField,
                [event.target.name]: event.target.value
            }
        })
    }
    handleFileInput = (event) => {
        const file = event.target.files[0]
        
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (fileReaderEvent)  => {
            this.setState( {
                ...this.state,
                imgPreview: fileReaderEvent.target.result
            })
        };
       // following line allow upload of image, but the endpoint does not allow it.
        // this.setState({
        //     ...this.state,
        //     formField: {
        //         ...this.state.formField,
        //         ...event.target
        //     },
        // })
    }

 submitForm = () => {
        const formData = validateField(this.state.formField);
        if (!formData) {
            this.setState({
                ...this.state,
                error: `all fields are required can not be empty`
            })
            return;
        }
        this.props.setLoading(true);
        ApiService.post(ApiService.ENDPOINTS.providers, JSON.stringify(this.state.formField))
            .then((data) => {
                console.log(data);
                this.props.setLoading(false)
            })
        .catch(console.log)
    }

  render() {
        const { imgPreview } = this.state
    return (
      <form className="form">
          <div className="error">{this.state.error}</div>
        <div className="form-group">
          <label htmlFor="name">Provider Name:</label>
          <input className="input__style_1" type="text" name="name" onChange={this.handleFormFieldUpdate}/>
        </div>
        <div className="form-group">
          <label htmlFor="address">Provider Address:</label>
          <input className="input__style_1" type="text" name="address" onChange={this.handleFormFieldUpdate}/>
        </div>
        <div className="form-group">
          <label htmlFor="address">Provider State:</label>
          <input className="input__style_1" type="text" name="state" onChange={this.handleFormFieldUpdate}/>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Provider Rating:</label>
          <select className="select input__style_1" type="number" name="rating" onChange={this.handleFormFieldUpdate}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Provider type:</label>
          <select className="select input__style_1" type="text" name="provider_type" onChange={this.handleFormFieldUpdate}>
            <option value="hospital">Hospital</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="clinic">Clinic</option>
          </select>
        </div>        
        <div className="form-group">
          <label htmlFor="image">Provider Image</label>
          <img className="img-responsive" src={imgPreview} alt="new provider"/>
          <input type="file" name="file" onChange={this.handleFileInput} />
        </div>
        <div className="form-group button-row">
          <button
            type="button"
            className="btn btn-primary no-margin"
            onClick={this.submitForm}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default NewProviderForm;
