import { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from './../Utils';

class Circle extends Component {
  constructor(props) {
    super(props);
    this.circle = null;
  }

  componentDidUpdate(prevProps) {
    if (this.circle) {
      // update the circle if the center and radius changes
      if (!isEqual(prevProps.center, this.props.center) || prevProps.radius !== this.props.radius) this.updateCircle();
    }
  }

  componentWillUnmount() {
    // Remove the circle from the map once the component is going
    // to be unmounted
    const { map } = this.props;
    if (isEmpty(map)) return;
    map.removeObject(this.circle);
  }

  /*
  * Creates the circle for the first time
  */
  createCircle = () => {
    const { map, fillColor, strokeColor, lineWidth, center, radius } = this.props;
    this.circle = new window.H.map.Circle(center, radius, {
      style: {
        fillColor,
        strokeColor,
        lineWidth,
      },
    });
    this.props.onCircleDrawn(this.circle);
    map.addObject(this.circle);
  };

  /*
  * Update the circle if the center and radius changes
  */
  updateCircle = () => {
    const { center, radius } = this.props;
    this.circle.setCenter(center);
    this.circle.setRadius(radius);
  };

  render() {
    const { map } = this.props;
    if (!isEmpty(map) && !this.circle) {
      this.createCircle();
    }

    return null;
  }
}

Circle.defaultProps = {
  center: {},
  radius: 10,
  fillColor: '#FFFFCC',
  strokeColor: '#829',
  lineWidth: 2,
  onCircleDrawn: () => {},
};

Circle.propTypes = {
  center: PropTypes.object.isRequired,
  radius: PropTypes.number,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string,
  lineWidth: PropTypes.number,
  onCircleDrawn: PropTypes.func,
};

export default Circle;
