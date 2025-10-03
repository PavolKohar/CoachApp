package com.palci.coachApplication.service;


import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.UserRequest;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {

    UserEntity createUser(boolean isAdmin, UserRequest request);

    UserEntity getById(Long userId);

    List<String> getAllUserPrograms(Long userId);
}
