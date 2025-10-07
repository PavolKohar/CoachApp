package com.palci.coachApplication.controller;

import com.palci.coachApplication.mapper.TrainingMapper;
import com.palci.coachApplication.model.entity.TrainingEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.TrainingRequest;
import com.palci.coachApplication.model.response.TrainingResponseFull;
import com.palci.coachApplication.service.TrainingService;
import com.palci.coachApplication.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trainings")
@RequiredArgsConstructor
public class TrainingController {

    private final TrainingService trainingService;
    private final UserService userService;


    @PostMapping("/{userId}/add")
    public ResponseEntity<TrainingResponseFull> createTraining(@PathVariable Long userId,
                                                               @Valid @RequestBody TrainingRequest request){
        UserEntity user = userService.getById(userId);
        TrainingEntity entity = trainingService.addTraining(user,request);

        TrainingResponseFull response = TrainingMapper.toFullResponse(entity);

        return ResponseEntity.ok(response);
    }
}
