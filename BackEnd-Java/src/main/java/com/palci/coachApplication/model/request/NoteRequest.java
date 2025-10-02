package com.palci.coachApplication.model.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class NoteRequest {

    private String note;
    private Long userId;
    private Long clientId; // Optional

}
