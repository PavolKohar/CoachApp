package com.palci.coachApplication.model.request;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class TrainingUpdateRequest {

    private String title;
    private String description;
    private LocalDate date;
    private LocalTime time;
    private boolean done;
    private Long settingsId;
}
