import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import HereMapFactory from './../Factories/HereMapFactory';
import { isEqual, isEmpty } from './../Utils';
import getLink from './../Utils/get-link'
import getScriptMap from './../Utils/get-script-map'
import cache from './../Utils/cache'

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
    };
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.map) {
      // If the center is changed then update the map center
      if (!isEqual(this.props.center, nextProps.center)) this.updateCenter(nextProps.center);

      // If the bounds are changed then update the bounds
      if (!isEqual(this.props.bounds, nextProps.bounds)) this.updateBounds(nextProps.bounds);
    }

    // Once the map is created dont do update or rerender, which will remove the map
    // dom from the memory
    return !!this.state.map;
  }

  componentDidMount() {
  
    cache(getScriptMap(props.useHTTPS === true))
    const stylesheetUrl = `${
      props.useHTTPS === true ? 'https:' : ''
    }//js.api.here.com/v3/3.0/mapsjs-ui.css`
    getLink(stylesheetUrl, 'HERE Maps UI')

    onAllLoad(() => {

      // creates the factory
      this.factory = HereMapFactory(props.appId, props.appCode, props.useHTTPS);

      // Produces the platform object
      this.platform = this.factory.getPlatform();

      const mapTypes = this.platform.createDefaultLayers();
      const element = ReactDOM.findDOMNode(this);
      const { zoom, center } = this.props;
      const pixelRatio = 1;
      const map = this.factory.getHereMap(element, mapTypes.normal.map, {
        zoom,
        center,
        pixelRatio,
      });

      if (window) {
        window.addEventListener('resize', this.debouncedResizeMap);
      }

      this.setMap(map, mapTypes);
    })

    
  }

  setMap = (map, mapTypes) => {
    this.setState(
      {
        map,
      },
      () => {
        // Enabling zoom and drag events
        const behaviour = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

        // This creates the UI controls
        window.H.ui.UI.createDefault(map, mapTypes);

        // Send to parent the created map object
        this.props.onMapLoaded(map, behaviour, this.factory);
      },
    );
  };

  /*
  * Update the center based on the props
  */

  updateCenter = center => {
    if (isEmpty(center)) return;
    this.state.map.setCenter(center);
  };

  /*
  * Update the view bounds based on the props
  */

  updateBounds = bounds => {
    if (isEmpty(bounds)) return;
    const rect = new window.H.geo.Rect(bounds.north, bounds.south, bounds.east, bounds.west);
    this.state.map.setViewBounds(rect);
  };

  render() {
    return <div className="here-map-container" />;
  }
}

Map.defaultProps = {
  onMapLoaded: () => {},
  appId: '',
  appCode: '',
  useHTTPS: false,
  center: { lng: 13.4, lat: 52.51 },
  bounds: {},
  zoom: 10,
};

Map.propTypes = {
  onMapLoaded: PropTypes.func,
  appId: PropTypes.string,
  appCode: PropTypes.string,
  useHTTPS: PropTypes.bool,
  center: PropTypes.object,
  bounds: PropTypes.object,
  zoom: PropTypes.number,
};

export default Map;
