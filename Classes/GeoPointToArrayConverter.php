<?php

namespace Ttree\GoogleMapEditor;

use Neos\Flow\Property\PropertyMappingConfigurationInterface;
use Neos\Flow\Property\TypeConverter\AbstractTypeConverter;
use Neos\Flow\Annotations as Flow;

/**
 * @Flow\Proxy(false)
 */
final class GeoPointToArrayConverter extends AbstractTypeConverter
{
    protected $sourceTypes = [GeoPoint::class];

    protected $targetType = 'array';

    public function convertFrom($source, $targetType, array $convertedChildProperties = [], PropertyMappingConfigurationInterface $configuration = null)
    {
        if (!$source instanceof GeoPoint) {
            return null;
        }
        return $source->toArray();
    }
}
