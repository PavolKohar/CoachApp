package com.palci.coachApplication.model.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ClientFitnessRequest {

    @NotNull(message = "Enter activity level please")
    @Min(value = 1, message = "Activity level must be at least 1")
    @Max(value = 5, message = "Activity level must be max 5")
    private int activityLevel;

    @NotNull(message = "Enter birth date please")
    private double goalWeight;


    @NotBlank(message = "Enter program please")
    private String program;
}
