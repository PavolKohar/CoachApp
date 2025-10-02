package com.palci.coachApplication.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "weightHistory")
@Getter
@Setter
@NoArgsConstructor
public class WeightEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long changeId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "client_id")
    private ClientEntity client;

    @Column(nullable = false)
    private double oldWeight;

    @Column(nullable = false)
    private double newWeight;

    @Column(nullable = false)
    private double difference;

    @Column(nullable = false)
    private LocalDate date;


}
