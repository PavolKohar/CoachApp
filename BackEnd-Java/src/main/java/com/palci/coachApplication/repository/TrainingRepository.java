package com.palci.coachApplication.repository;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.TrainingEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingRepository extends JpaRepository<TrainingEntity,Long> {

    List<TrainingEntity> findAllByUserOrderByDateAsc(UserEntity user);

    List<TrainingEntity> findAllByClientOrderByDateDesc(ClientEntity client);
}
