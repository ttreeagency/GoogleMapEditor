# Google Map Inspector Editors for Neos CMS

This package provides a Neos CMS Inspector Editor to select geo coordinates from a Google Map.

![](http://g.recordit.co/J5s1tyhGyH.gif)

__Under development - not stable - not working at the moment__

## Configuration

    Neos:
      Neos:
        userInterface:
          inspector:
            dataTypes:
              Ttree\GoogleMapEditor\GeoPoint:
                editorOptions:
                  url: https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places
                  key: use-a-valid-google-map-api-key
                  mapDefaultOptions:
                    scrollwheel: false
                    navigationControl: false
                    mapTypeControl: false
                    streetViewControl: false
                    draggableCursor: default
                    draggingCursor: pointer
                defaultValue: {  }

## Usage

    'Your.Package:Map':
      properties:
        geopoint:
          type: Ttree\GoogleMapEditor\GeoPoint
          ui:
            label: i18n
            reloadIfChanged: true

## Acknowledgments

Development sponsored by [visol](https://www.visol.ch/) & [ttree ltd - neos solution provider](http://ttree.ch).

We try our best to craft this package with a lots of love, we are open to sponsoring, support request, ... just contact us.

## License

The MIT License (MIT). Please see [LICENSE](LICENSE) for more information.
