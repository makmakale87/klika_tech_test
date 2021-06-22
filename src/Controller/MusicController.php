<?php

namespace App\Controller;

use App\Entity\Music;
use App\Repository\MusicRepository;
use App\Repository\MusicStylesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use function PHPUnit\Framework\classHasStaticAttribute;

/**
 * @Route("/api/music", name="music")
 */
class MusicController extends AbstractController
{
    private $entityManager;
    private $musicRepository;
    private $musicStylesRepository;

    public function __construct(
        EntityManagerInterface $entityManager,
        MusicRepository $musicRepository,
        MusicStylesRepository $musicStylesRepository
    )
    {

        $this->entityManager = $entityManager;
        $this->musicRepository = $musicRepository;
        $this->musicStylesRepository = $musicStylesRepository;
    }

    /**
     * @Route("/", name="music")
     */
    public function index(): Response
    {
        $musicList = $this->musicRepository->findAll();
        $musicStyles = $this->musicStylesRepository->findAll();

        $arrayOfMusicStyles = [];
        foreach ($musicStyles as $style) {
            $arrayOfMusicStyles[] = $style->toArray();
        }

        $arrayOfMusic = [];
        foreach ($musicList as $music) {
            $arrayOfMusic[] = $music->toArray($arrayOfMusicStyles);
        }

        return $this->json($arrayOfMusic);
    }

    /**
     * @Route("/styles", name="music_styles")
     */
    public function styles(): Response
    {
        $musicStyles = $this->musicStylesRepository->findAll();

        $arrayOfMusicStyles = [];
        foreach ($musicStyles as $style) {
            $arrayOfMusicStyles[] = $style->toArray();
        }

        return $this->json($arrayOfMusicStyles);
    }

    /**
     * @Route("/create", name="create_song")
     * @param Request $request
     */
    public function create(Request $request): Response
    {
        $musicStyles = $this->musicStylesRepository->findAll();
        $arrayOfMusicStyles = [];
        foreach ($musicStyles as $style) {
            $arrayOfMusicStyles[] = $style->toArray();
        }

        $content = json_decode($request->getContent());

        $song = new Music();
        $song->setArtist($content->artist);
        $song->setSong($content->song);
        $song->setStyleId($content->styleId);
        $song->setYear($content->year);

        try {
            $this->entityManager->persist($song);
            $this->entityManager->flush();
            return $this->json([
                'song' => $song->toArray($arrayOfMusicStyles),
            ]);
        } catch (\Exception $exception) {
            //error
        }
    }
}
