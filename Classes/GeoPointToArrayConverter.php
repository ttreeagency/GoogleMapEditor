<?php
namespace Ttree\GoogleMapEditor;

use Neos\Error\Messages\Error;
use Neos\Flow\Property\Exception;
use Neos\Flow\Property\PropertyMappingConfigurationInterface;
use Neos\Flow\Property\TypeConverter\AbstractTypeConverter;

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
