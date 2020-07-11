import React from 'react';
import PropTypes from 'prop-types';
import LoadingScreen from './common/LoadingScreen';

class Gallery extends React.Component {
  // TASK 3a:
  // Complete the Gallery component to include functionality  
  // On click on left or right arrows, the gallery should change its image
  // On click of the thumbnails, the image selected should be updated as well
  // On click of the "Read more" button in the selected Image, it should redirect to the Selected Provider View.
  //
  //
  // Task 3b:
  // Write tests for the Gallery component. Tests should be written in the Gallery.spec.js file in the __tests__ folder.
  //
  //
  // ============== CODE GOES BELOW THIS LINE :) ==============

  state = {
    active: 1,
    activeImage: 0
  };

  getActiveItem (items) {
    const {active} = this.state;
    return items.find(item => active === item.id)
  }
  setActiveItem (active) {
    this.setState({
      ...this.state,
      active, activeImage: 0
    })
  }

  nextImage() {
    const {active}  = this.state
    const current = this.props.items.length > active ? active + 1 : 1;
    this.setActiveItem(current)
  }

  prevImage() {
    const {active}  = this.state
    const current = active  !== 1 ? active - 1 : this.props.items.length;
    this.setActiveItem(current)
  }
  setActiveImage(id) {
    console.log(id)
    this.setState({
      ...this.state, activeImage: id
    })
  }

  renderThumbnails(images) {
    if (Array.isArray(images)) {
      return images.map((image, index) => {
        const className =this.state.activeImage === index ? "gallery__thumbnails__item active" : "gallery__thumbnails__item "
        return (
            <div className={className}
              key={image.hash}
              style={{backgroundImage: `url("${image.url}")`}} onClick={() => this.setActiveImage(index)}>
            </div>
        )
      })
    }
    return (<div className="gallery__thumbnails__item"
         style={{backgroundImage:`url("${images}")`}}>
    </div>)
  }

  render() {
    const { items, onClick, startFrom } = this.props;
    const { active, activeImage } = this.state;
    console.log(items)
    if(!items || items.length === 0) {
      return (
        <LoadingScreen />
      )
    }
    return (
      <div data-testid="gallery" className="box-shadow gallery">
        <div className="gallery__slider">
          <div className="gallery__slider-item-wrapper">
            {
              items.map(item => {
                const className = active === item.id ? "gallery__slider-item active" : "gallery__slider-item";
                const image = active === item.id ? item?.images[activeImage]?.url : item?.images[0]?.url;
                return (
                    <div className={className} key={item.id}>
                      <img src={image} className={className} alt={item.name}/>
                      <div className="gallery__slider-item__info">
                        <div className="gallery__slider-item__info-name">{item.name}</div>
                        <div className="gallery__slider-item__info-description">
                          {item.description}
                          <p className="read-more" onClick={() => onClick(item.id)}>Click to View</p>
                        </div>
                      </div>
                    </div>)
              })
            }
          </div>
          <div className="gallery__slider-controls">
            <button className="gallery__slider-controls__button left" onClick={() => this.prevImage()}>
              <i className="fa fa-chevron-left"></i>
            </button>
            <button className="gallery__slider-controls__button right"  onClick={() => this.nextImage()}>
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>      
        </div>     
        <div className="gallery__thumbnails">
          { this.renderThumbnails(this.getActiveItem(items)?.images) }
        </div>
      </div>
    )
  }
}

Gallery.propTypes = {
  startFrom: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    images: PropTypes.array.isRequired,
    name: PropTypes.string,
    description: PropTypes.string
  })).isRequired,
  onClick: PropTypes.instanceOf(Function)
}

export default Gallery
