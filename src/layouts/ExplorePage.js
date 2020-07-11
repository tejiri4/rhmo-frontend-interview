import React from 'react';
import NavBar from '../components/common/NavBar';
import Gallery from '../components/ProviderGallery'
import NewProviderForm from '../components/forms/NewProviderForm';
import ApiService from '../utils/apiService';
import LoadingScreen from '../components/common/LoadingScreen';
import { pathGet } from '../utils/utils';
import Grid from "../components/ProviderGrid";
import List from "../components/ProviderList";

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filtered: [],
      isLoading: false,
      viewType: "GALLERY"
    };
  }

  componentDidMount() {
    this.setLoading(true);
    ApiService.get(ApiService.ENDPOINTS.providers)
      .then((data) => {
        const removeEmptyData = data.filter(item => item.name && item.description && item.images)
        this.setState({
          isLoading: false,
          data: removeEmptyData,
          filtered:removeEmptyData
        });
      });
  }

  setLoading = (isLoading) => {
    this.setState({
      isLoading
    });
  }

  getDataFromState() {
      return this.state.data || [];
  }
  filterProviders = (event) => {
    // TASK 2:
    // On input, filter Available Providers based on Name, Address and Type
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    const value = event.target.value;
    const data = this.getDataFromState().filter(data => {
      return pathGet(data, value)
    });

    this.setState({
      ...this.state, filtered: data
    });
  }

  switchView = (type=0) => {
    // TASK 4:
    // onClick on a view preference, switch across the different view options (Gallery, List, Grid)
    // based on whatever the user selects.
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    const types = ['GALLERY', 'GRID', 'LIST'];
    this.setState({
      ...this.state,
      viewType: types[type]
    })
  }

  render() {
    const { isLoading, viewType, filtered: data } = this.state;
    return (
      <div className="container">
        <NavBar />
        <div className="content__main">
          <section className="main__top-providers">
            <h2 className="text-header">Our Providers</h2>
            <div className="flex-row box-shadow" style={{padding:"1rem"}}>
              <div>
                <input
                  type="text"
                  className="input__style_1 input__search"
                  placeholder="&#xf002; Search with Provider Name, Address, or Type"
                  onChange={this.filterProviders}
                  onInput={this.filterProviders}
                />
              </div>
              <div className="layout-switcher">
                  <i className="fa fa-images active" onClick={() => this.switchView(0)}></i>
                  <i className="fa fa-th-large" onClick={() => this.switchView(1)}></i>
                  <i className="fa fa-th-list" onClick={() => this.switchView(2)}></i>
                </div>
            </div>
            {(isLoading || (!data)) ? (
              <LoadingScreen />
            ) : (
              <React.Fragment>
                {
                  viewType === 'GALLERY' && <Gallery
                      items={data}
                      onClick={(id) => this.props.history.push(`/provider/${id}`)}
                  />
                }
              </React.Fragment>
            )}
          </section>
          <section className="main__new-provider fixed">
              <div className="new-provider">
                <h2 className="text-header">Can't find a Provider?</h2>
                <p className="text-body">Feel free to recommend a new one.</p>
                <hr/>
                <NewProviderForm setLoading={this.setLoading}/>
              </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ExplorePage;
