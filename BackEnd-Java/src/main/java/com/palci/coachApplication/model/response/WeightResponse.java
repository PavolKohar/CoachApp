package com.palci.coachApplication.model.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class WeightResponse {

    private Long id;

    private LocalDate date;

    private double oldWeight;

    private double newWeight;

    private double difference;
}
