package com.palci.coachApplication.service;

import com.palci.coachApplication.model.entity.TrainingPlanEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.TrainingPlanRequest;

public interface TrainingPlanService {


    TrainingPlanEntity createTrainingPlan(UserEntity user, TrainingPlanRequest request);
}
