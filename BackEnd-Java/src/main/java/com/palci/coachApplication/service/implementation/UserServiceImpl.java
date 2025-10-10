package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.exception.DuplicateEmailException;
import com.palci.coachApplication.exception.DuplicateUserNameException;
import com.palci.coachApplication.exception.PasswordsDoNotEqualException;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.UserRequest;
import com.palci.coachApplication.repository.ClientRepository;
import com.palci.coachApplication.repository.UserRepository;
import com.palci.coachApplication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ClientRepository clientRepository;


    @Override
    public UserEntity createUser(boolean isAdmin, UserRequest request) {

        // Checking if passwords equals
        if (!request.getPassword().equals(request.getConfirmPassword())){
            throw new PasswordsDoNotEqualException();
        }

        if (userRepository.existsByEmail(request.getEmail())){
            throw new DuplicateEmailException();
        }

        if (userRepository.existsByUserName(request.getUsername())){
            throw new DuplicateUserNameException("This username is already in use ");
        }


        UserEntity newUser = new UserEntity();

        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setUserName(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
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

    @Override
    public UserEntity getById(Long userId) {
        return userRepository.findById(userId).orElseThrow();
    }

    @Override
    public List<String> getAllUserPrograms(Long userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow();
        return clientRepository.findDistinctProgramByOwner(user);
    }

}
