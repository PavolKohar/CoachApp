package com.palci.coachApplication.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Data
public class TrainingPlanRequest {

    private Long clientId;

    private String title;

    private int weeks;
    private int workoutsPerWeek;

    private LocalDate startDate;
    private LocalTime preferredTime;

    private Set<DayOfWeek> excludedDays;

    @NotNull(message = "Please fill in the settings")
    private Long settingsId;




}
