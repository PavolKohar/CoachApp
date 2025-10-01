package com.palci.coachApplication.controller;

import com.palci.coachApplication.mapper.ClientMapper;
import com.palci.coachApplication.mapper.UserMapper;
import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.UserRequest;
import com.palci.coachApplication.model.response.ClientResponse;
import com.palci.coachApplication.model.response.ClientResponseSmall;
import com.palci.coachApplication.model.response.UserResponse;
import com.palci.coachApplication.service.ClientService;
import com.palci.coachApplication.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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


    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long userId){
        UserEntity user = userService.getById(userId);
        UserResponse response = UserMapper.toResponse(user);
        List<ClientEntity> clients = clientService.getAllClientsByOwner(user);
        List<ClientResponseSmall> clientResponses = clients.stream().map(ClientMapper::toSmallResponse).toList();
        response.setClients(clientResponses);
        return ResponseEntity.ok(response);
    }




}
