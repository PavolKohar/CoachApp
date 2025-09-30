package com.palci.coachApplication.controller;

import com.palci.coachApplication.mapper.UserMapper;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.UserRequest;
import com.palci.coachApplication.model.response.UserResponse;
import com.palci.coachApplication.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;



}
