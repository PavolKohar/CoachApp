package com.palci.coachApplication.repository;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepository extends JpaRepository<ClientEntity,Long> {

    List<ClientEntity> findAllByOwner(UserEntity owner);

    List<String> findDistinctProgramByOwner(UserEntity owner);
}
