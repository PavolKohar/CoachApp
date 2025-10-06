package com.palci.coachApplication.model.response;

import lombok.Data;

@Data
public class TrainingSettingsResponse {

    private Long id;
    private String name;

    private double price;

    private int durationInMinutes;
}
