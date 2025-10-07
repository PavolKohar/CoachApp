package com.palci.coachApplication.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;


@Entity
@Table(name = "trainingPlans")
@Data
public class TrainingPlanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private int totalWorkouts;

    @Column(nullable = false)
    private int doneWorkouts;

    @Column(nullable = false)
    private boolean done;

    @ManyToOne(optional = false)
    @JoinColumn(name = "owner_id")
    private UserEntity user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "client_id")
    private ClientEntity client;

    @OneToMany(mappedBy = "plan",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TrainingEntity> trainings;

    public void updateProgress(){
        if (trainings!= null){
            this.doneWorkouts  = (int) trainings.stream().filter(TrainingEntity::isDone).count();
            this.done = (doneWorkouts == totalWorkouts);
        }
    }
}
