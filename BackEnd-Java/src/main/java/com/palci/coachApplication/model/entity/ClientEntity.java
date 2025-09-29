package com.palci.coachApplication.model.entity;


import com.palci.coachApplication.Enums.Sex;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "clients")
public class ClientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clientId;

    //TODO - Add owner

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String Country;

    private String city;

    private String zipCode;

    private String Street;

    private double height;

    private double originalWeight;

    private double currentWeight;

    private double goalWeight;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    private String program;

    private Boolean active;

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


    //TODO Add trainings and weight history


}
