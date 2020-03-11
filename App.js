import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoidGFtbWl0ZXN0IiwiYSI6ImNrN25zbzNjcjAxbTQzbXA5MncyYWtrdWIifQ.FiDUbdcS19plGHqNieHa6g',
);

import exampleIcon from './assets/example.png';
import pinIcon from './assets/pin.png';

const styles = {
  icon: {
    iconImage: ['get', 'icon'],

    iconSize: [
      'match',
      ['get', 'icon'],
      'example',
      1.2,
      'airport-15',
      1.2,
      /* default */ 1,
    ],
  },
};

const featureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
      properties: {
        icon: 'airport-15',
      },
      geometry: {
        type: 'Point',
        coordinates: [-117.205908, 52.180843],
      },
    },
    {
      type: 'Feature',
      id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
      properties: {
        icon: 'pin',
      },
      geometry: {
        type: 'Point',
        coordinates: [-117.206562, 52.180797],
      },
    },
    {
      type: 'Feature',
      id: '9d10456e-bdda-4aa9-9269-04c1667d4553',
      properties: {
        icon: 'pin3',
      },
      geometry: {
        type: 'Point',
        coordinates: [-117.206862, 52.180897],
      },
    },
  ],
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  state = {
    images: {
      example: exampleIcon,
      assets: ['pin'],
    },
    hasBottomBar: true,
  };

  onPress() {
    this.setState({hasBottomBar: false});
  }

  render() {
    const {images} = this.state;

    return (
      <View style={{flex: 1}}>
        <MapboxGL.MapView style={{flex: 1}}>
          <MapboxGL.Camera
            zoomLevel={17}
            centerCoordinate={[-117.20611157485, 52.180961084261]}
          />
          <MapboxGL.Images
            images={images}
            onImageMissing={imageKey =>
              this.setState({
                images: {...this.state.images, [imageKey]: pinIcon},
              })
            }
          />
          <MapboxGL.ShapeSource
            id="exampleShapeSource"
            shape={featureCollection}>
            <MapboxGL.SymbolLayer id="exampleIconName" style={styles.icon} />
          </MapboxGL.ShapeSource>

          <MapboxGL.MarkerView
            anchor={{x: 0, y: 0}}
            coordinate={[-117.20611157485, 52.180961084261]}>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: 'red',
              }}>
              <TouchableHighlight
                style={{width: 50, height: 50}}
                onPress={this.onPressButton}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: 'blue',
                  }}></View>
              </TouchableHighlight>
            </View>
          </MapboxGL.MarkerView>
        </MapboxGL.MapView>

        <TouchableHighlight style={{height: 80}} onPress={this.onPress}>
          <View style={{height: 80, backgroundColor: 'cyan', padding: 20}}>
            <Text>Press this</Text>
          </View>
        </TouchableHighlight>

        {this.state.hasBottomBar && (
          <View style={{height: 80, backgroundColor: 'teal', padding: 20}}>
            <Text>Bottom Bar</Text>
          </View>
        )}
      </View>
    );
  }
}

export default App;
