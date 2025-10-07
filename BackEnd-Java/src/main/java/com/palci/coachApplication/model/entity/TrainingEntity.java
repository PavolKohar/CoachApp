package com.palci.coachApplication.model.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "trainings")
public class TrainingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT",nullable = true)
    private String description;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime time;

    @Column(nullable = false)
    private boolean done;

    // TODO add trainingPlanEntity

    @ManyToOne
    @JoinColumn(name = "client_id")
    private ClientEntity client;

    @ManyToOne
    @JoinColumn(name = "settings_id")
    private TrainingSettingsEntity settings;
}
