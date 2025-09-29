package com.palci.coachApplication.model.response;

import com.palci.coachApplication.Enums.Sex;
import lombok.Data;

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

    private Sex sex;
    private String program;

    private Boolean active;
}
