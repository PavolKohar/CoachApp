package com.palci.coachApplication.model.request;

import com.palci.coachApplication.Enums.Sex;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ClientRequest {

    //TODO add validation for client

    private String firstName;
    private String lastName;

    private String email;
    private String phoneNumber;

    private String country;
    private String city;
    private String zipCode;
    private String street;

    private LocalDate birthDate;
    private int activityLevel;

    private double height;
    private double originalWeight;
    private double goalWeight;

    private Sex sex;

    private String program;


}
