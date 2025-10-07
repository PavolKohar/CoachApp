package com.palci.coachApplication.model.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TrainingPlanResponse {

    private Long id;

    private LocalDate startDate;
    private LocalDate endDate;

    private int totalWorkouts;
    private int doneWorkouts;

    private String clientFullName;
    private boolean done;

}
