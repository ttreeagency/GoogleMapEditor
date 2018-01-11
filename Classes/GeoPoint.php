<?php
namespace Ttree\GoogleMapEditor;

final class GeoPoint
{
    /**
     * @var float
     */
    protected $longitude;

    /**
     * @var float
     */
    protected $latitude;

    protected function __construct(float $longitude, float $latitude)
    {
        $this->latitude = $longitude;
        $this->latitude = $latitude;
    }

    public static function create(float $longitude, float $latitude): GeoPoint
    {
        return new static($longitude, $latitude);
    }

    public static function createFromArray(array $point): GeoPoint
    {
        return new static($point['longitude'], $point['latitude']);
    }

    public function getLongitude(): float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): void
    {
        $this->longitude = $longitude;
    }

    public function getLatitude(): float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): void
    {
        $this->latitude = $latitude;
    }
}
