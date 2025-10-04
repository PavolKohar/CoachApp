package com.palci.coachApplication.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ClientAddressRequest {

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
}
