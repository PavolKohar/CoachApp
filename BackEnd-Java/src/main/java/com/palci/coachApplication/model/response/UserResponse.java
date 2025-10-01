package com.palci.coachApplication.model.response;

import com.palci.coachApplication.model.entity.ClientEntity;
import lombok.Data;

import java.util.List;

@Data
public class UserResponse {

    private Long userId;
    private String firstName;
    private String lastName;
    private String username;

    private String email;

    private String phoneNumber;

    private List<ClientResponseSmall> clients;

}
