package com.palci.coachApplication.model.response;

import com.palci.coachApplication.Enums.Sex;
import lombok.Data;

@Data
public class ClientResponseSmall {

    private Long clientId;
    private Long userId;

    private String firstName;
    private String lastName;
    private double currentWeight;
    private String program;
    private Sex sex;

    private String phoneNumber;
    private String email;
    private Boolean active;


}
