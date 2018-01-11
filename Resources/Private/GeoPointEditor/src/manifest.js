import manifest from '@neos-project/neos-ui-extensibility';

import GeoPointEditor from './GeoPointEditor';

manifest('Ttree.GoogleMapEditor:GeoPointEditor', {}, globalRegistry => {
    const editorsRegistry = globalRegistry.get('inspector').get('editors');
    editorsRegistry.set('Ttree.GoogleMapEditor/Inspector/Editors/GeoPointEditor', {
        component: GeoPointEditor
    });
});
