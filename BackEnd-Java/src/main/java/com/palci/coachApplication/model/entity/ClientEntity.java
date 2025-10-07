package com.palci.coachApplication.model.entity;


import com.palci.coachApplication.Enums.Sex;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "clients")
public class ClientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clientId;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity owner;

    private String firstName;

    private String lastName;

    private LocalDate birthDate;

    private Integer activityLevel;

    private String email;

    private String phoneNumber;

    private String country;

    private String city;

    private String zipCode;

    private String street;

    private double height;

    private double originalWeight;

    private double currentWeight;

    private double goalWeight;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    private String program;

    private Boolean active;

    @OneToMany(mappedBy = "client",cascade = CascadeType.ALL,orphanRemoval = true)
    List<WeightEntity> weightHistory = new ArrayList<>();

    @OneToMany(mappedBy = "client",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<NoteEntity> clientNotes = new ArrayList<>();

    @OneToMany(mappedBy = "client", cascade = CascadeType.PERSIST, orphanRemoval = false)
    private List<TrainingEntity> trainings = new ArrayList<>();

    // TODO add some health constrains

    @PrePersist
    void prePersist(){
        if (currentWeight == 0){
            this.currentWeight = this.originalWeight;
        }
        if (active == null){
            this.active = true;
        }
    }

    


}
