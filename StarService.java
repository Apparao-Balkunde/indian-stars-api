package com.indianstars.service;

import com.indianstars.model.Star;
import com.indianstars.repository.StarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StarService {

    @Autowired
    private StarRepository starRepository;

    // Sagle stars fetch kara
    public List<Star> getAllStars() {
        return starRepository.findAll();
    }

    // ID ne ek star fetch kara
    public Optional<Star> getStarById(Long id) {
        return starRepository.findById(id);
    }

    // Keyword search
    public List<Star> searchStars(String keyword) {
        return starRepository.searchByKeyword(keyword);
    }

    // Tag ne filter kara
    public List<Star> getStarsByTag(String tag) {
        return starRepository.findByTag(tag);
    }

    // Nava star add kara
    public Star addStar(Star star) {
        return starRepository.save(star);
    }

    // Star update kara
    public Star updateStar(Long id, Star updatedStar) {
        return starRepository.findById(id).map(star -> {
            star.setName(updatedStar.getName());
            star.setRealName(updatedStar.getRealName());
            star.setBorn(updatedStar.getBorn());
            star.setBirthplace(updatedStar.getBirthplace());
            star.setNationality(updatedStar.getNationality());
            star.setActiveSince(updatedStar.getActiveSince());
            star.setCategory(updatedStar.getCategory());
            star.setBio(updatedStar.getBio());
            star.setAchievements(updatedStar.getAchievements());
            star.setTags(updatedStar.getTags());
            star.setInstagram(updatedStar.getInstagram());
            star.setTwitter(updatedStar.getTwitter());
            star.setColor(updatedStar.getColor());
            return starRepository.save(star);
        }).orElseThrow(() -> new RuntimeException("Star not found with id: " + id));
    }

    // Star delete kara
    public void deleteStar(Long id) {
        starRepository.deleteById(id);
    }
}
