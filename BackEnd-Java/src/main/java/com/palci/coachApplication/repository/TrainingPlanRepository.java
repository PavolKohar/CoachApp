package com.palci.coachApplication.repository;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.TrainingEntity;
import com.palci.coachApplication.model.entity.TrainingPlanEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingPlanRepository extends JpaRepository<TrainingPlanEntity,Long> {

    List<TrainingPlanEntity> findAllByUserOrderByStartDateDesc(UserEntity user);

    List<TrainingPlanEntity> findAllByClientOrderByStartDateDesc(ClientEntity client);
}
