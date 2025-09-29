package com.palci.coachApplication.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class UserRequest {

    private LocalDate birthDate;

    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private String password;

    private String confirmPassword;

    private String phoneNumber;

}
