package com.palci.coachApplication.service;

import com.palci.coachApplication.model.entity.TrainingEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.TrainingRequest;

public interface TrainingService {

    TrainingEntity addTraining(UserEntity user, TrainingRequest request);
}
