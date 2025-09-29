package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.UserRequest;
import com.palci.coachApplication.repository.UserRepository;
import com.palci.coachApplication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;


    @Override
    public UserEntity createUser(boolean isAdmin, UserRequest request) {
        UserEntity newUser = new UserEntity();

        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setUserName(request.getUsername());
        newUser.setPassword(request.getPassword()); // TODO encode password
        newUser.setEmail(request.getEmail());
        newUser.setPhoneNumber(request.getPhoneNumber());
        newUser.setBirthDate(request.getBirthDate());
        newUser.setAdmin(isAdmin);

        return userRepository.save(newUser);
    }
}
