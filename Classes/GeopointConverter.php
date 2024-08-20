<?php
namespace Ttree\GoogleMapEditor;

use Neos\Flow\Property\PropertyMappingConfigurationInterface;
use Neos\Flow\Property\TypeConverter\AbstractTypeConverter;
use Neos\Flow\Annotations as Flow;

/**
 * @Flow\Proxy(false)
 */
final class GeopointConverter extends AbstractTypeConverter
{
    protected $sourceTypes = ['array', 'string'];

    protected $targetType = GeoPoint::class;

    protected $priority = 100;

    public function convertFrom($source, $targetType, array $convertedChildProperties = [], PropertyMappingConfigurationInterface $configuration = null)
    {
        if (\is_string($source)) {
            $source = \json_decode($source, true);
        }
        $source = \array_filter(\array_values($source));
        if ($source === []) {
            return null;
        }
        return GeoPoint::createFromArray($source);
    }
}
