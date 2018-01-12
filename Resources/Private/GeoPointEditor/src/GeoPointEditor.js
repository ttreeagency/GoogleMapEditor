import React, { PureComponent } from 'react';
import { compose, withProps } from "recompose"
import PropTypes from 'prop-types';
import { neos } from '@neos-project/neos-ui-decorators';
import { Icon } from '@neos-project/react-ui-components';
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

        value: PropTypes.arrayOf(PropTypes.number),

        // "hooks" are the hooks specified by commit()
        hooks: PropTypes.object,

        commit: PropTypes.func.isRequired,
        renderSecondaryInspector: PropTypes.func.isRequired,
        secondaryEditorsRegistry: PropTypes.object.isRequired,

        options: PropTypes.object,
        highlight: PropTypes.bool,
    };

    handleValueChange = nextValue => {
        const { value, commit } = this.props;
        if (this.hasValue(value)) {
            this.setState({
                previousPoint: value
            }, () => {
                commit(nextValue);
            })
        } else {
            commit(nextValue);
        }
    };

    restorePreviousValue = () => {
        const { value, commit } = this.props;
        const { previousPoint } = this.state;
        this.setState({
            previousPoint: value
        }, () => {
            commit(previousPoint);
        });
    };

    hasValue = value => value && value.length === 2

    pointToString = ([lat, lng], f = 2) => `${(lat).toFixed(f)}" N, ${(lng).toFixed(f)}" W`;

    render() {
        const { highlight, options, value } = this.props;
        const { previousPoint } = this.state;
        const { mapDefaultOptions, defaultPosition, key, url } = options;

        console.log('current value', value);

        if (mapDefaultOptions.styles === undefined) {
            mapDefaultOptions.styles = MapStyles;
        }

        const [lat, lng] = this.hasValue(value) ? value : defaultPosition;
        const point = {lat, lng};

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
        const previous = previousPoint ? new GeoPoint(previousPoint[0], previousPoint[1]) : null;

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
                <div className={infoViewWrapperClassName}>
                    <div className={infoViewClassName}>
                        <div className={style.propertyLabel}>Current</div>
                        <div className={style.propertyValue}>
                            { this.hasValue(value) ? this.pointToString(value) : 'Empty' }
                        </div>
                    </div>
                    { previousPoint && <div className={infoViewClassName} onClick={this.restorePreviousValue}>
                        <div className={style.propertyLabel}>
                            Previous <Icon icon="refresh" />
                        </div>
                        <div className={style.propertyValue}>
                            {this.pointToString(previousPoint)}
                        </div>
                    </div> }
                </div>
                { previous && <div className={centeredInfoViewClassName}>
                    <div className={style.propertyValue}><em>{Number((current.distanceTo(previous, true)).toFixed(2))} km from the current position</em></div>
                </div> }
            </div>
        )
    }
}

export default GeoPointEditor;
