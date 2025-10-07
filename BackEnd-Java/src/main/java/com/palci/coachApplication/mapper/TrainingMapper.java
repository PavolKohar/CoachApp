package com.palci.coachApplication.mapper;

import com.palci.coachApplication.model.entity.TrainingEntity;
import com.palci.coachApplication.model.request.TrainingRequest;
import com.palci.coachApplication.model.response.TrainingResponseFull;

public class TrainingMapper {

    public static TrainingResponseFull toFullResponse(TrainingEntity entity){
        TrainingResponseFull response = new TrainingResponseFull();

        response.setId(entity.getId());
        response.setTitle(entity.getTitle());
        response.setDescription(entity.getDescription());
        response.setDate(entity.getDate());
        response.setTime(entity.getTime());
        response.setDone(entity.isDone());


        if(entity.getSettings() != null){
            response.setSettingsId(entity.getSettings().getId());
            response.setSettingsName(entity.getSettings().getName());
        }

        if (entity.getClient() != null){
            response.setClientId(entity.getClient().getClientId());
            response.setClientFullName(entity.getClient().getFirstName() + " " + entity.getClient().getLastName());
        }

        return response;
    }
}
