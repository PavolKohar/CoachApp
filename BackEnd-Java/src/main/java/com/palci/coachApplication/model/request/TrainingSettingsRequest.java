package com.palci.coachApplication.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TrainingSettingsRequest {

    @NotBlank(message = "Please fill in the name")
    private String name;

    @NotNull(message = "Please fill in the price")
    private double price;

    @NotNull(message = "Please fill in the expected time")
    private int durationInMinutes;

}
