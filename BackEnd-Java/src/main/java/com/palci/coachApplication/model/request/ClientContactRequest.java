package com.palci.coachApplication.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ClientContactRequest {

    @NotBlank(message = "Enter first name please")
    @Pattern(regexp = "^[\\p{L}]+(?:\\s[\\p{L}]+)*$", message = "Invalid name")
    private String firstName;

    @NotBlank(message = "Enter last name please")
    @Pattern(regexp = "^[\\p{L}]+$", message = "Last name must contain only letters")
    private String lastName;


    @NotBlank(message = "Enter email ")
    @Email(message = "Enter valid email please")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", message = "Enter valid email")
    private String email;

    @NotBlank(message = "Enter phoneNumber please")
    @Pattern(regexp = "^\\d+$", message = "Only numbers allowed")
    private String phoneNumber;


}
