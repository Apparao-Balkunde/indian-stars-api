package com.indianstars.repository;

import com.indianstars.model.Star;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StarRepository extends JpaRepository<Star, Long> {

    // Name se search
    List<Star> findByNameContainingIgnoreCase(String name);

    // Category filter
    List<Star> findByCategoryContainingIgnoreCase(String category);

    // Name ya bio dono me search
    @Query("SELECT s FROM Star s WHERE " +
           "LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.bio) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Star> searchByKeyword(@Param("keyword") String keyword);

    // Tag se filter
    @Query("SELECT s FROM Star s JOIN s.tags t WHERE LOWER(t) = LOWER(:tag)")
    List<Star> findByTag(@Param("tag") String tag);
}
