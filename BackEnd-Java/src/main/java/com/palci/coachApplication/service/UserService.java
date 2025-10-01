package com.palci.coachApplication.service;


import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.UserRequest;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {

    UserEntity createUser(boolean isAdmin, UserRequest request);

    UserEntity getById(Long userId);
}
