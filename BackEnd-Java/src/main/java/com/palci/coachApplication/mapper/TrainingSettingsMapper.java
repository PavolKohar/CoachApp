package com.palci.coachApplication.mapper;

import com.palci.coachApplication.model.entity.TrainingSettingsEntity;
import com.palci.coachApplication.model.response.TrainingSettingsResponse;

public class TrainingSettingsMapper {

    public static TrainingSettingsResponse toResponse (TrainingSettingsEntity entity){
        TrainingSettingsResponse response = new TrainingSettingsResponse();

        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setDurationInMinutes(entity.getDurationInMinutes());
        response.setPrice(entity.getPrice());


        return response;

    }
}
