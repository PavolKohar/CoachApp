package com.palci.coachApplication.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class UserRequest {

    @NotNull(message = "Enter birth date")
    private LocalDate birthDate;

    @NotBlank(message = "Enter first name")
    private String firstName;

    @NotBlank(message = "Enter last name")
    private String lastName;

    @NotBlank(message = "Enter username")
    private String username;

    @NotBlank(message = "Enter email")
    @Email(message = "Enter valid email please")
    private String email;

    @NotBlank(message = "Enter password please")
    @Size(min = 8, message = "Password must be 8 characters length")
    private String password;

    @NotBlank(message = "Enter password please")
    @Size(min = 8, message = "Password must be 8 characters length")
    private String confirmPassword;

    @NotBlank(message = "Enter phone number please")
    private String phoneNumber;

}
