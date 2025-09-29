package com.palci.coachApplication.model.response;

import lombok.Data;

@Data
public class UserResponse {

    private Long userId;
    private String firstName;
    private String lastName;
    private String username;

    private String email;

    private String phoneNumber;

}
