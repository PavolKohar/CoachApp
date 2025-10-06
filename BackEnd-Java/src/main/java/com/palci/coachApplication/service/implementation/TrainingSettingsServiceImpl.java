package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.mapper.TrainingSettingsMapper;
import com.palci.coachApplication.model.entity.TrainingSettingsEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.TrainingSettingsRequest;
import com.palci.coachApplication.model.response.TrainingSettingsResponse;
import com.palci.coachApplication.repository.TrainingSettingsRepository;
import com.palci.coachApplication.service.TrainingSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingSettingsServiceImpl implements TrainingSettingsService {

    private final TrainingSettingsRepository trainingSettingsRepository;


    @Override
    public TrainingSettingsEntity addTrainingSettings(UserEntity user, TrainingSettingsRequest request) {
        TrainingSettingsEntity entity = new TrainingSettingsEntity();

        entity.setUser(user);

        entity.setName(request.getName());
        entity.setPrice(request.getPrice());
        entity.setDurationInMinutes(request.getDurationInMinutes());

        return trainingSettingsRepository.save(entity);
    }

    @Override
    public List<TrainingSettingsResponse> getAllUsersTrSettings(UserEntity user) {
        List<TrainingSettingsEntity> entities = trainingSettingsRepository.findAllByUser(user);

        return entities.stream().map(TrainingSettingsMapper::toResponse).toList();
    }
}
