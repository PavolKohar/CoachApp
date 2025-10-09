package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.exception.ResourceNotFoundException;
import com.palci.coachApplication.mapper.TrainingMapper;
import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.TrainingEntity;
import com.palci.coachApplication.model.entity.TrainingPlanEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.TrainingRequest;
import com.palci.coachApplication.model.request.TrainingUpdateRequest;
import com.palci.coachApplication.model.response.TrainingResponseFull;
import com.palci.coachApplication.repository.TrainingPlanRepository;
import com.palci.coachApplication.repository.TrainingRepository;
import com.palci.coachApplication.service.ClientService;
import com.palci.coachApplication.service.TrainingService;
import com.palci.coachApplication.service.TrainingSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingServiceImpl implements TrainingService {

    private final TrainingRepository trainingRepository;
    private final ClientService clientService;
    private final TrainingSettingsService trainingSettingsService;
    private final TrainingPlanRepository trainingPlanRepository;


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
            entity.setClient(clientService.getClientById(user,request.getClientId()));
        }

        if (request.getSettingsId() != null){
            entity.setSettings(trainingSettingsService.getById(request.getSettingsId()));
        }


        return trainingRepository.save(entity);

    }

    @Override
    public List<TrainingResponseFull> getTodayTrainingsForUser(UserEntity user) {
        List<TrainingEntity> allEntities = trainingRepository.findAllByUserOrderByDateAsc(user);
        List<TrainingEntity> todayEntities = allEntities.stream()
                .filter(t->t.getDate().isEqual(LocalDate.now()))
                .toList();
        return  todayEntities.stream()
                .map(TrainingMapper::toFullResponse)
                .toList();

    }



    @Override
    public List<TrainingResponseFull> getThisWeekTrainingsForUser(UserEntity user) {
        LocalDate today = LocalDate.now();
        LocalDate startOfTheWeek  = today.with(DayOfWeek.MONDAY);
        LocalDate endOfTheWeek = today.with(DayOfWeek.SUNDAY);

        List<TrainingEntity> thisWeekTrainingsEntities = trainingRepository.findAllByUserOrderByDateAsc(user).stream()
                .filter(t->{
                    LocalDate date = t.getDate();
                    return !t.isDone() && (date.isEqual(startOfTheWeek) || date.isAfter(startOfTheWeek) && (date.isBefore(endOfTheWeek) || date.isEqual(endOfTheWeek)));
                }).toList();

        return thisWeekTrainingsEntities.stream().map(TrainingMapper::toFullResponse).toList();
    }

    @Override
    public List<TrainingResponseFull> getNextWeekTrainingsForUser(UserEntity user) {
        LocalDate today = LocalDate.now();
        LocalDate startOfTheWeek  = today.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
        LocalDate endOfTheWeek = startOfTheWeek.plusDays(6);

        List<TrainingEntity> nextWeekTrainingsEntities = trainingRepository.findAllByUserOrderByDateAsc(user).stream()
                .filter(t->{
                    LocalDate date = t.getDate();
                    return !t.isDone() && (date.isEqual(startOfTheWeek) || date.isAfter(startOfTheWeek) && (date.isBefore(endOfTheWeek) || date.isEqual(endOfTheWeek)));
                }).toList();

        return nextWeekTrainingsEntities.stream().map(TrainingMapper::toFullResponse).toList();

    }

    @Override
    public void toggleDone(Long trainingId, UserEntity user) {
        TrainingEntity training = trainingRepository.findById(trainingId).orElseThrow(()-> new ResourceNotFoundException("Training not found"));

        training.setDone(!training.isDone());
        if (training.getPlan() != null){
            TrainingPlanEntity planEntity = training.getPlan();
            planEntity.updateProgress();
            trainingPlanRepository.save(planEntity);
        }

        trainingRepository.save(training);
    }

    @Override
    public TrainingEntity getById(UserEntity user, Long trainingId) {
        // TODO - Add exception if training does not belong to user

        return trainingRepository.findById(trainingId).orElseThrow(()->new ResourceNotFoundException("Training not found"));
    }

    @Override
    public void updateTraining(Long trainingId, TrainingUpdateRequest request) {
        TrainingEntity entity = trainingRepository.findById(trainingId).orElseThrow(()-> new ResourceNotFoundException("Training not found"));

        entity.setTitle(request.getTitle());
        entity.setDescription(request.getDescription());
        entity.setDate(request.getDate());
        entity.setTime(request.getTime());
        entity.setDone(entity.isDone());



        entity.setSettings(trainingSettingsService.getById(request.getSettingsId()));

        if(entity.getPlan() != null){
            TrainingPlanEntity planEntity = entity.getPlan();
            planEntity.updateProgress();
            trainingPlanRepository.save(planEntity);
        }

        trainingRepository.save(entity);


    }

    @Override
    public void deleteTrainingById(Long trainingId) {
        trainingRepository.deleteById(trainingId);
    }

    @Override
    public List<TrainingEntity> getAllTrainingsByClient(ClientEntity client) {
        return trainingRepository.findAllByClientOrderByDateDesc(client);
    }

    @Override
    public List<TrainingEntity> getUndoneTrainingsByClient(ClientEntity client) {
        return trainingRepository.findAllByClientOrderByDateDesc(client).stream().filter(e->!e.isDone()).toList();
    }

    @Override
    public List<TrainingEntity> getAllTrainingsByTrainingPlan(TrainingPlanEntity plan) {
        return trainingRepository.findAllByPlan(plan);
    }

    @Override
    public List<TrainingResponseFull> getAllTrainingsForUser(UserEntity user) {
       List<TrainingEntity> allTrainings = trainingRepository.findAllByUserOrderByDateAsc(user);
       return allTrainings.stream().map(TrainingMapper::toFullResponse).toList();
    }
}
