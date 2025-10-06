package com.palci.coachApplication.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "trainingSettings")
@Data
public class TrainingSettingsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private int durationInMinutes;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;


}
