package com.palci.coachApplication.controller;

import com.palci.coachApplication.mapper.TrainingMapper;
import com.palci.coachApplication.mapper.TrainingPlanMapper;
import com.palci.coachApplication.model.entity.TrainingEntity;
import com.palci.coachApplication.model.entity.TrainingPlanEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.TrainingPlanRequest;
import com.palci.coachApplication.model.request.TrainingRequest;
import com.palci.coachApplication.model.response.TrainingPlanResponse;
import com.palci.coachApplication.model.response.TrainingResponseFull;
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
}
