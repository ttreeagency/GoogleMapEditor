import React, { PureComponent } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import { neos } from '@neos-project/neos-ui-decorators';
import { Icon } from '@neos-project/react-ui-components';
import mergeClassNames from 'classnames';
import GeoPoint from 'geopoint';
import I18n from '@neos-project/neos-ui-i18n';

import MapStyles from './MapStyles';
import Map from './Map';

const l18nPrefix = v => `Ttree.GoogleMapEditor:Main:${v}`;

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
        theme: PropTypes.shape({
            'wrapper': PropTypes.string,
            'wrapper--highlight': PropTypes.string,
            'infoViewWrapper': PropTypes.string,
            'infoView': PropTypes.string,
            'propertyLabel': PropTypes.string,
            'propertyValue': PropTypes.string,
            'infoView--centered': PropTypes.string,
            'mapWrapper': PropTypes.string
        }).isRequired,
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

    onCopy = () => this.setState({ copied: true });

    hasValue = value => value && value.length === 2

    pointToFormatedString = ([lat, lng], f = 2) => `${(lat).toFixed(f)}" N, ${(lng).toFixed(f)}" W`;
    pointToString = ([lat, lng]) => `${(lat).toFixed(7)},${(lng).toFixed(7)}`;

    render() {
        const { highlight, options, value, theme } = this.props;
        const { previousPoint } = this.state;
        const { mapDefaultOptions, defaultPosition, defaultZoom, key, url, defaultSearchTerm, searchPlaceholder, search } = options;

        const updatedMapDefaultOptions = {
            ...mapDefaultOptions,
            styles: mapDefaultOptions.styles !== undefined ? mapDefaultOptions.styles : MapStyles
        };

        const [lat, lng] = this.hasValue(value) ? value : defaultPosition;
        const point = { lat, lng };

        const wrapperClassName = mergeClassNames({
            [theme.wrapper]: true,
            [theme.wrapperHighlight]: highlight
        });

        const infoViewWrapperClassName = mergeClassNames({
            [theme.infoViewWrapper]: true
        });

        const infoViewClassName = mergeClassNames({
            [theme.infoView]: true
        });

        const centeredInfoViewClassName = mergeClassNames({
            [theme.infoView]: true,
            [theme.infoViewCentered]: true
        });

        const current = new GeoPoint(lat, lng);
        const previous = previousPoint ? new GeoPoint(previousPoint[0], previousPoint[1]) : null;
        const hasValue = this.hasValue(value);

        return (
            <div className={wrapperClassName}>
                <div className={theme.mapWrapper}>
                    <Map
                        onClick={this.handleValueChange}
                        defaultZoom={defaultZoom}
                        defaultOptions={updatedMapDefaultOptions}
                        center={point}
                        position={point}
                        googleMapURL={`${url}&key=${key}`}
                        defaultSearchTerm={defaultSearchTerm}
                        searchPlaceholder={searchPlaceholder}
                        search={search}
                />
                </div>
                <div className={infoViewWrapperClassName}>
                    <div className={infoViewClassName}>
                        <div className={theme.propertyLabel}>
                            {hasValue ? <CopyToClipboard
                                text={this.pointToString(value)}
                                onCopy={this.onCopy}>
                                <span><I18n id={l18nPrefix('infoview.current')}/> <Icon icon="copy" /></span>
                            </CopyToClipboard> : <span><I18n id={l18nPrefix('infoview.current')}/></span>}
                        </div>
                        <div className={theme.propertyValue}>
                            {hasValue ? this.pointToFormatedString(value) : 'Empty'}
                        </div>
                    </div>
                    {previousPoint && <div className={infoViewClassName}>
                        <div className={theme.propertyLabel} onClick={this.restorePreviousValue}>
                            <I18n id={l18nPrefix('infoview.previous')}/> <Icon icon="undo" />
                        </div>
                        <div className={theme.propertyValue}>
                            {this.pointToFormatedString(previousPoint)}
                        </div>
                    </div>}
                </div>
                {previous && <div className={centeredInfoViewClassName}>
                    <div className={theme.propertyValue}><em>{Number((current.distanceTo(previous, true)).toFixed(2))} <I18n id={l18nPrefix('infoview.distance')}/></em></div>
                </div>}
            </div>
        )
    }
}

export default GeoPointEditor;
