package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.exception.DuplicateEmailException;
import com.palci.coachApplication.exception.PasswordsDoNotEqualException;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.UserRequest;
import com.palci.coachApplication.repository.UserRepository;
import com.palci.coachApplication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;


    @Override
    public UserEntity createUser(boolean isAdmin, UserRequest request) {

        // Checking if passwords equals
        if (!request.getPassword().equals(request.getConfirmPassword())){
            throw new PasswordsDoNotEqualException();
        }


        UserEntity newUser = new UserEntity();

        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setUserName(request.getUsername());
        newUser.setPassword(request.getPassword()); // TODO encode password
        newUser.setEmail(request.getEmail());
        newUser.setPhoneNumber(request.getPhoneNumber());
        newUser.setBirthDate(request.getBirthDate());
        newUser.setAdmin(isAdmin);

        try {
            return userRepository.save(newUser);
        }catch (DataIntegrityViolationException e){
            throw new DuplicateEmailException();
        }

    }
}
