package com.palci.coachApplication.service;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.TrainingPlanEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.TrainingPlanRequest;

import java.util.List;

public interface TrainingPlanService {


    TrainingPlanEntity createTrainingPlan(UserEntity user, TrainingPlanRequest request);

    List<TrainingPlanEntity> getAllTrainingPlansForUser(UserEntity user);

    List<TrainingPlanEntity> getAllTrainingPlansForClient(ClientEntity client);

    TrainingPlanEntity getTrainingPlatById(Long planId);

    void deleteTrainingPlanById(Long planId);
}
