package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.exception.DuplicateEmailException;
import com.palci.coachApplication.exception.PasswordsDoNotEqualException;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.UserRequest;
import com.palci.coachApplication.repository.UserRepository;
import com.palci.coachApplication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


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

    // Method from UserDetail Service
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUserName(username)
                .orElseThrow(()->new UsernameNotFoundException("Username not found"));
    }
}
