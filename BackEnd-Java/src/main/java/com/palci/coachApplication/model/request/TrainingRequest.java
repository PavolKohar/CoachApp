package com.palci.coachApplication.model.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class TrainingRequest {

    @NotBlank(message = "Please fill in the title")
    private String title;

    private String description;

    @NotNull(message = "Please fill in the date")
    private LocalDate date;

    @NotNull(message = "Please fill in the time")
    private LocalTime time;

    @NotNull(message = "Please fill in the settings")
    private Long settingsId;

    private Long clientId;




}
