package com.palci.coachApplication.model.request;

import com.palci.coachApplication.Enums.Sex;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ClientRequest {

   private Long ownerId;

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

    @NotBlank(message = "Enter country please")
    @Pattern(regexp = "^[\\p{L}]+(?:\\s[\\p{L}]+)*$", message = "Invalid country")
    private String country;

    @NotBlank(message = "Enter city please")
    @Pattern(regexp = "^[\\p{L}]+(?:\\s[\\p{L}]+)*$", message = "Invalid city")
    private String city;

    @NotBlank(message = "Enter zipCode please")
    private String zipCode;
    @NotBlank(message = "Enter street please")
    private String street;

    @NotNull(message = "Enter birth date please")
    @Past(message = "Birth date must be in past")
    private LocalDate birthDate;

    @NotNull(message = "Enter activity level please")
    @Min(value = 1, message = "Activity level must be at least 1")
    @Max(value = 5, message = "Activity level must be max 5")
    private int activityLevel;

    @NotNull(message = "Enter height please")
    @Min(value = 100,message = "Height must be at least 50 cm")
    @Max(value = 250,message = "Height must be less than 250 cm")
    private double height;

    @NotNull(message = "Enter birth date please")
    private double originalWeight;
    @NotNull(message = "Enter birth date please")
    private double goalWeight;

    @NotNull(message = "Enter sex please")
    private Sex sex;

    @NotBlank(message = "Enter program please")
    private String program;


}
