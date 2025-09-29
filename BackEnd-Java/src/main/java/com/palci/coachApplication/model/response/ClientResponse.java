package com.palci.coachApplication.model.response;

import com.palci.coachApplication.Enums.Sex;
import lombok.Data;

import java.time.LocalDate;
import java.time.Period;

@Data
public class ClientResponse {

    private Long clientId;

    private String firstName;
    private String lastName;
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

    private int activityLevel;
    private LocalDate birthDate;

    private Sex sex;
    private String program;

    private Boolean active;

    public int getAge(){
        if (birthDate == null){
            return 0;
        }else {
            return Period.between(birthDate,LocalDate.now()).getYears();
        }
    }
}
