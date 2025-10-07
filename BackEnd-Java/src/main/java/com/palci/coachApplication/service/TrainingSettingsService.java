package com.palci.coachApplication.service;

import com.palci.coachApplication.model.entity.TrainingSettingsEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.TrainingSettingsRequest;
import com.palci.coachApplication.model.response.TrainingSettingsResponse;

import java.util.List;

public interface TrainingSettingsService {

    TrainingSettingsEntity addTrainingSettings(UserEntity user, TrainingSettingsRequest request);

    List<TrainingSettingsResponse> getAllUsersTrSettings(UserEntity user);

    TrainingSettingsEntity getById(Long id);
    
    //TODO add delete method 
}
