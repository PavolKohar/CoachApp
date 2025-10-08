package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.exception.ResourceNotFoundException;
import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.TrainingEntity;
import com.palci.coachApplication.model.entity.TrainingPlanEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.TrainingPlanRequest;
import com.palci.coachApplication.repository.ClientRepository;
import com.palci.coachApplication.repository.TrainingPlanRepository;
import com.palci.coachApplication.repository.TrainingRepository;
import com.palci.coachApplication.service.ClientService;
import com.palci.coachApplication.service.TrainingPlanService;
import com.palci.coachApplication.service.TrainingSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TrainingPlanServiceImpl implements TrainingPlanService {

    private final ClientService clientService;
    private final TrainingSettingsService trainingSettingsService;
    private final TrainingPlanRepository trainingPlanRepository;
    private final TrainingRepository trainingRepository;

    private final Queue<String> twoSplit = new LinkedList<>(Arrays.asList("Full body","Full body"));
    private final Queue<String> threeSplit = new LinkedList<>(Arrays.asList("UpperBody","LowerBody", "FullBody"));
    private final Queue<String> fourSplit = new LinkedList<>(Arrays.asList("UpperBody","LowerBody","UpperBody","LowerBody"));
    private final Queue<String> fiveSplit = new LinkedList<>(Arrays.asList("UpperBody","LowerBody","Pull","Push","Legs"));
    private final Queue<String> sixSplit = new LinkedList<>(Arrays.asList("Push","Pull","Leg","Push","Pull","Leg"));

    private String chooseWorkout(Queue<String> split){
        String workout = split.poll();
        split.offer(workout);
        return workout;
    }

    private LocalDate getNextAvailableDate(LocalDate startDate, int daysToAdd, Set<DayOfWeek> excludedDays) {
        LocalDate candidateDate = startDate.plusDays(daysToAdd);

        // Pokiaľ je deň medzi zakázanými, posúvaj ďalej
        while (excludedDays.contains(candidateDate.getDayOfWeek())) {
            candidateDate = candidateDate.plusDays(1);
        }

        return candidateDate;
    }




    @Override
    public TrainingPlanEntity createTrainingPlan(UserEntity user, TrainingPlanRequest request) {
        int totalWorkouts = request.getWeeks() * request.getWorkoutsPerWeek();
        LocalDate endDate = request.getStartDate().plusWeeks(request.getWeeks());
        int days = (int) ChronoUnit.DAYS.between(request.getStartDate(),endDate);

        Queue<String> trainingSplit;
        switch (request.getWorkoutsPerWeek()){
            case 2-> trainingSplit = twoSplit;
            case 3-> trainingSplit = threeSplit;
            case 4-> trainingSplit = fourSplit;
            case 5-> trainingSplit = fiveSplit;
            case 6-> trainingSplit = sixSplit;
            default -> trainingSplit =fourSplit;
        }

        double result = (double) days / (double) totalWorkouts;
        int whole = (int) result;
        double decimal = result - whole;

        decimal = Math.round(decimal * 100.0) / 100.0;

        LocalDate trainingDay = request.getStartDate();

        double decimalAccumulator = 0.0;

        List<TrainingEntity> trainings = new ArrayList<>();
        TrainingPlanEntity planEntity = new TrainingPlanEntity();

        for(int i =0 ; i<totalWorkouts; i++){
            decimalAccumulator += decimal;
            int extraDay = 0;

            if (decimalAccumulator >= 1.0){
                extraDay = 1;
                decimalAccumulator -= 1.0;
            }

            int daysToAdd = whole + extraDay;

            TrainingEntity training = new TrainingEntity();

            training.setClient(clientService.getClientById(request.getClientId()));
            training.setUser(user);
            training.setTitle(chooseWorkout(trainingSplit));
            training.setDate(trainingDay);
            training.setTime(request.getPreferredTime());
            training.setPlan(planEntity);
            training.setDone(false);

            if (request.getSettingsId() != null){
                training.setSettings(trainingSettingsService.getById(request.getSettingsId()));
            }

            trainings.add(training);

            trainingDay = getNextAvailableDate(trainingDay,daysToAdd,request.getExcludedDays());

        }

            planEntity.setTitle(request.getTitle());
            planEntity.setTrainings(trainings);
            planEntity.setClient(clientService.getClientById(request.getClientId()));
            planEntity.setUser(user);
            planEntity.setStartDate(request.getStartDate());
            planEntity.setEndDate(endDate);
            planEntity.setTotalWorkouts(totalWorkouts);
            planEntity.setDone(false);
            planEntity.setDoneWorkouts(0);

            TrainingPlanEntity savedPlan = trainingPlanRepository.save(planEntity);
            trainingRepository.saveAll(trainings);


            return savedPlan;

    }

    @Override
    public List<TrainingPlanEntity> getAllTrainingPlansForUser(UserEntity user) {
        return trainingPlanRepository.findAllByUserOrderByStartDateDesc(user);
    }

    @Override
    public List<TrainingPlanEntity> getAllTrainingPlansForClient(ClientEntity client) {
        return trainingPlanRepository.findAllByClientOrderByStartDateDesc(client);
    }

    @Override
    public TrainingPlanEntity getTrainingPlatById(Long planId) {
        return trainingPlanRepository.findById(planId).orElseThrow(()->new ResourceNotFoundException("Fail to find plan"));
    }
}
