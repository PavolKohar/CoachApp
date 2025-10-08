package com.palci.coachApplication.mapper;

import com.palci.coachApplication.model.entity.TrainingPlanEntity;
import com.palci.coachApplication.model.response.TrainingPlanResponse;

public class TrainingPlanMapper {

    public static TrainingPlanResponse toResponse(TrainingPlanEntity entity){
        TrainingPlanResponse response = new TrainingPlanResponse();

        response.setId(entity.getId());
        response.setTitle(entity.getTitle());
        response.setStartDate(entity.getStartDate());
        response.setEndDate(entity.getEndDate());
        response.setDone(entity.isDone());
        response.setTotalWorkouts(entity.getTotalWorkouts());
        response.setDoneWorkouts(entity.getDoneWorkouts());
        response.setClientFullName(entity.getClient().getFirstName() + " " + entity.getClient().getLastName());

        return response;
    }
}
