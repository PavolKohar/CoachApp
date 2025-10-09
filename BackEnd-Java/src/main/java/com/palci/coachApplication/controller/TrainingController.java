package com.palci.coachApplication.controller;

import com.palci.coachApplication.mapper.TrainingMapper;
import com.palci.coachApplication.mapper.TrainingPlanMapper;
import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.TrainingEntity;
import com.palci.coachApplication.model.entity.TrainingPlanEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.TrainingPlanRequest;
import com.palci.coachApplication.model.request.TrainingRequest;
import com.palci.coachApplication.model.request.TrainingUpdateRequest;
import com.palci.coachApplication.model.response.TrainingPlanResponse;
import com.palci.coachApplication.model.response.TrainingResponseFull;
import com.palci.coachApplication.service.ClientService;
import com.palci.coachApplication.service.TrainingPlanService;
import com.palci.coachApplication.service.TrainingService;
import com.palci.coachApplication.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainings")
@RequiredArgsConstructor
public class TrainingController {

    private final TrainingService trainingService;
    private final UserService userService;
    private final TrainingPlanService trainingPlanService;
    private final ClientService clientService;


    @PostMapping("/{userId}/add")
    public ResponseEntity<TrainingResponseFull> createTraining(@PathVariable Long userId,
                                                               @Valid @RequestBody TrainingRequest request){
        UserEntity user = userService.getById(userId);
        TrainingEntity entity = trainingService.addTraining(user,request);

        TrainingResponseFull response = TrainingMapper.toFullResponse(entity);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{userId}/add-plan")
    public ResponseEntity<TrainingPlanResponse> createTrainingPlan(@PathVariable Long userId,
                                                @Valid @RequestBody TrainingPlanRequest request){
        UserEntity user = userService.getById(userId);
        TrainingPlanEntity entity = trainingPlanService.createTrainingPlan(user,request);
        TrainingPlanResponse response = TrainingPlanMapper.toResponse(entity);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/user/all")
    public ResponseEntity<List<TrainingResponseFull>> getAllTrainingsForUser(@PathVariable Long userId){
        UserEntity user = userService.getById(userId);
        List<TrainingResponseFull> responseFulls = trainingService.getAllTrainingsForUser(user);

        return ResponseEntity.ok(responseFulls);
    }

    @GetMapping("/{userId}/today")
    public ResponseEntity<List<TrainingResponseFull>> getTodayTrainingsForUser(@PathVariable Long userId){
        UserEntity user = userService.getById(userId);
        List<TrainingResponseFull> responseFulls = trainingService.getTodayTrainingsForUser(user);

        return ResponseEntity.ok(responseFulls);
    }

    @GetMapping("/{userId}/this-week")
    public ResponseEntity<List<TrainingResponseFull>> getThisWeekTrainingsForUser(@PathVariable Long userId){
        UserEntity user = userService.getById(userId);
        List<TrainingResponseFull> responseFulls = trainingService.getThisWeekTrainingsForUser(user);

        return ResponseEntity.ok(responseFulls);
    }

    @GetMapping("/{userId}/next-week")
    public ResponseEntity<List<TrainingResponseFull>> getNextWeekTrainingsForUser(@PathVariable Long userId){
        UserEntity user = userService.getById(userId);
        List<TrainingResponseFull> responseFulls = trainingService.getNextWeekTrainingsForUser(user);

        return ResponseEntity.ok(responseFulls);
    }

    @PatchMapping("{trainingId}/done")
    public ResponseEntity<?> toggleTrainingDone(@PathVariable Long trainingId, @AuthenticationPrincipal UserEntity user){
        trainingService.toggleDone(trainingId,user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{trainingId}")
    public ResponseEntity<TrainingResponseFull> getTrainingById(@PathVariable Long trainingId, @AuthenticationPrincipal UserEntity user){
        TrainingEntity entity = trainingService.getById(user,trainingId);
        TrainingResponseFull responseFull = TrainingMapper.toFullResponse(entity);


        return ResponseEntity.ok(responseFull);
    }

    @PatchMapping("/update/{trainingId}")
    public ResponseEntity<?> updateTraining(@PathVariable Long trainingId, @RequestBody TrainingUpdateRequest request){

        trainingService.updateTraining(trainingId,request);

        return ResponseEntity.ok("Training updated");
    }

    @DeleteMapping("/delete/{trainingId}")
    public ResponseEntity<Void> deleteTraining(@PathVariable Long trainingId){
        trainingService.deleteTrainingById(trainingId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete/plan/{planId}")
    public ResponseEntity<Void> deleteTrainingPlanById(@PathVariable Long planId){

        trainingPlanService.deleteTrainingPlanById(planId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("{clientId}/all")
    public ResponseEntity<List<TrainingResponseFull>> getAllTrainingsForClient(@PathVariable Long clientId){
        ClientEntity client = clientService.getClientById(clientId);
        List<TrainingEntity> entities = trainingService.getAllTrainingsByClient(client);
        List<TrainingResponseFull> responseFulls = entities.stream().map(TrainingMapper::toFullResponse).toList();

        return ResponseEntity.ok(responseFulls);
    }

    @GetMapping("{clientId}/undone")
    public ResponseEntity<List<TrainingResponseFull>> getUndoneTrainingsForClient(@PathVariable Long clientId){
        ClientEntity client = clientService.getClientById(clientId);
        List<TrainingEntity> entities = trainingService.getUndoneTrainingsByClient(client);
        List<TrainingResponseFull> responseFulls = entities.stream().map(TrainingMapper::toFullResponse).toList();

        return ResponseEntity.ok(responseFulls);
    }

    @GetMapping("/plans-all/{userId}")
    public ResponseEntity<List<TrainingPlanResponse>> getAllTrainingPlansForUser(@PathVariable Long userId){
        UserEntity user = userService.getById(userId);
        List<TrainingPlanEntity> plans = trainingPlanService.getAllTrainingPlansForUser(user);
        List<TrainingPlanResponse> responses = plans.stream().map(TrainingPlanMapper::toResponse).toList();

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/plans-client/{clientId}")
    public ResponseEntity<List<TrainingPlanResponse>> getAllTrainingPlansForClient(@PathVariable Long clientId){
        ClientEntity client = clientService.getClientById(clientId);
        List<TrainingPlanEntity> planEntities = trainingPlanService.getAllTrainingPlansForClient(client);
        List<TrainingPlanResponse> responses = planEntities.stream().map(TrainingPlanMapper::toResponse).toList();

        return ResponseEntity.ok(responses);
    }


    @GetMapping("/plan/{planId}")
    public ResponseEntity<TrainingPlanResponse> getTrainingPlanById(@PathVariable Long planId){
        TrainingPlanEntity entity = trainingPlanService.getTrainingPlatById(planId);
        TrainingPlanResponse response = TrainingPlanMapper.toResponse(entity);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/trainings-plan/{planId}")
    public ResponseEntity<List<TrainingResponseFull>> getAllTrainingsByTrainingPlan(@PathVariable Long planId){
        TrainingPlanEntity plan = trainingPlanService.getTrainingPlatById(planId);
        List<TrainingEntity> entities = trainingService.getAllTrainingsByTrainingPlan(plan);
        List<TrainingResponseFull> responseFulls = entities.stream().map(TrainingMapper::toFullResponse).toList();

        return ResponseEntity.ok(responseFulls);
    }
}
