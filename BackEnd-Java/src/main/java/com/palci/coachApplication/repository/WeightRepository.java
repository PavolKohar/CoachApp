package com.palci.coachApplication.repository;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.WeightEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WeightRepository extends JpaRepository<WeightEntity,Long> {

    List<WeightEntity> findAllByClient(ClientEntity client);
}
