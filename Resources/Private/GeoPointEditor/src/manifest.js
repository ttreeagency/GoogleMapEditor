import manifest from '@neos-project/neos-ui-extensibility';
import {themr} from '@friendsofreactjs/react-css-themr';

import GeoPointEditor from './GeoPointEditor';
import style from './style.module.css';

manifest('Ttree.GoogleMapEditor:GeoPointEditor', {}, globalRegistry => {
    const ThemedGeoPointEditor = themr('Ttree.GoogleMapEditor/Editors/badgeGeoPointEditor', style)(GeoPointEditor);

    const editorsRegistry = globalRegistry.get('inspector').get('editors');
    editorsRegistry.set('Ttree.GoogleMapEditor/Inspector/Editors/GeoPointEditor', {
        component: ThemedGeoPointEditor
    });
});
