<?php

namespace App\Entity;

use App\Repository\MusicRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=MusicRepository::class)
 * @UniqueEntity("song")
 */
class Music
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $artist;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private $song;


    /**
     * @ORM\Column(type="integer")
     */
    private $styleId;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $year;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArtist(): ?string
    {
        return $this->artist;
    }

    public function setArtist(string $artist): self
    {
        $this->artist = $artist;

        return $this;
    }

    public function getSong(): ?string
    {
        return $this->song;
    }

    public function setSong(string $song): self
    {
        $this->song = $song;

        return $this;
    }

    public function getStyleId(): ?int
    {
        return $this->styleId;
    }

    public function setStyleId(int $styleId): self
    {
        $this->styleId = $styleId;

        return $this;
    }

    public function getYear(): ?string
    {
        return $this->year;
    }

    public function setYear(string $year): self
    {
        $this->year = $year;

        return $this;
    }

    public function toArray(array $styles): array
    {
        $i = array_search($this->styleId, array_column($styles, 'id'));
        $style = ($i !== false ? $styles[$i]['style'] : null);

        return [
            'id' => $this->id,
            'artist' => $this->artist,
            'song' => $this->song,
            'style' => $style,
            'year' => $this->year,
        ];
    }

}
