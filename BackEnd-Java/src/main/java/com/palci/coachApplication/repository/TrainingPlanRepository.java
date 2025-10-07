package com.palci.coachApplication.repository;

import com.palci.coachApplication.model.entity.TrainingPlanEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainingPlanRepository extends JpaRepository<TrainingPlanEntity,Long> {
}
