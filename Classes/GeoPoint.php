<?php

namespace Ttree\GoogleMapEditor;

use Neos\Flow\Annotations as Flow;

/**
 * @Flow\Proxy(false)
 */
final class GeoPoint implements \JsonSerializable
{
    protected function __construct(protected float $latitude, protected float $longitude)
    {
    }

    public static function create(float $latitude, float $longitude): self
    {
        return new self($latitude, $longitude);
    }

    public static function createFromArray(array $point): self
    {
        $point = \array_values($point);
        [$latitude, $longitude] = $point;
        return new self($latitude, $longitude);
    }

    public function getLongitude(): float
    {
        return $this->longitude;
    }

    public function getLatitude(): float
    {
        return $this->latitude;
    }

    public function toArray(): array
    {
        return [$this->getLatitude(), $this->getLongitude()];
    }

    public function jsonSerialize()
    {
        return \json_encode($this->toArray());
    }
}
