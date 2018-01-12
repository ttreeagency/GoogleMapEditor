<?php
namespace Ttree\GoogleMapEditor;

final class GeoPoint implements \JsonSerializable
{
    /**
     * @var float
     */
    protected $longitude;

    /**
     * @var float
     */
    protected $latitude;

    protected function __construct(float $latitude, float $longitude)
    {
        $this->latitude = $latitude;
        $this->longitude = $longitude;
    }

    public static function create(float $latitude, float $longitude): GeoPoint
    {
        return new static($latitude, $longitude);
    }

    public static function createFromArray(array $point): GeoPoint
    {
        $point = \array_values($point);
        list($latitude, $longitude) = $point;
        return new static($latitude, $longitude);
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
