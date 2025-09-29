package com.palci.coachApplication.service;


import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.UserRequest;

public interface UserService {

    UserEntity createUser(boolean isAdmin, UserRequest request);
}
