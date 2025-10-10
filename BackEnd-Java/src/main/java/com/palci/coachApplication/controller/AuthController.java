package com.palci.coachApplication.controller;

import com.palci.coachApplication.mapper.UserMapper;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.AuthRequest;
import com.palci.coachApplication.model.request.UserRequest;
import com.palci.coachApplication.model.response.UserResponse;
import com.palci.coachApplication.repository.UserRepository;
import com.palci.coachApplication.service.UserService;
import com.palci.coachApplication.service.implementation.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserService userService;



    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticate(@RequestBody AuthRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        UserEntity user = userRepository.findByUserName(authRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String token = jwtService.generateToken(user);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return ResponseEntity
                .ok()
                .header("Content-Type", "application/json")
                .body(response);
    }


    @PostMapping("/register")
    ResponseEntity<?> createNewUser(@Valid @RequestBody UserRequest userRequest, BindingResult result){

        if (result.hasErrors()){
            Map<String,String> errors = new HashMap<>();
            result.getFieldErrors().forEach(err->
                    errors.put(err.getField(),err.getDefaultMessage()));
            return ResponseEntity.badRequest().body(Map.of("errors",errors));
        }

        UserEntity newEntity = userService.createUser(false,userRequest);
        UserResponse response = UserMapper.toResponse(newEntity);

        return ResponseEntity.ok(response);
    }


}
