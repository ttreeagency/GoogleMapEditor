import React, { PureComponent } from 'react';
import { compose, withProps } from "recompose"
import PropTypes from 'prop-types';
import { neos } from '@neos-project/neos-ui-decorators';
import mergeClassNames from 'classnames';
import GeoPoint from 'geopoint';

import MapStyles from './MapStyles';
import Map from './Map';
import style from './style.css';

@neos(globalRegistry => ({
    secondaryEditorsRegistry: globalRegistry.get('inspector').get('secondaryEditors')
}))
class GeoPointEditor extends PureComponent {
    state = {
        previousPoint: null
    };

    static propTypes = {
        // The propertyName this editor is used for, coming from the inspector
        identifier: PropTypes.string,

        value: PropTypes.oneOfType([
            PropTypes.shape({
                lat: PropTypes.number,
                lng: PropTypes.number
            }),
            PropTypes.string
        ]),
        // "hooks" are the hooks specified by commit()
        hooks: PropTypes.object,

        commit: PropTypes.func.isRequired,
        renderSecondaryInspector: PropTypes.func.isRequired,
        secondaryEditorsRegistry: PropTypes.object.isRequired,

        options: PropTypes.object,
        highlight: PropTypes.bool,
    };

    handleValueChange = nextValue => {
        const { value } = this.props;
        this.props.commit(nextValue);
        this.setState({
            previousPoint: value
        });
    };

    render() {
        const { highlight, options, value } = this.props;
        const { previousPoint } = this.state;
        const { mapDefaultOptions, defaultPosition, key, url } = options;

        if (mapDefaultOptions.styles === undefined) {
            mapDefaultOptions.styles = MapStyles;
        }

        const point = value || defaultPosition;
        const { lat, lng } = point;

        const wrapperClassName = mergeClassNames({
            [style.wrapper]: true,
            [style['wrapper--highlight']]: highlight
        });

        const infoViewWrapperClassName = mergeClassNames({
            [style.infoViewWrapper]: true
        });

        const infoViewClassName = mergeClassNames({
            [style.infoView]: true
        });

        const centeredInfoViewClassName = mergeClassNames({
            [style.infoView]: true,
            [style['infoView--centered']]: true
        });

        const current = new GeoPoint(lat, lng);
        const previous = previousPoint ? new GeoPoint(previousPoint.lat, previousPoint.lng) : null;

        return (
            <div className={wrapperClassName}>
                <div className={style.mapWrapper}>
                    <Map
                        onClick={this.handleValueChange}
                        defaultOptions={mapDefaultOptions}
                        center={point}
                        position={point}
                        googleMapURL={`${url}&key=${key}`}
                    />
                </div>
                { value ? <div className={infoViewWrapperClassName}>
                    <div className={infoViewClassName}>
                        <div className={style.propertyLabel}>Current</div>
                        <div className={style.propertyValue}>{Number((lat).toFixed(4))} / {Number((lng).toFixed(4))}</div>
                    </div>
                    { previousPoint && <div className={infoViewClassName}>
                        <div className={style.propertyLabel}>Previous</div>
                        <div className={style.propertyValue}>
                            {Number((previousPoint.lat).toFixed(4))} / {Number((previousPoint.lng).toFixed(4))}
                        </div>
                    </div> }
                </div> : <div className={centeredInfoViewClassName}>You can select a point by clicking on the map</div> }
                { previousPoint && <div className={centeredInfoViewClassName}>
                    <div className={style.propertyValue}><em>{Number((current.distanceTo(previous, true)).toFixed(2))} km from the current position</em></div>
                </div> }
            </div>
        )
    }
}

export default GeoPointEditor;
