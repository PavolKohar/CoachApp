package com.palci.coachApplication.repository;

import com.palci.coachApplication.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
}
