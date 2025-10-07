package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.model.entity.TrainingEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.TrainingRequest;
import com.palci.coachApplication.repository.TrainingRepository;
import com.palci.coachApplication.service.ClientService;
import com.palci.coachApplication.service.TrainingService;
import com.palci.coachApplication.service.TrainingSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrainingServiceImpl implements TrainingService {

    private final TrainingRepository trainingRepository;
    private final ClientService clientService;
    private final TrainingSettingsService trainingSettingsService;


    @Override
    public TrainingEntity addTraining(UserEntity user, TrainingRequest request) {
        TrainingEntity entity = new TrainingEntity();

        entity.setUser(user);
        entity.setTitle(request.getTitle());
        entity.setDescription(request.getDescription());
        entity.setDate(request.getDate());
        entity.setTime(request.getTime());
        entity.setDone(false); // Default false when creating new training

        if (request.getClientId() != null){
            entity.setClient(clientService.getClientById(request.getClientId()));
        }

        if (request.getSettingsId() != null){
            entity.setSettings(trainingSettingsService.getById(request.getSettingsId()));
        }


        return trainingRepository.save(entity);

    }
}
