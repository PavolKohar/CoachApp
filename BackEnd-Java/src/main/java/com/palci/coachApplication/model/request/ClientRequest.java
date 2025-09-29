package com.palci.coachApplication.model.request;

import com.palci.coachApplication.Enums.Sex;
import lombok.Data;

@Data
public class ClientRequest {

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
    private double goalWeight;

    private Sex sex;

    private String program;


}
