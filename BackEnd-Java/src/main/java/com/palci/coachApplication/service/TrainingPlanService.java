package com.palci.coachApplication.service;

import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.TrainingPlanRequest;

public interface TrainingPlanService {


    void createTrainingPlan(UserEntity user, TrainingPlanRequest request);
}
