package com.indianstars.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "stars")
public class Star {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String realName;
    private String born;
    private String birthplace;
    private String nationality;
    private String activeSince;
    private String category;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @ElementCollection
    @CollectionTable(name = "star_achievements", joinColumns = @JoinColumn(name = "star_id"))
    @Column(name = "achievement")
    private List<String> achievements;

    @ElementCollection
    @CollectionTable(name = "star_tags", joinColumns = @JoinColumn(name = "star_id"))
    @Column(name = "tag")
    private List<String> tags;

    private String instagram;
    private String twitter;
    private String color;

    // ========== Constructors ==========
    public Star() {}

    public Star(String name, String realName, String born, String birthplace,
                String nationality, String activeSince, String category,
                String bio, List<String> achievements, List<String> tags,
                String instagram, String twitter, String color) {
        this.name = name;
        this.realName = realName;
        this.born = born;
        this.birthplace = birthplace;
        this.nationality = nationality;
        this.activeSince = activeSince;
        this.category = category;
        this.bio = bio;
        this.achievements = achievements;
        this.tags = tags;
        this.instagram = instagram;
        this.twitter = twitter;
        this.color = color;
    }

    // ========== Getters & Setters ==========
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRealName() { return realName; }
    public void setRealName(String realName) { this.realName = realName; }

    public String getBorn() { return born; }
    public void setBorn(String born) { this.born = born; }

    public String getBirthplace() { return birthplace; }
    public void setBirthplace(String birthplace) { this.birthplace = birthplace; }

    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }

    public String getActiveSince() { return activeSince; }
    public void setActiveSince(String activeSince) { this.activeSince = activeSince; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public List<String> getAchievements() { return achievements; }
    public void setAchievements(List<String> achievements) { this.achievements = achievements; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getInstagram() { return instagram; }
    public void setInstagram(String instagram) { this.instagram = instagram; }

    public String getTwitter() { return twitter; }
    public void setTwitter(String twitter) { this.twitter = twitter; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}
