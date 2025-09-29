package com.palci.coachApplication.model.entity;

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
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private LocalDate birthDate;

    private String firstName;

    private String lastName;

    private String userName;

    private String email;

    private String password;

    private String phoneNumber;

    private Boolean admin;

    @OneToMany(mappedBy = "owner",fetch = FetchType.LAZY,cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ClientEntity> clients = new ArrayList<>();



    // TODO Add address and ičo dič for generating bills - IBAN , variable number generate ...
}
