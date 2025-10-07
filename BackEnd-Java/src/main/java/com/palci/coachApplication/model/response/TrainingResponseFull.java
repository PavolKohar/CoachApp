package com.palci.coachApplication.model.response;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class TrainingResponseFull {

    private Long id;

    private String title;

    private String description;

    private LocalDate date;
    private LocalTime time;
    private LocalTime endTime;

    private boolean done;

    private String settingsName;

    private int durationInMinutes;

    private Long settingsId;
    private Long clientId;

    private String clientFullName;



}
