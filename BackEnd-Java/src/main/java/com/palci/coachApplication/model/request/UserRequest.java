package com.palci.coachApplication.model.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class UserRequest {

    @NotNull(message = "Enter birth date")
    @Past(message = "Birth date must be in past")
    private LocalDate birthDate;

    @NotBlank(message = "Enter first name")
    @Pattern(regexp = "^[\\p{L}]+(?:\\s[\\p{L}]+)*$", message = "Invalid name")
    private String firstName;

    @NotBlank(message = "Enter last name")
    @Pattern(regexp = "^[\\p{L}]+$", message = "Last name must contain only letters")
    private String lastName;

    @NotBlank(message = "Enter username")
    @Pattern(regexp = "^\\S+$" , message = "Username must not contain spaces")
    private String username;

    @NotBlank(message = "Enter email")
    @Email(message = "Enter valid email please")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", message = "Enter valid email")
    private String email;

    @NotBlank(message = "Enter password please")
    @Size(min = 8, message = "Password must be 8 characters length")
    private String password;

    @NotBlank(message = "Enter password please")
    @Size(min = 8, message = "Password must be 8 characters length")
    private String confirmPassword;

    @NotBlank(message = "Enter phone number please")
    @Pattern(regexp = "^\\d+$", message = "Only numbers allowed")
    private String phoneNumber;

}
