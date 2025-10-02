package com.palci.coachApplication.mapper;

import com.palci.coachApplication.model.entity.NoteEntity;
import com.palci.coachApplication.model.response.NoteResponse;

public class NoteMapper {

    public static NoteResponse toResponse(NoteEntity entity){
        NoteResponse response = new NoteResponse();

        response.setId(entity.getId());
        response.setDate(entity.getDate());
        response.setNote(entity.getNote());

        if (entity.getClient() != null){
            response.setClientId(entity.getClient().getClientId());
        }



        return response;

    }
}
