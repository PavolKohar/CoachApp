package com.palci.coachApplication.service;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.TrainingEntity;
import com.palci.coachApplication.model.entity.TrainingPlanEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.TrainingRequest;
import com.palci.coachApplication.model.request.TrainingUpdateRequest;
import com.palci.coachApplication.model.response.TrainingResponseFull;
import com.palci.coachApplication.model.response.TrainingResponseSmall;

import java.util.List;

public interface TrainingService {

    TrainingEntity addTraining(UserEntity user, TrainingRequest request);

    List<TrainingResponseFull> getTodayTrainingsForUser(UserEntity user);

    List<TrainingResponseFull> getThisWeekTrainingsForUser(UserEntity user);

    List<TrainingResponseFull> getAllTrainingsForUser(UserEntity user);

    List<TrainingResponseFull> getNextWeekTrainingsForUser(UserEntity user);

    void toggleDone(Long trainingId,UserEntity user);

    TrainingEntity getById(UserEntity user, Long trainingId);

    void updateTraining(UserEntity user,Long trainingId, TrainingUpdateRequest request);

    void deleteTrainingById(UserEntity user,Long trainingId);

    List<TrainingEntity> getAllTrainingsByClient(UserEntity user,ClientEntity client);

    List<TrainingEntity> getUndoneTrainingsByClient(UserEntity user,ClientEntity client);

    List<TrainingEntity> getAllTrainingsByTrainingPlan(UserEntity user,TrainingPlanEntity plan);
}
