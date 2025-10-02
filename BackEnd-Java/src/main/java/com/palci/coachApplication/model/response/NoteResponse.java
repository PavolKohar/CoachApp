package com.palci.coachApplication.model.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class NoteResponse {

    private Long id;
    private LocalDate date;
    private String note;
    private Long clientId;

}
