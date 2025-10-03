package com.palci.coachApplication.repository;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClientRepository extends JpaRepository<ClientEntity,Long> {

    List<ClientEntity> findAllByOwner(UserEntity owner);

    @Query("SELECT DISTINCT c.program FROM ClientEntity c WHERE c.owner = :owner")
    List<String> findDistinctProgramByOwner(UserEntity owner);
}
