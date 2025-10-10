package com.palci.coachApplication.repository;

import com.palci.coachApplication.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Long> {

    Optional<UserEntity> findByUserName(String username);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);


}
