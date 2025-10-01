package com.palci.coachApplication.mapper;

import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.response.UserResponse;

public class UserMapper {

    public static UserResponse toResponse(UserEntity entity){
        UserResponse response = new UserResponse();
        response.setFirstName(entity.getFirstName());
        response.setLastName(entity.getLastName());
        response.setUsername(entity.getUsername());
        response.setEmail(entity.getEmail());
        response.setPhoneNumber(entity.getPhoneNumber());
        response.setUserId(entity.getUserId());

        return response;
    }
}
