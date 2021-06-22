<?php

namespace App\Repository;

use App\Entity\MusicStyles;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MusicStyles|null find($id, $lockMode = null, $lockVersion = null)
 * @method MusicStyles|null findOneBy(array $criteria, array $orderBy = null)
 * @method MusicStyles[]    findAll()
 * @method MusicStyles[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MusicStylesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MusicStyles::class);
    }

    // /**
    //  * @return MusicStyles[] Returns an array of MusicStyles objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?MusicStyles
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
