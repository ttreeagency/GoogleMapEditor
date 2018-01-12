# Google Map Inspector Editors for Neos CMS

This package provides a Neos CMS Inspector Editor to select geo coordinates from a Google Map.

![](http://g.recordit.co/J5s1tyhGyH.gif)

## Configuration

You need to configure your API key, see the `editorOptions.key` bellow. `defaultPosition` is required to see the
initial marker.

    Neos:
      Neos:
        userInterface:
          inspector:
            dataTypes:
              Ttree\GoogleMapEditor\GeoPoint:
                editorOptions:
                  url: https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places
                  key: use-a-valid-google-map-api-key
                  defaultPosition: [-34.397, 150.644]
                  mapDefaultOptions:
                    scrollwheel: false
                    navigationControl: false
                    mapTypeControl: false
                    streetViewControl: false
                    draggableCursor: default
                    draggingCursor: pointer

The `mapDefaultOptions` accept any option accepted by the `GoogleMap` component from [react-google-maps](https://tomchentw.github.io/react-google-maps/#googlemap).
So you can be fancy and override the provided styles globaly or for each node property, see bellow for the node property configuration.

## Usage

The default configuration is quiet slim:

    'Your.Package:Map':
      properties:
        geopoint:
          type: Ttree\GoogleMapEditor\GeoPoint

**Tips**: Don't disable the `fullscreenControl`, the editor work fine in full screen mode.

For each instance of the editor, you can also customize the default `editorOptions`:

    'Your.Package:Map':
      properties:
        geopoint:
          type: Ttree\GoogleMapEditor\GeoPoint
          ui:
            inspector:
              editorOptions:
                defaultPosition: [-34.397, 150.644]
                streetViewControl: true
                styles:
                  - featureType: all
                    elementType: geometry.fill
                    stylers:
                      - weight: 2.00
                
## Acknowledgments

Development sponsored by [visol](https://www.visol.ch/) & [ttree ltd - neos solution provider](http://ttree.ch).

We try our best to craft this package with a lots of love, we are open to sponsoring, support request, ... just contact us.

## License

The MIT License (MIT). Please see [LICENSE](LICENSE) for more information.
