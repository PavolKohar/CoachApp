package com.palci.coachApplication.model.request;

import com.palci.coachApplication.Enums.Sex;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ClientRequest {

    //TODO add validation for client

    @NotBlank(message = "Enter first name please")
    private String firstName;
    @NotBlank(message = "Enter last name please")
    private String lastName;

    @Email(message = "Enter valid email please")
    @NotBlank(message = "Enter email ")
    private String email;

    @NotBlank(message = "Enter phoneNumber please")
    private String phoneNumber;

    @NotBlank(message = "Enter country please")
    private String country;
    @NotBlank(message = "Enter city please")
    private String city;
    @NotBlank(message = "Enter zipCode please")
    private String zipCode;
    @NotBlank(message = "Enter street please")
    private String street;

    @NotNull(message = "Enter birth date please")
    @Past(message = "Birth date must be in past")
    private LocalDate birthDate;

    @NotNull(message = "Enter activity level please")
    @Size(min = 1,max = 5,message = "Activity level must be in range 1-5")
    private int activityLevel;

    @NotNull(message = "Enter height please")
    @Size(min = 140,max = 250,message = "Enter valid height")
    private double height;

    @NotNull(message = "Enter birth date please")
    private double originalWeight;
    @NotNull(message = "Enter birth date please")
    private double goalWeight;

    private Sex sex;

    @NotBlank(message = "Enter program please")
    private String program;


}
