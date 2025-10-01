package com.palci.coachApplication.model.response;

import lombok.Data;

@Data
public class ClientResponseSmall {

    private Long clientId;

    private String firstName;
    private String lastName;
    private double currentWeight;

    private String phoneNumber;
    private String email;
    private Boolean active;


}
