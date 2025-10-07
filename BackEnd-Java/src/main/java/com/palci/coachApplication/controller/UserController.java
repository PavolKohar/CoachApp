package com.palci.coachApplication.controller;

import com.palci.coachApplication.mapper.ClientMapper;
import com.palci.coachApplication.mapper.NoteMapper;
import com.palci.coachApplication.mapper.TrainingSettingsMapper;
import com.palci.coachApplication.mapper.UserMapper;
import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.NoteEntity;
import com.palci.coachApplication.model.entity.TrainingSettingsEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.NoteRequest;
import com.palci.coachApplication.model.request.TrainingSettingsRequest;
import com.palci.coachApplication.model.request.UserRequest;
import com.palci.coachApplication.model.request.WeightRequest;
import com.palci.coachApplication.model.response.*;
import com.palci.coachApplication.service.ClientService;
import com.palci.coachApplication.service.NotesService;
import com.palci.coachApplication.service.TrainingSettingsService;
import com.palci.coachApplication.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ClientService clientService;
    private final NotesService notesService;
    private final TrainingSettingsService trainingSettingsService;


    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long userId){
        UserEntity user = userService.getById(userId);
        UserResponse response = UserMapper.toResponse(user);
        List<ClientEntity> clients = clientService.getAllClientsByOwner(user);
        List<ClientResponseSmall> clientResponses = clients.stream().map(ClientMapper::toSmallResponse).toList();
        response.setClients(clientResponses);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/all-clients")
    public ResponseEntity<List<ClientResponseSmall>> getAllUserClients(@PathVariable Long userId){
        UserEntity user = userService.getById(userId);
        List<ClientEntity> clients = clientService.getAllClientsByOwner(user);
        List<ClientResponseSmall> response = clients.stream().map(
                ClientMapper::toSmallResponse
        ).toList();

        return ResponseEntity.ok(response);
    }


    @PostMapping("/add-note/{userId}")
    public ResponseEntity<NoteResponse> createNote(@PathVariable Long userId, @RequestBody NoteRequest request){
        NoteEntity entity = notesService.createNote(userId,request);
        NoteResponse response = NoteMapper.toResponse(entity);

        return ResponseEntity.ok(response);
    }


    @GetMapping("/all-notes/{userId}")
    public ResponseEntity<List<NoteResponse>> getAllUsersNotes(@PathVariable Long userId){
        List<NoteEntity> entities = notesService.getUserNotes(userId);
        List<NoteResponse> responses = entities.stream().map(NoteMapper::toResponse).toList();

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/programs/{userId}")
    public ResponseEntity<List<String>> getUserPrograms(@PathVariable Long userId){
        List<String> programs = userService.getAllUserPrograms(userId);

        return ResponseEntity.ok(programs);
    }


    @PostMapping("/training-settings/{userId}/add")
    public ResponseEntity<?> createNewTrainingSettings(@PathVariable Long userId,
                                                       @Valid @RequestBody TrainingSettingsRequest request){
        // TODO add authorization and validation
        UserEntity user = userService.getById(userId);
        TrainingSettingsEntity entity = trainingSettingsService.addTrainingSettings(user,request);
        TrainingSettingsResponse response = TrainingSettingsMapper.toResponse(entity);

        return ResponseEntity.ok(response);
    }


    @GetMapping("/training-settings/{userId}")
    public ResponseEntity<?> getAllTrainingSettings(@PathVariable Long userId){
        UserEntity user = userService.getById(userId);

        List<TrainingSettingsResponse> responses = trainingSettingsService.getAllUsersTrSettings(user);

        return ResponseEntity.ok(responses);

    }




}
