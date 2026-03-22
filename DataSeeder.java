package com.indianstars.config;

import com.indianstars.model.Star;
import com.indianstars.repository.StarRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(StarRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                List<Star> stars = Arrays.asList(

                    new Star(
                        "Sunny Leone",
                        "Karenjit Kaur Vohra",
                        "May 13, 1981",
                        "Sarnia, Ontario, Canada (Indian origin)",
                        "Canadian-Indian",
                        "2001 – present",
                        "Actress / Model / Entrepreneur",
                        "Sunny Leone is one of the most recognized names in Indian entertainment. " +
                        "Born to Punjabi Sikh parents in Canada, she transitioned to Bollywood after " +
                        "appearing on Bigg Boss Season 5 (2011). She has starred in Jism 2, Ragini MMS 2, " +
                        "and runs her own cosmetics brand 'Star Struck by Sunny Leone'.",
                        Arrays.asList(
                            "Bigg Boss Season 5 contestant",
                            "Bollywood films: Jism 2, Ragini MMS 2",
                            "Own cosmetics brand: Star Struck",
                            "MTV Splitsvilla host",
                            "FHM India most searched celebrity"
                        ),
                        Arrays.asList("Bollywood", "Model", "Entrepreneur", "TV Host"),
                        "@sunnyleone", "@SunnyLeone", "#c0392b"
                    ),

                    new Star(
                        "Sherlyn Chopra",
                        "Mona Chopra",
                        "February 11, 1984",
                        "Hyderabad, India",
                        "Indian",
                        "2002 – present",
                        "Actress / Model",
                        "Sherlyn Chopra is a Hyderabad-born actress and model who became the first Indian " +
                        "woman to pose for Playboy magazine in 2012. She has appeared in Telugu and Hindi films " +
                        "and is known for being bold and outspoken about her entertainment career choices.",
                        Arrays.asList(
                            "First Indian woman in Playboy (2012)",
                            "Telugu & Hindi film actress",
                            "Item numbers in Bollywood",
                            "Music video appearances"
                        ),
                        Arrays.asList("Playboy", "Bollywood", "Telugu Films", "Model"),
                        "@sherlynchopra", "@SherlynChopra", "#8e44ad"
                    ),

                    new Star(
                        "Poonam Pandey",
                        "Poonam Pandey",
                        "March 11, 1991",
                        "Delhi, India",
                        "Indian",
                        "2012 – present",
                        "Model / Actress / Social Media Personality",
                        "Poonam Pandey is a Delhi-born model and actress who rose to fame through social media. " +
                        "She made her Bollywood debut in Nasha (2013) and has a large following on social platforms. " +
                        "She appeared in Lock Upp reality show in 2022.",
                        Arrays.asList(
                            "Bollywood debut: Nasha (2013)",
                            "Massive social media following",
                            "Playboy India cover",
                            "Lock Upp contestant (2022)",
                            "App and subscription platform"
                        ),
                        Arrays.asList("Social Media", "Bollywood", "Model", "Reality TV"),
                        "@poonampandeyreal", "@iPoonampandey", "#d35400"
                    ),

                    new Star(
                        "Gehana Vasisth",
                        "Gehana Vasisth",
                        "November 30, 1989",
                        "Delhi, India",
                        "Indian",
                        "2010 – present",
                        "Actress / Model / Producer",
                        "Gehana Vasisth is a Delhi-based actress, model and producer who has worked in Hindi films " +
                        "and web series. She has been an outspoken advocate for the adult content industry in India " +
                        "and has independently produced several digital projects.",
                        Arrays.asList(
                            "Hindi film and web series actress",
                            "Independent content producer",
                            "Vocal advocate for adult content industry",
                            "Multiple OTT appearances",
                            "Digital entrepreneur"
                        ),
                        Arrays.asList("Web Series", "Producer", "Activist", "Digital Content"),
                        "@gehanavasisth", "@GehanaVasisth", "#16a085"
                    ),

                    new Star(
                        "Sapna Sappu",
                        "Sapna Sappu",
                        "1985",
                        "Mumbai, India",
                        "Indian",
                        "2005 – present",
                        "Actress / Model",
                        "Sapna Sappu is a Mumbai-based actress and model who has been active in bold entertainment " +
                        "for many years. She has appeared in numerous B-grade Bollywood productions and bold web series " +
                        "and has also been seen in several music videos.",
                        Arrays.asList(
                            "Numerous B-grade film appearances",
                            "Web series actress",
                            "Long career in bold entertainment",
                            "Multiple music video appearances"
                        ),
                        Arrays.asList("B-Grade Films", "Web Series", "Model", "Mumbai"),
                        "@sapnasappu_official", "@SapnaSappu", "#2980b9"
                    ),

                    new Star(
                        "Naina Ganguly",
                        "Naina Ganguly",
                        "1993",
                        "Kolkata, India",
                        "Indian",
                        "2014 – present",
                        "Actress / Model",
                        "Naina Ganguly is a Kolkata-born actress who has worked in Bengali and Hindi entertainment. " +
                        "She is known for her bold roles in web series and digital content, representing the growing " +
                        "presence of Eastern Indian talent in the entertainment space.",
                        Arrays.asList(
                            "Bengali & Hindi entertainment actress",
                            "Bold web series appearances",
                            "Digital content creator",
                            "Growing social media presence"
                        ),
                        Arrays.asList("Bengali Films", "Web Series", "Kolkata", "Digital"),
                        "@nainaganguly_official", "@NainaGanguly", "#27ae60"
                    )
                );

                repo.saveAll(stars);
                System.out.println("✅ Database seeded with " + stars.size() + " star profiles.");
            } else {
                System.out.println("ℹ️ Database already has data. Skipping seed.");
            }
        };
    }
}
